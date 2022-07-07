// sc3-envelope.ts

import { arrayAtWrap, arrayLength } from './sc3-array.js'
import { mul } from './sc3-bindings.js'
import { Queue, queueNew, queuePush, queueAsArray } from './sc3-queue.js'
import { isString } from './sc3-string.js'
import { Tree } from './sc3-tree.js'
import { Signal } from './sc3-ugen.js'

export type EnvCurveDictionary = { [key: string]: number };

export var envCurveDictionary: EnvCurveDictionary = {
	step: 0,
	lin: 1, linear: 1,
	exp: 2, exponential: 2,
	sin: 3, sine: 3,
	wel: 4, welch: 4,
	sqr: 6, squared: 6,
	cub: 7, cubed: 7,
	hold: 8
};

export type Env = { [key: string]: any };

export type Maybe<T> = T | null;

export type EnvCurves = Tree<string | Signal>;

// envCoord(Env([0, 1, 0], [0.1, 0.9], 'lin', null, null, 0)) // => [0, 2, -99, -99, 1, 0.1, 1, 0, 0, 0.9, 1, 0]
export function Env(levels: Signal[], times: Signal[], curves: EnvCurves, releaseNode: Maybe<number>, loopNode: Maybe<number>, offset: number): Env {
	return {
		levels: levels,
		times: times,
		curves: Array.isArray(curves) ? curves : [curves],
		releaseNode: releaseNode,
		loopNode: loopNode,
		offset: offset
	};
}

export function envCoord(env: Env): Signal[] {
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
	return queueAsArray(answerQueue);
}

export function EnvADSR(attackTime: Signal, decayTime: Signal, sustainLevel: Signal, releaseTime: Signal, peakLevel: Signal, curve: Signal): Env {
	 return Env(
		[0, peakLevel, mul(peakLevel, sustainLevel), 0],
		[attackTime, decayTime, releaseTime],
		curve,
		2,
		null,
		0);
}

export function EnvASR(attackTime: Signal, sustainLevel: Signal, releaseTime: Signal, curve: Signal): Env {
	return Env(
		[0, sustainLevel, 0],
		[attackTime, releaseTime],
		curve,
		1,
		null,
		0);
}

export function EnvCutoff(sustainTime: Signal, releaseTime: Signal, curve: Signal): Env {
	return Env(
		[1, 1, 0],
		[sustainTime, releaseTime],
		curve,
		null,
		null,
		0);
}
