import { PointerMouseButton, PointerMouseX, PointerMouseY } from './pointer.ts';
import { rateKr } from './rate.ts';
import { ScSynth } from './scSynth.ts';
import { makeUgen, Signal } from './ugen.ts';

declare global {
	var globalScSynth: ScSynth;
}

/** Respond to the state of a key. */
export function KeyState(
	keycode: Signal,
	minval: Signal,
	maxval: Signal,
	lag: Signal,
): Signal {
	if (!globalThis.globalScSynth.useIoUgens) {
		console.error('KeyState: no IoUgens');
		return 0;
	}
	return makeUgen('KeyState', 1, rateKr, 0, [keycode, minval, maxval, lag]);
}

/** Mouse button UGen. */
export function MouseButton(
	minval: Signal,
	maxval: Signal,
	lag: Signal,
): Signal {
	if (globalThis.globalScSynth.useIoUgens) {
		return makeUgen('MouseButton', 1, rateKr, 0, [minval, maxval, lag]);
	} else {
		return PointerMouseButton(minval, maxval, lag);
	}
}

/** Cursor tracking UGen. */
export function MouseX(
	minval: Signal,
	maxval: Signal,
	warp: Signal,
	lag: Signal,
): Signal {
	if (globalThis.globalScSynth.useIoUgens) {
		return makeUgen('MouseX', 1, rateKr, 0, [minval, maxval, warp, lag]);
	} else {
		return PointerMouseX(minval, maxval, warp, lag);
	}
}

/** Cursor tracking UGen. */
export function MouseY(
	minval: Signal,
	maxval: Signal,
	warp: Signal,
	lag: Signal,
): Signal {
	if (globalThis.globalScSynth.useIoUgens) {
		return makeUgen('MouseY', 1, rateKr, 0, [minval, maxval, warp, lag]);
	} else {
		return PointerMouseY(minval, maxval, warp, lag);
	}
}
