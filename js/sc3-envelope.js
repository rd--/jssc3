'use strict';

var envCurveDictionary = {
    step: 0,
    lin: 1, linear: 1,
    exp: 2, exponential: 2,
    sin: 3, sine: 3,
    wel: 4, welch: 4,
    sqr: 6, squared: 6,
    cub: 7, cubed: 7,
    hold: 8
};

// envCoord(Env([0, 1, 0], [0.1, 0.9], 'lin', null, null, 0)) // => [0, 2, -99, -99, 1, 0.1, 1, 0, 0, 0.9, 1, 0]
function Env(levels, times, curves, releaseNode, loopNode, offset) {
    return {
        levels: levels,
        times: times,
        curves: Array.isArray(curves) ? curves : [curves],
        releaseNode: releaseNode,
        loopNode: loopNode,
        offset: offset
    };
}

function envCoord(env) {
    var n = env.levels.length - 1;
    var r = [];
    r.push(env.levels[0]);
    r.push(n);
    r.push(env.releaseNode || -99);
    r.push(env.loopNode || -99);
    for(var i = 0; i < n; i++) {
        var c = arrayAtWrap(env.curves, i);
        r.push(env.levels[i + 1]);
        r.push(arrayAtWrap(env.times, i));
        r.push(envCurveDictionary[c] || 5);
        r.push(isString(c) ? 0 : c);
    }
    return r;
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

function EnvASR(attackTime, sustainLevel, releaseTime, curve) {
    return Env(
        [0, sustainLevel, 0],
        [attackTime, releaseTime],
        curve,
        1,
        null,
        0);
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
