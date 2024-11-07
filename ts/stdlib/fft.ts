import FFT from '../../lib/scsynth-wasm-builds/lib/ext/fft.js';

export function realFft(input: number[]): number[] {
	const size = input.length;
	const fft = new FFT(size);
	const output = fft.createComplexArray();
	fft.realTransform(output, input);
	fft.completeSpectrum(output);
	return output;
}
