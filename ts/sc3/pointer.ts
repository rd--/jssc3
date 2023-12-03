import { Lag, LinExp } from './bindings.ts';
import { ControlIn, LinLin } from './pseudo.ts';
import { Signal } from './ugen.ts';

export function PointerW(n: number): Signal {
	return ControlIn(1, 15001 + (n * 10));
}

export function PointerX(n: number): Signal {
	return ControlIn(1, 15002 + (n * 10));
}

export function PointerY(n: number): Signal {
	return ControlIn(1, 15003 + (n * 10));
}

/*
Web Assembly scSynth does not include the Mouse unit generators.
*/

export function PointerMouseX(
	minval: Signal,
	maxval: Signal,
	warp: Signal,
	lag: Signal,
): Signal {
	switch (warp) {
		case 0:
			return LinLin(Lag(PointerX(0), lag), 0, 1, minval, maxval);
		case 1:
			return LinExp(Lag(PointerX(0), lag), 0, 1, minval, maxval);
		default:
			console.error(`MouseX: unknown warp: ${warp}`);
			return 0;
	}
}

export function PointerMouseY(
	minval: Signal,
	maxval: Signal,
	warp: Signal,
	lag: Signal,
): Signal {
	switch (warp) {
		case 0:
			return LinLin(Lag(PointerY(0), lag), 0, 1, minval, maxval);
		case 1:
			return LinExp(Lag(PointerY(0), lag), 0, 1, minval, maxval);
		default:
			console.error(`MouseY: unknown warp: ${warp}`);
			return 0;
	}
}

export function PointerMouseButton(
	minval: Signal,
	maxval: Signal,
	lag: Signal,
): Signal {
	return LinLin(Lag(PointerW(0), lag), 0, 1, minval, maxval);
}

export const Pointer = {
	x: PointerMouseX,
	y: PointerMouseY,
	z: PointerMouseButton,
};
