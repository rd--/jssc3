import { shiftLeft } from './bindings.js'
import { Splay2 } from './pseudo.js'
import { Signal } from './ugen.js'

export function splay2(inArray: Signal): Signal {
	return Splay2(inArray);
}

export function bitShiftLeft(a: Signal, b: Signal): Signal {
	return shiftLeft(a, b);
}
