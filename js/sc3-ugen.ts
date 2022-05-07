// sc3-ugen.ts

import { arrayAsArray, arrayAtIndices, arrayContainsArray, arrayEvery, arrayExtendToBeOfEqualSize, arrayFillWithIndex, arrayFind, arrayForEach, arrayMap, arrayMaxItem, arrayTranspose } from './sc3-array.js'
import { Counter, counterNew } from './sc3-counter.js'
import { dictionaryHasKey } from './sc3-dictionary.js'
import { consoleDebug, consoleError } from './sc3-error.js'
import { isNumber } from './sc3-number.js'
import { binaryOperatorName, unaryOperatorName } from './sc3-operators.js'
import { Queue, queueNew, queuePush } from './sc3-queue.js'
import { rateAr, rateIr, rateKr } from './sc3-rate.js'
import { Tree } from './sc3-tree.js'

var ugenCounter: Counter = counterNew();

export type UgenPrimitive = {
    ugenName: string,
    numChan: number,
    ugenRate: number,
    specialIndex: number,
    ugenId: number,
    inputValues: UgenInput[],
    mrg: Queue<UgenInput>
};

export type UgenOutput = {
    ugen: UgenPrimitive,
    index: number
};

export type UgenInput = number | UgenOutput;

export type Signal = Tree<UgenInput>;

export function makeUgenPrimitive(name: string, numChan: number, rate: number, specialIndex: number, inputArray: UgenInput[]): UgenPrimitive {
    return {
        ugenName: name,
        numChan: numChan,
        ugenRate: rate,
        specialIndex: specialIndex,
        ugenId: ugenCounter(),
        inputValues: inputArray,
        mrg: queueNew()
    };
}

export function isUgenPrimitive(obj: any): boolean {
    return obj && obj.ugenName !== undefined;
}

// Ugens with no outputs, such as Out, set index to -1.
export function UgenOutput(ugen: UgenPrimitive, index: number): UgenOutput {
    return {
        ugen: ugen,
        index: index
    };
}

export function isUgenOutput(obj: any): boolean {
    return obj && dictionaryHasKey(obj, 'ugen') && dictionaryHasKey(obj, 'index');
}

export function isUgenInput(aValue: any): boolean {
    return isNumber(aValue) || isUgenOutput(aValue);
}

export function inputBranch(input: UgenInput, onUgenOutput: (aUgenOutput: UgenOutput) => any, onNumber: (aNumber: number) => any, onError: () => any): any {
    if(isUgenOutput(input)) {
        return onUgenOutput(<UgenOutput>input);
    } else if(isNumber(input)) {
        return onNumber(<number>input);
    } else {
        consoleError('inputBranch: unknown input type?', input);
        return onError();
    }
}

export function inputRate(input: UgenInput): number {
    consoleDebug('inputRate', input);
    return inputBranch(input, port => port.ugen.ugenRate, unusedNumber => rateIr, () => -1);
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
        var ugenPrimitive = makeUgenPrimitive(name, numChan, deriveRate(rateSpec, inputArray), specialIndex, inputArray);
        switch(numChan) {
            case 0: return (UgenOutput(ugenPrimitive, -1));
            case 1: return (UgenOutput(ugenPrimitive, 0));
            default: return arrayFillWithIndex(numChan, item => UgenOutput(ugenPrimitive, item));
        }
    }
}

export function ugenDisplayName(ugen: UgenPrimitive): string {
    switch(ugen.ugenName) {
    case 'UnaryOpUGen': return unaryOperatorName(ugen.specialIndex);
    case 'BinaryOpUGen': return binaryOperatorName(ugen.specialIndex);
    default: return ugen.ugenName;
    }
}

// Mrg

// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
export function inputFirstUgen(input: Signal): UgenPrimitive | null {
    if(Array.isArray(input)) {
        consoleDebug('inputFirstUgen: array', input);
        return arrayFind(arrayMap(input, inputFirstUgen), isUgenPrimitive) || null;
    } else if(isUgenOutput(input)) {
        consoleDebug('inputFirstUgen: port', input);
        return (<UgenOutput>input).ugen;
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
            var mrgQueue = <Queue<UgenInput>>(ugen.mrg);
            arrayForEach(rhs, item => queuePush(mrgQueue, item));
        } else {
            queuePush(ugen.mrg, rhs);
        }
    } else {
        consoleError("mrg: no ugen or ugen.mrg is null?");
    }
    return lhs;
}

// Kr

export function krMutateInPlace(input: Tree<UgenInput | UgenPrimitive>): void {
    if(isUgenOutput(input)) {
        var inputPort = <UgenOutput>input;
        consoleDebug('kr: port', inputPort);
        krMutateInPlace(inputPort.ugen);
    } else if(isUgenPrimitive(input)) {
        var inputUgen = <UgenPrimitive>input;
        consoleDebug('kr: ugen', inputUgen);
        inputUgen.ugenRate = inputUgen.ugenRate === rateAr ? rateKr : inputUgen.ugenRate;
        arrayForEach(inputUgen.inputValues, item => krMutateInPlace(item));
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
        var expanded = mceInputTransform([arrayAsArray(lhs), arrayAsArray(rhs)]);
        consoleDebug('BinaryOp: array constant', expanded);
        return arrayMap(expanded, item => BinaryOpWithConstantOptimiser(specialIndex, item[0], item[1]));
    } else {
        return BinaryOpWithConstantOptimiser(specialIndex, lhs, rhs);
    }
}

// isOutUgen(Out(0, mul(SinOsc(440, 0), 0.1)))
export function isOutUgen(aValue: any): boolean {
    return isUgenOutput(aValue) && (<UgenOutput>aValue).ugen.ugenName == 'Out';
}

// isControlRateUgen(MouseX(0, 1, 0, 0.2))
export function isControlRateUgen(aValue: any): boolean {
    return isUgenInput(aValue) && (inputRate(aValue) == rateKr);
}
