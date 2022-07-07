// sc3-texture.ts

import { arrayFromTo, arrayMap, arrayReduce } from './sc3-array.js'
import { EnvGen, Impulse, add, mul } from './sc3-bindings.js'
import { Env, envCoord } from './sc3-envelope.js'
import { Signal, kr } from './sc3-ugen.js'

export function OverlapTexture(graphFunc: (tr: Signal) => Signal, sustainTime: number, transitionTime: number, overlap: number): Signal {
	var voiceFunction = function(i: number): Signal {
		var trg = kr(Impulse(1 / (sustainTime + (transitionTime * 2)), i / overlap));
		var snd = graphFunc(trg);
		var env = Env([0, 1, 1, 0], [transitionTime,sustainTime,transitionTime], 'sin', null, null, 0);
		var sig = mul(snd, EnvGen(trg, 1, 0, 1, 0, envCoord(env)));
		return sig;
	};
	return arrayReduce(arrayMap(arrayFromTo(0, overlap - 1), voiceFunction), add);
}
