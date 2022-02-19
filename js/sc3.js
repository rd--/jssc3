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

class Ugen {
    constructor(name, nc, rt, op, inputs) {
        this.ugenName = name; // str
        this.numChan = nc; // int
        this.ugenRate = rt; // int
        this.specialIndex = op; // maybe int
        this.ugenId = ugenCounter(); // int
        this.inputValues = inputs; // [number | port]
        this.mrg = [];
    }
}

function isUgen(obj) {
    return obj.constructor === Ugen;
}

class Port {
    constructor(ugen, index) {
        this.ugen = ugen; // ugen
        this.index = index; // int
    }
}

function isPort(obj) {
    return obj instanceof Port;
}

// input = port | number
function inputRate(input) {
    //console.log('inputRate', input);
    return isPort(input) ? input.ugen.ugenRate : (isNumber(input) ? Rate.ir : console.error('inputRate: ', input));
}

// If rate is a scalar it is the operating rate, if it is an array it is indices into the inputs telling how to derive the rate.
function deriveRate(rateOrFilterInputs, inputsArray) {
    //console.log('deriveRate', rateOrFilterInputs, inputsArray);
    return isNumber(rateOrFilterInputs) ? rateOrFilterInputs : arrayMaxItem(arrayAtIndices(inputsArray, rateOrFilterInputs).map(inputRate));
}

function makeUgen(name, nc, rt, op, inputs) {
    //console.log('makeUgen', name, nc, rt, op, inputs);
    if(arrayContainsArray(inputs)) {
        return arrayTranspose(arrayExtendToBeOfEqualSize(inputs)).map(item => makeUgen(name, nc, rt, op, item));
    } else {
        var u = new Ugen(name, nc, deriveRate(rt, inputs), op, inputs);
        switch(nc) {
            case 0: return (new Port(u, null));
            case 1: return (new Port(u, 0));
            default: return arrayFillWithIndex(nc, i => new Port(u, i));
        }
    }
}

Ugen.prototype.displayName = function() {
    switch(this.ugenName) {
    case 'UnaryOpUGen': return objectKeyFromValue(unaryOperators, this.specialIndex);
    case 'BinaryOpUGen': return objectKeyFromValue(binaryOperators, this.specialIndex);
    default: return this.ugenName;
    }
};

// Mrg

// inputFirstUgen([SinOsc([440, 441], 0), SinOsc(442, 0)])
function inputFirstUgen(i) {
    if(Array.isArray(i)) {
        //console.log('inputFirstUgen: array', i)
        return i.find(inputFirstUgen).ugen || null;
    } else if(isPort(i)) {
        //console.log('inputFirstUgen: port', i)
        return i.ugen;
    } else {
        //console.log('inputFirstUgen: number?', i)
        return null;
    }
}

function mrg(lhs,rhs) {
    var u = inputFirstUgen(lhs);
    //console.log('mrg', lhs, rhs, u);
    if(u) {
        if(Array.isArray(rhs)) {
            rhs.forEach(item => u.mrg.push(item));
        } else {
            u.mrg.push(rhs);
        }
    } else {
        console.error("mrg?");
    }
    return lhs;
}

// Kr

function krMutateInPlace(i) {
    if(isPort(i)) {
        // console.log('kr: port', i);
        krMutateInPlace(i.ugen);
    } else if(isUgen(i)) {
        // console.log('kr: ugen', i);
        i.ugenRate = i.ugenRate === 2 ? 1 : i.ugenRate;
        i.inputValues.forEach(item => krMutateInPlace(item));
    } else if(Array.isArray(i)) {
        // console.log('kr: array', i);
        i.forEach(item => krMutateInPlace(item));
    } else {
        if(!isNumber(i)) {
            console.error('krMutateInPlace', i);
        }
    }
}

function kr(i) { krMutateInPlace(i); return i; }

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
        var expanded = arrayTranspose(arrayExtendToBeOfEqualSize([unitArrayIfScalar(a), unitArrayIfScalar(b)]));
        // console.log('BinaryOp: array constant', expanded);
        return expanded.map(item => BinaryOpWithConstantOptimiser(ix, item[0], item[1]));
    } else {
        return BinaryOpWithConstantOptimiser(ix, a, b);
    }
}

// Texture

function OverlapTexture(graphFunc, sustainTime, transitionTime, overlap) {
        return sum(to(0, overlap - 1).map(function(i) {
            var trg = kr(Impulse(1 / (sustainTime + (transitionTime * 2)), i / overlap));
            var snd = graphFunc(trg);
            var env = Env([0, 1, 1, 0], [transitionTime,sustainTime,transitionTime], 'sin', null, null, 0);
            var sig = mul(snd, EnvGen(trg, 1, 0, 1, 0, env.coord()));
            //console.log('OverlapTexture', trg, snd, env, sig);
            return sig;
        }));
}
