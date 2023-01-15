import { arrayFromTo } from '../kernel/array.ts'

import { Latch } from './bindings.ts'
import { ControlIn } from './pseudo.ts'
import { ServerMessage, c_set1, c_setn1 } from './servercommand.ts'
import { Signal } from './ugen.ts'

export class CcEvent<T> {
	voice: number;
	data: T[];
	constructor(voice: number, data: T[]) {
		this.voice = voice;
		this.data = data;
	}
	get v() { return this.voice; }
	get w() { return this.data[0]; }
	get x() { return this.data[1]; }
	get y() { return this.data[2]; }
	get z() { return this.data[3]; }
	get o() { return this.data[4]; }
	get rx() { return this.data[5]; }
	get ry() { return this.data[6]; }
	get p() { return this.data[7]; }
	get px() { return this.data[8]; }
}

export function eventV<T>(e: CcEvent<T>): number { return e.v; }
export function eventW<T>(e: CcEvent<T>): T { return e.w; }
export function eventX<T>(e: CcEvent<T>): T { return e.x; }
export function eventY<T>(e: CcEvent<T>): T { return e.y; }
export function eventZ<T>(e: CcEvent<T>): T { return e.z; }
export function eventO<T>(e: CcEvent<T>): T { return e.o; }
export function eventRx<T>(e: CcEvent<T>): T { return e.rx; }
export function eventRy<T>(e: CcEvent<T>): T { return e.ry; }
export function eventP<T>(e: CcEvent<T>): T { return e.p; }

// Control bus address of voiceNumber (indexed from one).
export function voiceAddr(voiceNumber: number): number {
	const eventAddr = 13000;
	const eventIncr = 10;
	const eventZero = 0;
	const voiceAddr = eventAddr + ((voiceNumber - 1 + eventZero) * eventIncr);
	return voiceAddr;
}

export function Voicer(numVoices: number, voiceFunc: (e: CcEvent<Signal>) => Signal): Signal[] {
	const voiceOffset = 0;
	return arrayFromTo(1, numVoices).map(function(c) {
		const controlArray = <Signal[]>ControlIn(9, voiceAddr(c + voiceOffset));
		return voiceFunc(new CcEvent(c + voiceOffset, controlArray));
	});
}

export function ccEventParamSetMessage(e: CcEvent<number>): ServerMessage {
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
