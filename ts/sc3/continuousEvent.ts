import { arrayFromTo } from '../kernel/array.ts';
import { OscMessage } from '../stdlib/openSoundControl.ts';

import { Add, Latch, Mul, Sub } from './bindings.ts';
import { ControlIn } from './pseudo.ts';
import { c_set1, c_setn1 } from './serverCommand.ts';
import { Signal, signalNumber } from './ugen.ts';

export class ContinuousEvent<T> {
	part: number;
	voice: number;
	contents: T[];
	constructor(part: number, voice: number, contents: T[]) {
		this.part = part;
		this.voice = voice;
		this.contents = contents;
	}
	get w() {
		return this.contents[0];
	}
	get x() {
		return this.contents[1];
	}
	get y() {
		return this.contents[2];
	}
	get z() {
		return this.contents[3];
	}
	get i() {
		return this.contents[4];
	}
	get j() {
		return this.contents[5];
	}
	get k() {
		return this.contents[6];
	}
	get p() {
		return this.contents[7];
	}
}

/*
export function eventW<T>(e: ContinuousEvent<T>): T {
	return e.w;
}
export function eventX<T>(e: ContinuousEvent<T>): T {
	return e.x;
}
export function eventY<T>(e: ContinuousEvent<T>): T {
	return e.y;
}
export function eventZ<T>(e: ContinuousEvent<T>): T {
	return e.z;
}
export function eventI<T>(e: ContinuousEvent<T>): T {
	return e.i;
}
export function eventJ<T>(e: ContinuousEvent<T>): T {
	return e.j;
}
export function eventK<T>(e: ContinuousEvent<T>): T {
	return e.k;
}
export function eventP<T>(e: ContinuousEvent<T>): T {
	return e.p;
}
*/

// Control bus address of voiceNumber (indexed from one).
export function voiceAddr(part: number, voice: number): number {
	const addrZero = 13000;
	const maxEventParam = 10;
	const maxVoices = 24;
	const partAddr = addrZero + ((part - 1) * maxVoices * maxEventParam);
	const voiceAddr = partAddr + ((voice - 1) * maxEventParam);
	return voiceAddr;
}

export function Voicer(
	part: number,
	numVoices: number,
	voiceFunc: (e: ContinuousEvent<Signal>) => Signal,
): Signal[] {
	return arrayFromTo(1, numVoices).map(function (voice) {
		const controlArray = <Signal[]> ControlIn(8, voiceAddr(part, voice));
		return voiceFunc(new ContinuousEvent(part, voice, controlArray));
	});
}

export function ccEventParamSetMessage(e: ContinuousEvent<number>): OscMessage {
	return c_setn1(voiceAddr(e.part, e.voice), [e.w, e.x, e.y, e.z, e.i, e.j, e.k, e.p]);
}

export function voiceEndMessage(part: number, voice: number): OscMessage {
	return c_set1(voiceAddr(part, voice), 0);
}

// Kyma keyboard names, all values are 0-1
export function KeyDown(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 0);
}
export function KeyTimbre(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 2);
}
export function KeyPressure(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 3);
}
export function KeyVelocity(voiceNumber: number): Signal {
	return Latch(KeyPressure(voiceNumber), KeyDown(voiceNumber));
}
export function KeyPitch(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 7);
}

// Kyma pen names, all values are 0-1
export function PenDown(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 0);
}
export function PenX(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 1);
}
export function PenY(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 2);
}
export function PenZ(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 3);
}
export function PenAngle(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 4);
}
export function PenRadius(voiceNumber: number): Signal {
	return ControlIn(1, voiceAddr(0, voiceNumber) + 5);
}
