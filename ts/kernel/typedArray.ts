import { arrayFill } from '../kernel/array.ts'

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

/* Interleave data from channelsArray into interleavedArray. */
export function interleave_sample_data_into(
	numberOfFrames: number,
	numberOfChannels: number,
	channelsArray: TypedArray[],
	interleavedArray: TypedArray
): void {
	for(let i = 0; i < numberOfFrames; i++) {
		for(let j = 0; j < numberOfChannels; j++) {
			interleavedArray[i * numberOfChannels + j] = channelsArray[j][i];
		}
	}
}

/* Deinterleave data from interleavedArray into channelsArray. */
export function deinterleave_sample_data_into(
	numberOfFrames: number,
	numberOfChannels: number,
	interleavedArray: TypedArray,
	channelsArray: TypedArray[]
): void {
	for(let i = 0; i < numberOfFrames; i++) {
		for(let j = 0; j < numberOfChannels; j++) {
			channelsArray[j][i] = interleavedArray[i * numberOfChannels + j];
		}
	}
}

export function interleave_sample_data<T extends TypedArray>(
	numberOfFrames: number,
	numberOfChannels: number,
	channelsArray: T[],
	cons: (size: number) => T
): T {
	const interleavedArray = cons(numberOfFrames * numberOfChannels);
	interleave_sample_data_into(
		numberOfFrames,
		numberOfChannels,
		channelsArray,
		interleavedArray
	);
	return interleavedArray;
}

export function deinterleave_sample_data<T extends TypedArray>(
	numberOfFrames: number,
	numberOfChannels: number,
	interleavedArray: T,
	cons: (size: number) => T
): T[] {
	const channelsArray = arrayFill(
		numberOfChannels,
		() => cons(numberOfFrames)
	);
	deinterleave_sample_data_into(
		numberOfFrames,
		numberOfChannels,
		interleavedArray,
		channelsArray
	);
	return channelsArray;
}
