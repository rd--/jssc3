import { ShiftLeft, ShiftRight } from './bindings.ts';
import { Signal } from './ugen.ts';

export function bitShiftLeft(a: Signal, b: Signal): Signal {
	return ShiftLeft(a, b);
}

export function bitShiftRight(a: Signal, b: Signal): Signal {
	return ShiftRight(a, b);
}
