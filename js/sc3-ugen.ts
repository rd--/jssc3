// sc3-ugen.ts ; requires: sc3-counter, sc3-operators, sc3-tree

var ugenCounter: Counter = counterNew();

type Port = {
    ugen: Ugen,
    index: number
};

type Input = number | Port;

type Ugen = {
    ugenName: string,
    numChan: number,
    ugenRate: number,
    specialIndex: number,
    ugenId: number,
    inputValues: Input[],
    mrg: Input[]
};

function Ugen(name: string, numChan: number, rate: number, specialIndex: number, inputs: Input[]): Ugen {
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

function isUgen(obj: any): boolean {
    return obj && obj.ugenName !== undefined;
}

// Ugen constructors return a Tree of Ports.  Ugens with no outputs, such as Out, set index to -1.
function Port(ugen: Ugen, index: number): Port {
    return {
        ugen: ugen,
        index: index
    };
}

function isPort(obj: any): boolean {
    return obj && obj.ugen !== undefined && obj.index !== undefined;
}

function isInput(aValue: any): boolean {
    return isNumber(aValue) || isPort(aValue);
}

function inputBranch(input: Input, onPort: (aPort: Port) => any, onNumber: (aNumber: number) => any, onError: () => any): any {
    if(isPort(input)) {
        return onPort(<Port>input);
    } else if(isNumber(input)) {
        return onNumber(<number>input);
    } else {
        console.error('inputBranch: unknown input type?', input);
        return onError();
    }
}

function inputRate(input: Input): number {
    console.debug('inputRate', input);
    return inputBranch(input, port => port.ugen.ugenRate, unusedNumber => rateIr, () => -1);
}

type RateSpec = number | number[];

// If scalar it is the operating rate, if an array it is indices into the inputs telling how to derive the rate.
function deriveRate(rateOrFilterInputs: RateSpec, inputsArray: Input[]): number {
    console.debug('deriveRate', rateOrFilterInputs, inputsArray);
    if(isNumber(rateOrFilterInputs)) {
        return <number>rateOrFilterInputs;
    } else {
        return arrayMaxItem(arrayMap(arrayAtIndices(inputsArray, <number[]>rateOrFilterInputs), inputRate));
    }
}

function makeUgen(name: string, numChan: number, rateSpec: RateSpec, specialIndex: number, inputs: Forest<Input>): Tree<Port> {
    console.debug('makeUgen', name, numChan, rateSpec, specialIndex, inputs);
    if(arrayContainsArray(inputs)) {
        return arrayTranspose(arrayExtendToBeOfEqualSize(inputs)).map(item => makeUgen(name, numChan, rateSpec, specialIndex, item));
    } else {
        var inputArray = <Input[]>inputs;
        var ugen = Ugen(name, numChan, deriveRate(rateSpec, inputArray), specialIndex, inputArray);
        switch(numChan) {
            case 0: return (Port(ugen, -1));
            case 1: return (Port(ugen, 0));
            default: return arrayFillWithIndex(numChan, item => Port(ugen, item));
        }
    }
}

function ugenDisplayName(ugen: Ugen): string {
    switch(ugen.ugenName) {
    case 'UnaryOpUGen': return unaryOperatorName(ugen.specialIndex);
    case 'BinaryOpUGen': return binaryOperatorName(ugen.specialIndex);
    default: return ugen.ugenName;
    }
}

// Mrg

// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
function inputFirstUgen(input: Tree<Input>): Ugen | null {
    if(isArray(input)) {
        console.debug('inputFirstUgen: array', input);
        var inputArray = <Forest<Input>>input;
        return arrayFind(arrayMap(inputArray, inputFirstUgen), isUgen) || null;
    } else if(isPort(input)) {
        console.debug('inputFirstUgen: port', input);
        return (<Port>input).ugen;
    } else {
        console.debug('inputFirstUgen: number?', input);
        return null;
    }
}

function mrg(lhs: Tree<Input>,rhs: Tree<Input>): Tree<Input> {
    var ugen = inputFirstUgen(lhs);
    console.debug('mrg', lhs, rhs, ugen);
    if(ugen && ugen.mrg) {
        if(isArray(rhs)) {
            var rhsArray = <Forest<Input>>rhs;
            var mrgArray = <Input[]>(ugen.mrg);
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

function krMutateInPlace(input: Tree<Input | Ugen>): void {
    if(isPort(input)) {
        var port = <Port>input;
        console.debug('kr: port', port);
        krMutateInPlace(port.ugen);
    } else if(isUgen(input)) {
        var ugen = <Ugen>input;
        console.debug('kr: ugen', ugen);
        ugen.ugenRate = ugen.ugenRate === 2 ? 1 : ugen.ugenRate;
        ugen.inputValues.forEach(item => krMutateInPlace(item));
    } else if(Array.isArray(input)) {
        var array = <Forest<Input | Ugen>>input;
        console.debug('kr: array', array);
        array.forEach(item => krMutateInPlace(item));
    } else {
        if(!isNumber(input)) {
            console.error('krMutateInPlace', input);
        }
    }
}

function kr(input: Input): Input {
    krMutateInPlace(input);
    return input;
}

// Operators

function UnaryOpWithConstantOptimiser(specialIndex: number, input: Tree<Input>): Tree<number | Port> {
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

function UnaryOp(specialIndex: number, input: Tree<Input>): Tree<number | Port> {
    if(isArrayConstant(input)) {
        var constantArray = <number[]>input;
        return constantArray.map(item => UnaryOpWithConstantOptimiser(specialIndex, item));
    } else {
        return UnaryOpWithConstantOptimiser(specialIndex, input);
    }
}

function BinaryOpWithConstantOptimiser(specialIndex: number, lhs: Input, rhs: Input): Tree<number | Port> {
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

function BinaryOp(specialIndex: number, lhs: Input, rhs: Input): any {
    if(Array.isArray(lhs) || Array.isArray(rhs)) {
        var expanded = arrayTranspose(arrayExtendToBeOfEqualSize([arrayAsArray(lhs), arrayAsArray(rhs)]));
        console.debug('BinaryOp: array constant', expanded);
        return expanded.map(item => BinaryOpWithConstantOptimiser(specialIndex, item[0], item[1]));
    } else {
        return BinaryOpWithConstantOptimiser(specialIndex, lhs, rhs);
    }
}

// isOutUgen(Out(0, mul(SinOsc(440, 0), 0.1)))
function isOutUgen(aValue: any): boolean {
    return isPort(aValue) && (<Port>aValue).ugen.ugenName == 'Out';
}

// isControlRateUgen(MouseX(0, 1, 0, 0.2))
function isControlRateUgen(aValue: any): boolean {
    return isInput(aValue) && (inputRate(aValue) == 1);
}
