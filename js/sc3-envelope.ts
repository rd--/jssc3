// sc3-envelope.ts ; requires: sc3-array sc3-bindings sc3-queue sc3-tree sc3-ugen

type EnvCurveDictionary = { [key: string]: number };

var envCurveDictionary: EnvCurveDictionary = {
    step: 0,
    lin: 1, linear: 1,
    exp: 2, exponential: 2,
    sin: 3, sine: 3,
    wel: 4, welch: 4,
    sqr: 6, squared: 6,
    cub: 7, cubed: 7,
    hold: 8
};

type Env = { [key: string]: any };

type Maybe<T> = T | null;

type EnvCurves = Tree<string | Signal>;

// envCoord(Env([0, 1, 0], [0.1, 0.9], 'lin', null, null, 0)) // => [0, 2, -99, -99, 1, 0.1, 1, 0, 0, 0.9, 1, 0]
function Env(levels: Signal[], times: Signal[], curves: EnvCurves, releaseNode: Maybe<number>, loopNode: Maybe<number>, offset: number): Env {
    return {
        levels: levels,
        times: times,
        curves: Array.isArray(curves) ? curves : [curves],
        releaseNode: releaseNode,
        loopNode: loopNode,
        offset: offset
    };
}

function envCoord(env: Env): Signal[] {
    var segmentCount = arrayLength(env.levels) - 1;
    var answerQueue = queueNew();
    var store = function(aValue: any) { queuePush(answerQueue, aValue); };
    store(env.levels[0]);
    store(segmentCount);
    store(env.releaseNode || -99);
    store(env.loopNode || -99);
    for(var i = 0; i < segmentCount; i++) {
        var c = arrayAtWrap(env.curves, i);
        store(env.levels[i + 1]);
        store(arrayAtWrap(env.times, i));
        store(isString(c) ? envCurveDictionary[<string>c] : 5);
        store(isString(c) ? 0 : c);
    }
    return queueToArray(answerQueue);
}

function EnvADSR(attackTime: Signal, decayTime: Signal, sustainLevel: Signal, releaseTime: Signal, peakLevel: Signal, curve: Signal): Env {
     return Env(
        [0, peakLevel, mul(peakLevel, sustainLevel), 0],
        [attackTime, decayTime, releaseTime],
        curve,
        2,
        null,
        0);
}

function EnvASR(attackTime: Signal, sustainLevel: Signal, releaseTime: Signal, curve: Signal): Env {
    return Env(
        [0, sustainLevel, 0],
        [attackTime, releaseTime],
        curve,
        1,
        null,
        0);
}

function EnvCutoff(sustainTime: Signal, releaseTime: Signal, curve: Signal): Env {
    return Env(
        [1, 1, 0],
        [sustainTime, releaseTime],
        curve,
        null,
        null,
        0);
}
