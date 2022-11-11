import { shiftLeft } from './bindings.ts'
import { Splay2 } from './pseudo.ts'
import { Signal } from './ugen.ts'

export function splay2(inArray: Signal): Signal {
	return Splay2(inArray);
}

export function bitShiftLeft(a: Signal, b: Signal): Signal {
	return shiftLeft(a, b);
}
