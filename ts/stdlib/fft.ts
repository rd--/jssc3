import FFT from '../../lib/scsynth-wasm-builds/lib/ext/fft.js';

// input and output are both complex [r1, i1, r2, i2 ...]
export function fft(input: number[]): number[] {
	const size = input.length / 2;
	const fft = new FFT(size);
	const output = fft.createComplexArray();
	fft.transform(output, input);
	return output;
}

// input is real [r1 r2 ...], output is complex [r1, i1, r2, i2 ...]
export function realFft(input: number[]): number[] {
	const size = input.length;
	const fft = new FFT(size);
	const output = fft.createComplexArray();
	fft.realTransform(output, input);
	fft.completeSpectrum(output);
	return output;
}

// input and output are both complex
export function inverseFft(input: number[]): number[] {
	const size = input.length / 2;
	const fft = new FFT(size);
	const output = fft.createComplexArray();
	fft.inverseTransform(output, input);
	return output;
}
