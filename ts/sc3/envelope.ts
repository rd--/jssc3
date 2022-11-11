import { asArray, arrayAtWrap, arrayLength } from '../kernel/array.ts'
import { isString } from '../kernel/string.ts'

import { Maybe, fromMaybe } from '../stdlib/maybe.ts'
import { queueNew, queuePush, queueAsArray } from '../stdlib/queue.ts'
import { Tree } from '../stdlib/tree.ts'

import { mul } from './bindings.ts'
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

export type Env = Record<string, any>;

/*
export type Env = {
	levels: Signal[],
	times: Signal[],
	curves: EnvCurve[],
	releaseNode: number,
	loopNode: number,
	offset: number
};
*/

export type EnvCurve = string | UgenInput;

// envCoord(Env([0, 1, 0], [0.1, 0.9], 'lin', null, null, 0)) // => [0, 2, -99, -99, 1, 0.1, 1, 0, 0, 0.9, 1, 0]
export function Env(levels: Signal[], times: Signal[], curves: Tree<EnvCurve>, releaseNode: Maybe<number>, loopNode: Maybe<number>, offset: number): Env {
	return {
		levels: levels,
		times: times,
		curves: asArray(curves),
		releaseNode: fromMaybe(releaseNode, -99),
		loopNode: fromMaybe(loopNode, -99),
		offset: offset
	};
}

export function envCoord(env: Env): Signal[] {
	const segmentCount = arrayLength(env.levels) - 1;
	const answerQueue = queueNew<UgenInput>();
	const store = function(aValue: UgenInput) { queuePush(answerQueue, aValue); };
	store(env.levels[0]);
	store(segmentCount);
	store(env.releaseNode);
	store(env.loopNode);
	for(let i = 0; i < segmentCount; i++) {
		const c = <string | UgenInput>arrayAtWrap(env.curves, i);
		store(env.levels[i + 1]);
		store(arrayAtWrap(env.times, i));
		store(isString(c) ? envCurveDictionary[c] : 5);
		store(isString(c) ? 0 : c);
	}
	return <Signal[]>queueAsArray(answerQueue);
}

export function EnvAdsr(attackTime: Signal, decayTime: Signal, sustainLevel: Signal, releaseTime: Signal, peakLevel: Signal, curve: Signal): Env {
	 return Env(
		[0, peakLevel, mul(peakLevel, sustainLevel), 0],
		[attackTime, decayTime, releaseTime],
		curve,
		2,
		null,
		0);
}

export function EnvAsr(attackTime: Signal, sustainLevel: Signal, releaseTime: Signal, curve: Signal): Env {
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
