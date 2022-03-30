'use strict';

var EnvDict = {
    step: 0,
    lin: 1, linear: 1,
    exp: 2, exponential: 2,
    sin: 3, sine: 3,
    wel: 4, welch: 4,
    sqr: 6, squared: 6,
    cub: 7, cubed: 7,
    hold: 8
};

class EnvSpec {
    constructor(levels, times, curves, releaseNode, loopNode, offset) {
        this.levels = levels;
        this.times = times;
        this.curves = Array.isArray(curves) ? curves : [curves];
        this.releaseNode = releaseNode;
        this.loopNode = loopNode;
        this.offset = offset;
        console.log('EnvSpec', curves, this);
    }
}

// Env([0, 1, 0], [0.1, 0.9], 'lin', null, null, 0).coord() // => [0, 2, -99, -99, 1, 0.1, 1, 0, 0, 0.9, 1, 0]
function Env(levels, times, curves, releaseNode, loopNode, offset) {
    return new EnvSpec(levels, times, curves, releaseNode, loopNode, offset);
}

EnvSpec.prototype.coord = function() {
    var n = this.levels.length - 1;
    var r = [];
    r.push(this.levels[0]);
    r.push(n);
    r.push(this.releaseNode || -99);
    r.push(this.loopNode || -99);
    for(var i = 0; i < n; i++) {
        var c = arrayAtWrap(this.curves, i);
        r.push(this.levels[i + 1]);
        r.push(arrayAtWrap(this.times, i));
        r.push(EnvDict[c] || 5);
        r.push(isString(c) ? 0 : c);
    }
    return r;
};

function coord(envelope) {
    return envelope.coord;
}

function EnvADSR(attackTime, decayTime, sustainLevel, releaseTime, peakLevel, curve) {
    return Env(
        [0, peakLevel, mul(peakLevel, sustainLevel), 0],
        [attackTime, decayTime, releaseTime],
        curve,
        2,
        null,
        0);
}

function ADSR(gate, attackTime, decayTime, sustainLevel, releaseTime, curve) {
    var env = EnvADSR(attackTime, decayTime, sustainLevel, releaseTime, 1, curve);
    return EnvGen(gate, 1, 0, 1, 0, env.coord());
}

function EnvASR(attackTime, sustainLevel, releaseTime, curve) {
    return Env(
        [0, sustainLevel, 0],
        [attackTime, releaseTime],
        curve,
        1,
        null,
        0);
}

function ASR(gate, attackTime, releaseTime, curve) {
    var env = EnvASR(attackTime, 1, releaseTime, curve);
    return EnvGen(gate, 1, 0, 1, 0, env.coord());
}

function EnvCutoff(sustainTime, releaseTime, curve) {
    return Env(
        [1, 1, 0],
        [sustainTime, releaseTime],
        curve,
        null,
        null,
        0);
}

function Cutoff(sustainTime, releaseTime, curve) {
    var env = EnvCutoff(sustainTime, releaseTime, curve);
    return EnvGen(1, 1, 0, 1, 0, env.coord());
}
