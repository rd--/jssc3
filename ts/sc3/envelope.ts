import { ScalarOrArray, asArray, arrayAtWrap, arrayLength } from '../kernel/array.ts'
import { throwError } from '../kernel/error.ts'
import { isString } from '../kernel/string.ts'

import { Maybe, fromMaybe } from '../stdlib/maybe.ts'
import { queueNew, queuePush, queueAsArray } from '../stdlib/queue.ts'
import { Tree, treeDepthFrom, treeFlatten } from '../stdlib/tree.ts'

import { Fdiv, Mul } from './bindings.ts'
import { Signal, UgenInput } from './ugen.ts'

export const envCurveDictionary: Record<string, number> = {
	step: 0,
	lin: 1, linear: 1,
	exp: 2, exponential: 2,
	sin: 3, sine: 3,
	wel: 4, welch: 4,
	sqr: 6, squared: 6,
	cub: 7, cubed: 7,
	hold: 8
};

export type EnvCurve = string | UgenInput;
export type EnvCurveSeq = ScalarOrArray<EnvCurve>

// envCoord(Env([0, 1, 0], [0.1, 0.9], 'lin', null, null, 0)) // => [0, 2, -99, -99, 1, 0.1, 1, 0, 0, 0.9, 1, 0]
export class Env {
	levels: Signal[];
	times: Signal[];
	curves: EnvCurve[];
	releaseNode: Maybe<number>;
	loopNode: Maybe<number>;
	offset: number;
	constructor(levels: Signal[], times: Signal[], curves: EnvCurveSeq, releaseNode: Maybe<number>, loopNode: Maybe<number>, offset: number) {
		this.levels = levels;
		this.times = times;
		this.curves = asArray(curves);
		this.releaseNode = releaseNode;
		this.loopNode = loopNode;
		this.offset = offset;
	};
}

export function envCoord(env: Env): Signal[] {
	const segmentCount = arrayLength(env.levels) - 1;
	const answerQueue = queueNew<Signal>();
	const store = function(aValue: Signal) { queuePush(answerQueue, aValue); };
	store(env.levels[0]);
	store(segmentCount);
	store(fromMaybe(env.releaseNode, -99));
	store(fromMaybe(env.loopNode, -99));
	for(let i = 0; i < segmentCount; i++) {
		const c = arrayAtWrap(env.curves, i);
		store(env.levels[i + 1]);
		store(arrayAtWrap(env.times, i));
		store(isString(c) ? envCurveDictionary[c] : 5);
		store(isString(c) ? 0 : c);
	}
	return <Signal[]>queueAsArray(answerQueue);
}

export function EnvAdsr(attackTime: Signal, decayTime: Signal, sustainLevel: Signal, releaseTime: Signal, peakLevel: Signal, curve: EnvCurveSeq): Env {
	 return new Env(
		[0, peakLevel, Mul(peakLevel, sustainLevel), 0],
		[attackTime, decayTime, releaseTime],
		curve,
		2,
		null,
		0
	 );
}

export function EnvAsr(attackTime: Signal, sustainLevel: Signal, releaseTime: Signal, curve: EnvCurveSeq): Env {
	return new Env(
		[0, sustainLevel, 0],
		[attackTime, releaseTime],
		curve,
		1,
		null,
		0
	);
}

export function EnvCutoff(sustainTime: Signal, releaseTime: Signal, curve: EnvCurveSeq): Env {
	return new Env(
		[1, 1, 0],
		[sustainTime, releaseTime],
		curve,
		null,
		null,
		0
	);
}

export function EnvRelease(attackTime: Signal, dur: Signal, releaseTime: Signal): Env {
	return new Env(
		[0, 1, 1, 0],
		[attackTime, dur, releaseTime],
		'lin',
		null,
		null,
		0
	);
}

export function EnvSine(dur: Signal): Env {
	return new Env(
		[0, 0, 1, 0],
		[0, Fdiv(dur, 2), Fdiv(dur, 2)],
		'sine',
		null,
		1,
		0
	);
}

export function EnvPerc(attackTime: Signal, releaseTime: Signal, level: Signal, curve: EnvCurveSeq): Env {
	return new Env(
		[0, level, 0],
		[attackTime, releaseTime],
		curve,
		null,
		null,
		0
	);
}

export function EnvLinen(attackTime: Signal, sustainTime: Signal, releaseTime: Signal, level: Signal, curve: EnvCurveSeq): Env {
	return new Env(
		[0, level, level, 0],
		[attackTime, sustainTime, releaseTime],
		curve,
		null,
		null,
		0
	);
}
