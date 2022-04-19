// sc3-ugen.ts ; requires: sc3-counter, sc3-operators, sc3-tree

var ugenCounter: Counter = counterNew();

type UgenPrimitive = {
    ugenName: string,
    numChan: number,
    ugenRate: number,
    specialIndex: number,
    ugenId: number,
    inputValues: UgenInput[],
    mrg: UgenInput[]
};

type UgenOutput = {
    ugen: UgenPrimitive,
    index: number
};

type UgenInput = number | UgenOutput;

type Signal = Tree<UgenInput>;

function Ugen(name: string, numChan: number, rate: number, specialIndex: number, inputs: UgenInput[]): UgenPrimitive {
    return {
        ugenName: name,
        numChan: numChan,
        ugenRate: rate,
        specialIndex: specialIndex,
        ugenId: ugenCounter(),
        inputValues: inputs,
        mrg: []
    };
}

function isUgenPrimitive(obj: any): boolean {
    return obj && obj.ugenName !== undefined;
}

// Ugens with no outputs, such as Out, set index to -1.
function UgenOutput(ugen: UgenPrimitive, index: number): UgenOutput {
    return {
        ugen: ugen,
        index: index
    };
}

function isUgenOutput(obj: any): boolean {
    return obj && obj.ugen !== undefined && obj.index !== undefined;
}

function isUgenInput(aValue: any): boolean {
    return isNumber(aValue) || isUgenOutput(aValue);
}

function inputBranch(input: UgenInput, onUgenOutput: (aUgenOutput: UgenOutput) => any, onNumber: (aNumber: number) => any, onError: () => any): any {
    if(isUgenOutput(input)) {
        return onUgenOutput(<UgenOutput>input);
    } else if(isNumber(input)) {
        return onNumber(<number>input);
    } else {
        console.error('inputBranch: unknown input type?', input);
        return onError();
    }
}

function inputRate(input: UgenInput): number {
    consoleDebug('inputRate', input);
    return inputBranch(input, port => port.ugen.ugenRate, unusedNumber => rateIr, () => -1);
}

type RateSpec = number | number[];

// If scalar it is the operating rate, if an array it is indices into the inputs telling how to derive the rate.
function deriveRate(rateOrFilterUgenInputs: RateSpec, inputsArray: UgenInput[]): number {
    consoleDebug('deriveRate', rateOrFilterUgenInputs, inputsArray);
    if(isNumber(rateOrFilterUgenInputs)) {
        return <number>rateOrFilterUgenInputs;
    } else {
        return arrayMaxItem(arrayMap(arrayAtIndices(inputsArray, <number[]>rateOrFilterUgenInputs), inputRate));
    }
}

function makeUgen(name: string, numChan: number, rateSpec: RateSpec, specialIndex: number, inputs: Signal[]): Signal {
    consoleDebug('makeUgen', name, numChan, rateSpec, specialIndex, inputs);
    if(arrayContainsArray(inputs)) {
        return arrayTranspose(arrayExtendToBeOfEqualSize(inputs)).map(item => makeUgen(name, numChan, rateSpec, specialIndex, item));
    } else {
        var inputArray = <UgenInput[]>inputs;
        var ugen = Ugen(name, numChan, deriveRate(rateSpec, inputArray), specialIndex, inputArray);
        switch(numChan) {
            case 0: return (UgenOutput(ugen, -1));
            case 1: return (UgenOutput(ugen, 0));
            default: return arrayFillWithIndex(numChan, item => UgenOutput(ugen, item));
        }
    }
}

function ugenDisplayName(ugen: UgenPrimitive): string {
    switch(ugen.ugenName) {
    case 'UnaryOpUGen': return unaryOperatorName(ugen.specialIndex);
    case 'BinaryOpUGen': return binaryOperatorName(ugen.specialIndex);
    default: return ugen.ugenName;
    }
}

// Mrg

// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
function inputFirstUgen(input: Signal): UgenPrimitive | null {
    if(isArray(input)) {
        consoleDebug('inputFirstUgen: array', input);
        var inputArray = <Signal[]>input;
        return arrayFind(arrayMap(inputArray, inputFirstUgen), isUgenPrimitive) || null;
    } else if(isUgenOutput(input)) {
        consoleDebug('inputFirstUgen: port', input);
        return (<UgenOutput>input).ugen;
    } else {
        consoleDebug('inputFirstUgen: number?', input);
        return null;
    }
}

function mrg(lhs: Signal,rhs: Signal): Signal {
    var ugen = inputFirstUgen(lhs);
    consoleDebug('mrg', lhs, rhs, ugen);
    if(ugen && ugen.mrg) {
        if(isArray(rhs)) {
            var rhsArray = <Signal[]>rhs;
            var mrgArray = <UgenInput[]>(ugen.mrg);
            arrayForEach(rhsArray, item => arrayPush(mrgArray, item));
        } else {
            arrayPush(ugen.mrg, rhs);
        }
    } else {
        console.error("mrg: no ugen or ugen.mrg is null?");
    }
    return lhs;
}

// Kr

function krMutateInPlace(input: Tree<UgenInput | UgenPrimitive>): void {
    if(isUgenOutput(input)) {
        var port = <UgenOutput>input;
        consoleDebug('kr: port', port);
        krMutateInPlace(port.ugen);
    } else if(isUgenPrimitive(input)) {
        var ugen = <UgenPrimitive>input;
        consoleDebug('kr: ugen', ugen);
        ugen.ugenRate = ugen.ugenRate === 2 ? 1 : ugen.ugenRate;
        ugen.inputValues.forEach(item => krMutateInPlace(item));
    } else if(Array.isArray(input)) {
        var array = <Forest<UgenInput | UgenPrimitive>>input;
        consoleDebug('kr: array', array);
        array.forEach(item => krMutateInPlace(item));
    } else {
        if(!isNumber(input)) {
            console.error('krMutateInPlace', input);
        }
    }
}

function kr(input: Signal): Signal {
    krMutateInPlace(input);
    return input;
}

// Operators

function UnaryOpWithConstantOptimiser(specialIndex: number, input: Signal): Signal {
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
function isArrayConstant(aValue: any): boolean {
    return Array.isArray(aValue) && aValue.every(isNumber);
}

function UnaryOp(specialIndex: number, input: Signal): Signal {
    if(isArrayConstant(input)) {
        var constantArray = <number[]>input;
        return constantArray.map(item => UnaryOpWithConstantOptimiser(specialIndex, item));
    } else {
        return UnaryOpWithConstantOptimiser(specialIndex, input);
    }
}

function BinaryOpWithConstantOptimiser(specialIndex: number, lhs: UgenInput, rhs: UgenInput): Signal {
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

function BinaryOp(specialIndex: number, lhs: Signal, rhs: Signal): any {
    if(Array.isArray(lhs) || Array.isArray(rhs)) {
        var expanded = arrayTranspose(arrayExtendToBeOfEqualSize([arrayAsArray(lhs), arrayAsArray(rhs)]));
        consoleDebug('BinaryOp: array constant', expanded);
        return expanded.map(item => BinaryOpWithConstantOptimiser(specialIndex, item[0], item[1]));
    } else {
        return BinaryOpWithConstantOptimiser(specialIndex, lhs, rhs);
    }
}

// isOutUgen(Out(0, mul(SinOsc(440, 0), 0.1)))
function isOutUgen(aValue: any): boolean {
    return isUgenOutput(aValue) && (<UgenOutput>aValue).ugen.ugenName == 'Out';
}

// isControlRateUgen(MouseX(0, 1, 0, 0.2))
function isControlRateUgen(aValue: any): boolean {
    return isUgenInput(aValue) && (inputRate(aValue) == 1);
}
