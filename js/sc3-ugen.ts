// sc3-ugen.ts

import { asArray, arrayAtIndices, arrayContainsArray, arrayEvery, arrayExtendToBeOfEqualSize, arrayFillWithIndex, arrayFind, arrayForEach, arrayMap, arrayMaxItem, arrayTranspose } from './sc3-array.js'
import { Counter, counterNew } from './sc3-counter.js'
import { dictionaryHasKey } from './sc3-dictionary.js'
import { consoleDebug, consoleError } from './sc3-error.js'
import { isNumber } from './sc3-number.js'
import { binaryOperatorName, unaryOperatorName } from './sc3-operators.js'
import { rateAr, rateIr, rateKr } from './sc3-rate.js'
import { Set, setNew, setAdd } from './sc3-set.js'
import { Tree } from './sc3-tree.js'

var ugenCounter: Counter = counterNew();

export type ScUgen = {
    name: string,
    numChan: number,
    rate: number,
    specialIndex: number,
    id: number,
    inputArray: UgenInput[],
    mrg: Set<UgenInput>
};

export type Ugen = {
    scUgen: ScUgen,
    port: number
};

export type UgenInput = number | Ugen;

export type Signal = Tree<UgenInput>;

export function ScUgen(name: string, numChan: number, rate: number, specialIndex: number, inputArray: UgenInput[]): ScUgen {
    return {
        name: name,
        numChan: numChan,
        rate: rate,
        specialIndex: specialIndex,
        id: ugenCounter(),
        inputArray: inputArray,
        mrg: setNew()
    };
}

export function isScUgen(obj: any): boolean {
    return obj && dictionaryHasKey(obj, 'specialIndex') && dictionaryHasKey(obj, 'mrg'); // ...
}

// Ugens with no outputs, such as Out, set port to -1.
export var nilPort = -1;

export function Ugen(scUgen: ScUgen, port: number): Ugen {
    return {
        scUgen: scUgen,
        port: port
    };
}

export function isUgen(obj: any): boolean {
    return obj && dictionaryHasKey(obj, 'scUgen') && dictionaryHasKey(obj, 'port');
}

export function isUgenInput(aValue: any): boolean {
    return isNumber(aValue) || isUgen(aValue);
}

export function inputBranch(input: UgenInput, onUgen: (aUgen: Ugen) => any, onNumber: (aNumber: number) => any, onError: () => any): any {
    if(isUgen(input)) {
        return onUgen(<Ugen>input);
    } else if(isNumber(input)) {
        return onNumber(<number>input);
    } else {
        consoleError('inputBranch: unknown input type?', input);
        return onError();
    }
}

export function inputRate(input: UgenInput): number {
    consoleDebug('inputRate', input);
    return inputBranch(input, port => port.scUgen.rate, unusedNumber => rateIr, () => -1);
}

export type RateSpec = number | number[];

// If scalar it is the operating rate, if an array it is indices into the inputs telling how to derive the rate.
export function deriveRate(rateOrFilterUgenInputs: RateSpec, inputArray: UgenInput[]): number {
    consoleDebug('deriveRate', rateOrFilterUgenInputs, inputArray);
    if(isNumber(rateOrFilterUgenInputs)) {
        return <number>rateOrFilterUgenInputs;
    } else {
        return arrayMaxItem(arrayMap(arrayAtIndices(inputArray, <number[]>rateOrFilterUgenInputs), inputRate));
    }
}

export function requiresMce(inputs: Signal[]) {
    return arrayContainsArray(inputs);
}

export function mceInputTransform(aSignal: Signal[]): Signal[] {
    return arrayTranspose(arrayExtendToBeOfEqualSize(<any[][]>aSignal));
}

export function makeUgen(name: string, numChan: number, rateSpec: RateSpec, specialIndex: number, signalArray: Signal[]): Signal {
    consoleDebug('makeUgen', name, numChan, rateSpec, specialIndex, signalArray);
    if(requiresMce(signalArray)) {
        return arrayMap(mceInputTransform(signalArray), item => makeUgen(name, numChan, rateSpec, specialIndex, item));
    } else {
        var inputArray = <UgenInput[]>signalArray;
        var scUgen = ScUgen(name, numChan, deriveRate(rateSpec, inputArray), specialIndex, inputArray);
        switch (numChan) {
            case 0: return (Ugen(scUgen, nilPort));
            case 1: return (Ugen(scUgen, 0));
            default: return arrayFillWithIndex(numChan, item => Ugen(scUgen, item));
        }
    }
}

export function ugenDisplayName(ugen: ScUgen): string {
    switch(ugen.name) {
    case 'UnaryOpUGen': return unaryOperatorName(ugen.specialIndex);
    case 'BinaryOpUGen': return binaryOperatorName(ugen.specialIndex);
    default: return ugen.name;
    }
}

// Mrg

// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
export function inputFirstUgen(input: Signal): ScUgen | null {
    if(Array.isArray(input)) {
        consoleDebug('inputFirstUgen: array', input);
        return arrayFind(arrayMap(input, inputFirstUgen), isScUgen) || null;
    } else if(isUgen(input)) {
        consoleDebug('inputFirstUgen: port', input);
        return (<Ugen>input).scUgen;
    } else {
        consoleDebug('inputFirstUgen: number?', input);
        return null;
    }
}

export function mrg(lhs: Signal,rhs: Signal): Signal {
    var ugen = inputFirstUgen(lhs);
    consoleDebug('mrg', lhs, rhs, ugen);
    if(ugen && ugen.mrg) {
        if(Array.isArray(rhs)) {
            var mrgSet = <Set<UgenInput>>(ugen.mrg);
            arrayForEach(rhs, item => setAdd(mrgSet, item));
        } else {
            setAdd(ugen.mrg, rhs);
        }
    } else {
        consoleError("mrg: no ugen or ugen.mrg is null?");
    }
    return lhs;
}

// Kr

export function krMutateInPlace(input: Tree<UgenInput | ScUgen>): void {
    if(isUgen(input)) {
        var inputPort = <Ugen>input;
        consoleDebug('kr: port', inputPort);
        krMutateInPlace(inputPort.scUgen);
    } else if(isScUgen(input)) {
        var inputUgen = <ScUgen>input;
        consoleDebug('kr: ugen', inputUgen);
        if(inputUgen.rate === rateAr) {
            inputUgen.rate =  rateKr;
        }
        arrayForEach(inputUgen.inputArray, item => krMutateInPlace(item));
    } else if(Array.isArray(input)) {
        consoleDebug('kr: array', input);
        arrayForEach(input, item => krMutateInPlace(item));
    } else {
        if(!isNumber(input)) {
            consoleError('krMutateInPlace', input);
        }
    }
}

export function kr(input: Signal): Signal {
    krMutateInPlace(input);
    return input;
}

// Operators

export function UnaryOpWithConstantOptimiser(specialIndex: number, input: Signal): Signal {
    if(isNumber(input)) {
        var aNumber = <number>input;
        switch(specialIndex) {
        case 0: return 0 - aNumber;
        case 5: return Math.abs(aNumber);
        case 8: return Math.ceil(aNumber);
        case 9: return Math.floor(aNumber);
        case 12: return aNumber * aNumber;
        case 13: return aNumber * aNumber * aNumber;
        case 14: return Math.sqrt(aNumber);
        case 16: return 1 / aNumber;
        case 28: return Math.sin(aNumber);
        case 29: return Math.cos(aNumber);
        case 30: return Math.tan(aNumber);
        }
    }
    return makeUgen('UnaryOpUGen', 1, [0], specialIndex, [input]);
}

// [1, [], [1], [1, 2], [1, null], SinOsc(440, 0), [SinOsc(440, 0)]].map(isArrayConstant)
export function isArrayConstant(aValue: any): boolean {
    return Array.isArray(aValue) && arrayEvery(aValue, isNumber);
}

export function UnaryOp(specialIndex: number, input: Signal): Signal {
    if(Array.isArray(input) && arrayEvery(input, isNumber)) {
        return arrayMap(input, item => UnaryOpWithConstantOptimiser(specialIndex, item));
    } else {
        return UnaryOpWithConstantOptimiser(specialIndex, input);
    }
}

export function BinaryOpWithConstantOptimiser(specialIndex: number, lhs: UgenInput, rhs: UgenInput): Signal {
    if(isNumber(lhs) && isNumber(rhs)) {
        var lhsNumber = <number>lhs;
        var rhsNumber = <number>rhs;
        switch(specialIndex) {
        case 0: return lhsNumber + rhsNumber;
        case 1: return lhsNumber - rhsNumber;
        case 2: return lhsNumber * rhsNumber;
        case 4: return lhsNumber / rhsNumber;
        }
    }
    return makeUgen('BinaryOpUGen', 1, [0, 1], specialIndex, [lhs, rhs]);
}

export function BinaryOp(specialIndex: number, lhs: Signal, rhs: Signal): any {
    if(Array.isArray(lhs) || Array.isArray(rhs)) {
        var expanded = mceInputTransform([asArray(lhs), asArray(rhs)]);
        consoleDebug('BinaryOp: array constant', expanded);
        return arrayMap(expanded, item => BinaryOpWithConstantOptimiser(specialIndex, item[0], item[1]));
    } else {
        return BinaryOpWithConstantOptimiser(specialIndex, lhs, rhs);
    }
}

// isOutUgen(Out(0, mul(SinOsc(440, 0), 0.1)))
export function isOutUgen(aValue: any): boolean {
    return isUgen(aValue) && (<Ugen>aValue).scUgen.name == 'Out';
}

// isControlRateUgen(MouseX(0, 1, 0, 0.2))
export function isControlRateUgen(aValue: any): boolean {
    return isUgenInput(aValue) && (inputRate(aValue) == rateKr);
}
