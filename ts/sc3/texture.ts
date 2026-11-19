import { arrayFromTo, arrayMap, arrayReduce } from '../kernel/array.ts';

import { Add, Impulse, Mul } from './bindings.ts';
import { Env, EnvGen } from './envelope.ts';
import { Signal, UgenConstant, kr, narrowUgenConstant } from './ugen.ts';

export function OverlapTextureArray(
	graphFunc: (tr: Signal) => Signal,
	sustainTime: UgenConstant,
	transitionTime: UgenConstant,
	overlap: UgenConstant,
): Signal[] {
	sustainTime = narrowUgenConstant(sustainTime);
	transitionTime = narrowUgenConstant(transitionTime);
	overlap = narrowUgenConstant(overlap);
	const voiceFunction = function (i: number): Signal {
		const trg = kr(
			Impulse(1 / (sustainTime + (transitionTime * 2)), i / overlap),
		);
		const snd = graphFunc(trg);
		const env = new Env(
			[0, 1, 1, 0],
			[transitionTime, sustainTime, transitionTime],
			'sin',
			null,
			null,
			0,
		);
		const sig = Mul(snd, EnvGen(trg, 1, 0, 1, 0, env));
		return sig;
	};
	return arrayMap(voiceFunction, arrayFromTo(0, overlap - 1));
}

export function OverlapTexture(
	graphFunc: (tr: Signal) => Signal,
	sustainTime: UgenConstant,
	transitionTime: UgenConstant,
	overlap: UgenConstant,
): Signal {
	return arrayReduce(
		OverlapTextureArray(graphFunc, sustainTime, transitionTime, overlap),
		Add,
	);
}

export function XFadeTexture(
	graphFunc: (tr: Signal) => Signal,
	sustainTime: UgenConstant,
	transitionTime: UgenConstant,
): Signal {
	sustainTime = narrowUgenConstant(sustainTime);
	transitionTime = narrowUgenConstant(transitionTime);
	const envDur = (sustainTime + transitionTime) * 2;
	const voiceFunction = function (phase: number): Signal {
		const trg = kr(Impulse(1 / envDur, phase));
		const snd = graphFunc(trg);
		const env = new Env(
			[0, 1, 1, 0, 0],
			[transitionTime, sustainTime, transitionTime, sustainTime],
			'sin',
			null,
			null,
			0,
		);
		const sig = Mul(snd, EnvGen(trg, 1, 0, 1, 0, env));
		return sig;
	};
	return Add(voiceFunction(0), voiceFunction(0.5));
}
