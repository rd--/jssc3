// sc3-pointer.ts

import { Lag, LinExp } from './sc3-bindings.js'
import { ControlIn, LinLin } from './sc3-pseudo.js'
import { Signal } from './sc3-ugen.js'

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
Web Assembly scsynth does not include the Mouse unit generators.
*/

export function pointerMouseX(minval: Signal, maxval: Signal, warp: Signal, lag: Signal): Signal {
	switch(warp) {
		case 0: return LinLin(Lag(PointerX(0), lag), 0, 1, minval, maxval);
		case 1: return LinExp(Lag(PointerX(0), lag), 0, 1, minval, maxval);
		default: console.error(`MouseX: unknown warp: ${warp}`); return 0;
	}
}

export function pointerMouseY(minval: Signal, maxval: Signal, warp: Signal, lag: Signal): Signal {
	switch(warp) {
		case 0: return LinLin(Lag(PointerY(0), lag), 0, 1, minval, maxval);
		case 1: return LinExp(Lag(PointerY(0), lag), 0, 1, minval, maxval);
		default: console.error(`MouseY: unknown warp: ${warp}`); return 0;
	}
}

export function pointerMouseButton(minval: Signal, maxval: Signal, lag: Signal): Signal {
	return LinLin(Lag(PointerW(0), lag), 0, 1, minval, maxval);
}
