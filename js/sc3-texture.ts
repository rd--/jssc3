// sc3-texture.ts

import { arrayFromTo, arrayMap, arrayReduce } from './sc3-array.js'
import { EnvGen, Impulse, add, mul } from './sc3-bindings.js'
import { Env, envCoord } from './sc3-envelope.js'
import { Signal, kr } from './sc3-ugen.js'

export function OverlapTexture(graphFunc: (tr: Signal) => Signal, sustainTime: number, transitionTime: number, overlap: number): Signal {
	const voiceFunction = function(i: number): Signal {
		const trg = kr(Impulse(1 / (sustainTime + (transitionTime * 2)), i / overlap));
		const snd = graphFunc(trg);
		const env = Env([0, 1, 1, 0], [transitionTime,sustainTime,transitionTime], 'sin', null, null, 0);
		const sig = mul(snd, EnvGen(trg, 1, 0, 1, 0, envCoord(env)));
		return sig;
	};
	return arrayReduce(arrayMap(arrayFromTo(0, overlap - 1), voiceFunction), add);
}
