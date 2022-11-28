import { arrayFromTo, arrayMap, arrayReduce } from '../kernel/array.ts'

import { Add, EnvGen, Impulse, Mul } from './bindings.ts'
import { Env, envCoord } from './envelope.ts'
import { Signal, kr } from './ugen.ts'

export function OverlapTexture(graphFunc: (tr: Signal) => Signal, sustainTime: number, transitionTime: number, overlap: number): Signal {
	const voiceFunction = function(i: number): Signal {
		const trg = kr(Impulse(1 / (sustainTime + (transitionTime * 2)), i / overlap));
		const snd = graphFunc(trg);
		const env = new Env([0, 1, 1, 0], [transitionTime,sustainTime,transitionTime], 'sin', null, null, 0);
		const sig = Mul(snd, EnvGen(trg, 1, 0, 1, 0, envCoord(env)));
		return sig;
	};
	return arrayReduce(arrayMap(voiceFunction, arrayFromTo(0, overlap - 1)), Add);
}
