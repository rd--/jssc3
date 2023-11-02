import { arrayFill } from '../kernel/array.ts'

/* Interleave data from channelsArray into interleavedArray. */
export function interleave_sample_data_into(
	numberOfFrames: number,
	numberOfChannels: number,
	channelsArray: Float32Array[],
	interleavedArray: Float32Array
): void {
	for(let i = 0; i < numberOfFrames; i++) {
		for(let j = 0; j < numberOfChannels; j++) {
			interleavedArray[i * numberOfChannels + j] = channelsArray[j][i];
		}
	}
}

export function interleave_sample_data(
	numberOfFrames: number,
	numberOfChannels: number,
	channelsArray: Float32Array[]
): Float32Array {
	const interleavedArray = new Float32Array(numberOfFrames * numberOfChannels);
	interleave_sample_data_into(
		numberOfFrames,
		numberOfChannels,
		channelsArray,
		interleavedArray
	);
	return interleavedArray;
}

/* Deinterleave data from interleavedArray into channelsArray. */
export function deinterleave_sample_data_into(
	numberOfFrames: number,
	numberOfChannels: number,
	interleavedArray: Float32Array,
	channelsArray: Float32Array[]
): void {
	for(let i = 0; i < numberOfFrames; i++) {
		for(let j = 0; j < numberOfChannels; j++) {
			channelsArray[j][i] = interleavedArray[i * numberOfChannels + j];
		}
	}
}

export function deinterleave_sample_data(
	numberOfFrames: number,
	numberOfChannels: number,
	interleavedArray: Float32Array
): Float32Array[] {
	const channelsArray = arrayFill(
		numberOfChannels,
		() => new Float32Array(numberOfFrames)
	);
	deinterleave_sample_data_into(
		numberOfFrames,
		numberOfChannels,
		interleavedArray,
		channelsArray
	);
	return channelsArray;
}
