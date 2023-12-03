export function ampDb(self: number) {
	return Math.log10(self) * 20;
}

export function coin(self: number) {
	return Math.random() < self;
}

export function cpsMidi(self: number) {
	return Math.log2(self * (1 / 440)) * 12 + 69;
}

export function cpsOct(self: number) {
	return Math.log2(self * (1.0 / 440.0)) + 4.75;
}

export function dbAmp(self: number) {
	return Math.pow(10, self * 0.05);
}

export function difSqr(self: number, aNumber: number) {
	return (self * self) - (aNumber * aNumber);
}

export function hypot(self: number, aNumber: number) {
	return Math.sqrt((self * self) + (aNumber * aNumber));
}

export function midiCps(self: number) {
	return 440 * (2 ** ((self - 69) * (1 / 12)));
}

export function midiRatio(self: number) {
	return Math.pow(2.0, self * (1.0 / 12.0));
}

export function octCps(self: number) {
	return 440.0 * Math.pow(2.0, self - 4.75);
}

export function ratioMidi(self: number) {
	return 12.0 * Math.log2(self);
}
