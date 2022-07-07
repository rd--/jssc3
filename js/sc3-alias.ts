import { shiftLeft } from './sc3-bindings.js'
import { Splay2 } from './sc3-pseudo.js'
import { Signal } from './sc3-ugen.js'

export function splay2(inArray: Signal): Signal {
	return Splay2(inArray);
}

export function bitShiftLeft(a: Signal, b: Signal): Signal {
	return shiftLeft(a, b);
}
