'use strict';

// Counter

// () -> (() -> int)
function makeCounter() {
    var x = 0;
    function f() {
        x = x + 1;
        return x;
    }
    return f;
}

// Ugen

// () -> int
var ugenCounter = makeCounter();

function Ugen(name, nc, rt, op, inputs) {
    return {
        ugenName: name, // string
        numChan: nc, // number
        ugenRate: rt, // number
        specialIndex: op, // maybe number
        ugenId: ugenCounter(), // number
        inputValues: inputs, // [number | port]
        mrg: [] // [ugen]
    };
}

// any -> boolean
function isUgen(obj) {
    return obj && obj.ugenName !== undefined;
}

function Port(ugen, index) {
    return {
        ugen: ugen, // ugen
        index: index // number
    };
}

function isPort(obj) {
    return obj && obj.ugen !== undefined && obj.index !== undefined;
}

// input = port | number
function inputRate(input) {
    console.debug('inputRate', input);
    return isPort(input) ? input.ugen.ugenRate : (isNumber(input) ? rateIr : console.error('inputRate: ', input));
}

// If rate is a scalar it is the operating rate, if it is an array it is indices into the inputs telling how to derive the rate.
function deriveRate(rateOrFilterInputs, inputsArray) {
    console.debug('deriveRate', rateOrFilterInputs, inputsArray);
    return isNumber(rateOrFilterInputs) ? rateOrFilterInputs : arrayMaxItem(arrayAtIndices(inputsArray, rateOrFilterInputs).map(inputRate));
}

function makeUgen(name, nc, rt, op, inputs) {
    console.debug('makeUgen', name, nc, rt, op, inputs);
    if(arrayContainsArray(inputs)) {
        return arrayTranspose(arrayExtendToBeOfEqualSize(inputs)).map(item => makeUgen(name, nc, rt, op, item));
    } else {
        var u = Ugen(name, nc, deriveRate(rt, inputs), op, inputs);
        switch(nc) {
            case 0: return (Port(u, null));
            case 1: return (Port(u, 0));
            default: return arrayFillWithIndex(nc, i => Port(u, i));
        }
    }
}

function ugenDisplayName(ugen) {
    switch(ugen.ugenName) {
    case 'UnaryOpUGen': return objectKeyFromValue(unaryOperators, ugen.specialIndex);
    case 'BinaryOpUGen': return objectKeyFromValue(binaryOperators, ugen.specialIndex);
    default: return ugen.ugenName;
    }
}

// Mrg

// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
function inputFirstUgen(input) {
    if(isArray(input)) {
        console.debug('inputFirstUgen: array', input);
        return arrayFind(arrayMap(input, inputFirstUgen), isUgen) || null;
    } else if(isPort(input)) {
        console.debug('inputFirstUgen: port', input);
        return input.ugen;
    } else {
        console.debug('inputFirstUgen: number?', input);
        return null;
    }
}

function mrg(lhs,rhs) {
    var ugen = inputFirstUgen(lhs);
    console.debug('mrg', lhs, rhs, ugen);
    if(ugen) {
        if(isArray(rhs)) {
            arrayForEach(rhs, item => arrayPush(ugen.mrg, item));
        } else {
            arrayPush(ugen.mrg, rhs);
        }
    } else {
        console.error("mrg: no ugen?");
    }
    return lhs;
}

// Kr

function krMutateInPlace(i) {
    if(isPort(i)) {
        console.debug('kr: port', i);
        krMutateInPlace(i.ugen);
    } else if(isUgen(i)) {
        console.debug('kr: ugen', i);
        i.ugenRate = i.ugenRate === 2 ? 1 : i.ugenRate;
        i.inputValues.forEach(item => krMutateInPlace(item));
    } else if(Array.isArray(i)) {
        console.debug('kr: array', i);
        i.forEach(item => krMutateInPlace(item));
    } else {
        if(!isNumber(i)) {
            console.error('krMutateInPlace', i);
        }
    }
}

function kr(i) {
    krMutateInPlace(i);
    return i;
}

// Operators

function UnaryOpWithConstantOptimiser(ix, a) {
    if(isNumber(a)) {
        switch(ix) {
        case 0: return 0 - a;
        case 5: return Math.abs(a);
        case 8: return Math.ceil(a);
        case 9: return Math.floor(a);
        case 12: return a * a;
        case 13: return a * a * a;
        case 14: return Math.sqrt(a);
        case 16: return 1 / a;
        case 28: return Math.sin(a);
        case 29: return Math.cos(a);
        case 30: return Math.tan(a);
        }
    }
    return makeUgen('UnaryOpUGen', 1, [0], ix, [a]);
}

// [1, [], [1], [1, 2], [1, null], SinOsc(440, 0), [SinOsc(440, 0)]].map(isArrayConstant)
function isArrayConstant(a) {
    return Array.isArray(a) && a.every(isNumber);
}

function UnaryOp(ix, a) {
    if(isArrayConstant(a)) {
        return a.map(item => UnaryOpWithConstantOptimiser(ix, item));
    } else {
        return UnaryOpWithConstantOptimiser(ix, a);
    }
}

function BinaryOpWithConstantOptimiser(ix, a, b) {
    if(isNumber(a) && isNumber(b)) {
        switch(ix) {
        case 0: return a + b;
        case 1: return a - b;
        case 2: return a * b;
        case 4: return a / b;
        }
    }
    return  makeUgen('BinaryOpUGen', 1, [0, 1], ix, [a, b]);
}

function BinaryOp(ix, a, b) {
    if(Array.isArray(a) || Array.isArray(b)) {
        var expanded = arrayTranspose(arrayExtendToBeOfEqualSize([arrayAsArray(a), arrayAsArray(b)]));
        console.debug('BinaryOp: array constant', expanded);
        return expanded.map(item => BinaryOpWithConstantOptimiser(ix, item[0], item[1]));
    } else {
        return BinaryOpWithConstantOptimiser(ix, a, b);
    }
}

// isOutUgen(Out(0, mul(SinOsc(440, 0), 0.1)))
function isOutUgen(ugen) {
    return isPort(ugen) && ugen.ugen.ugenName == 'Out';
}

// isControlRateUgen(MouseX(0, 1, 0, 0.2))
function isControlRateUgen(ugen) {
    return inputRate(ugen) == 1;
}

// wrapOut(0, mul(SinOsc(440, 0), 0.1))
function wrapOut(bus, ugen) {
    return isOutUgen(ugen) ? ugen : Out(bus, ugen);
}
