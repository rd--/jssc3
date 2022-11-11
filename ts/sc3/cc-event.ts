import { arrayFromTo } from '../kernel/array.ts'

import { Latch } from './bindings.ts'
import { ControlIn } from './pseudo.ts'
import { ServerMessage, c_set1, c_setn1 } from './servercommand.ts'
import { Signal } from './ugen.ts'

type event<T> = { v: number, w: T, x: T, y: T, z: T, o: T, rx: T, ry: T, p: T, px: T };

export function EventParam<T>(v: number, u: T[]): event<T> {
	return {
		v: v,
		w: u[0],
		x: u[1],
		y: u[2],
		z: u[3],
		o: u[4],
		rx: u[5],
		ry: u[6],
		p: u[7],
		px: u[8]
	};
}

export function eventV<T>(e: event<T>): number { return e.v; }
export function eventW<T>(e: event<T>): T { return e.w; }
export function eventX<T>(e: event<T>): T { return e.x; }
export function eventY<T>(e: event<T>): T { return e.y; }
export function eventZ<T>(e: event<T>): T { return e.z; }
export function eventO<T>(e: event<T>): T { return e.o; }
export function eventRx<T>(e: event<T>): T { return e.rx; }
export function eventRy<T>(e: event<T>): T { return e.ry; }
export function eventP<T>(e: event<T>): T { return e.p; }

// Control bus address of voiceNumber (indexed from one).
export function voiceAddr(voiceNumber: number): number {
	const eventAddr = 13000;
	const eventIncr = 10;
	const eventZero = 0;
	const voiceAddr = eventAddr + ((voiceNumber - 1 + eventZero) * eventIncr);
	return voiceAddr;
}

export function Voicer(numVoices: number, voiceFunc: (e: event<Signal>) => Signal): Signal[] {
	const voiceOffset = 0;
	return arrayFromTo(1, numVoices).map(function(c) {
		const controlArray = <Signal[]>ControlIn(9, voiceAddr(c + voiceOffset));
		return voiceFunc(EventParam(c + voiceOffset, controlArray));
	});
}

export function eventParamSetMessage(e: event<number>): ServerMessage {
	return c_setn1(voiceAddr(e.v), [e.w, e.x, e.y, e.z, e.o, e.rx, e.ry, e.p, e.px]);
}

export function voiceEndMessage(voiceNumber: number): ServerMessage {
	return c_set1(voiceAddr(voiceNumber), 0);
}

// Kyma keyboard names, all values are 0-1
export function KeyDown(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 0); }
export function KeyTimbre(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 2); }
export function KeyPressure(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 3); }
export function KeyVelocity(voiceNumber: number): Signal { return Latch(KeyPressure(voiceNumber), KeyDown(voiceNumber)); }
export function KeyPitch(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 7); }

// Kyma pen names, all values are 0-1
export function PenDown(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 0); }
export function PenX(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 1); }
export function PenY(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 2); }
export function PenZ(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 3); }
export function PenAngle(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 4); }
export function PenRadius(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 5); }
