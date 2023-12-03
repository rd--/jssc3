import { arrayFillWithIndex } from '../kernel/array.ts';
import { interleaveSampleData } from '../kernel/typedArray.ts';

// Number of frames multiplied by the number of channels.
export function audioBufferNumberOfSamples(anAudioBuffer: AudioBuffer): number {
	return anAudioBuffer.length * anAudioBuffer.numberOfChannels;
}

// Get all audio data as an array of Float32Array.
export function audioBufferChannelDataArray(
	anAudioBuffer: AudioBuffer,
): Float32Array[] {
	return arrayFillWithIndex(
		anAudioBuffer.numberOfChannels,
		(i) => anAudioBuffer.getChannelData(i),
	);
}

// Get all audio data as an interleaved Float32Array.
export function audioBufferInterleavedChannelData(
	anAudioBuffer: AudioBuffer,
): Float32Array {
	if (anAudioBuffer.numberOfChannels === 1) {
		return anAudioBuffer.getChannelData(0);
	} else {
		const channelsArray = audioBufferChannelDataArray(anAudioBuffer);
		const numberOfSamples = anAudioBuffer.length *
			anAudioBuffer.numberOfChannels;
		return interleaveSampleData(
			anAudioBuffer.length,
			anAudioBuffer.numberOfChannels,
			channelsArray,
			(size) => new Float32Array(size),
		);
	}
}

export function audioBufferMaximumAbsoluteValueAndFrameNumberOf(
	anAudioBuffer: AudioBuffer,
): number[] {
	const channelsArray = audioBufferChannelDataArray(anAudioBuffer);
	let maximumValue = 0;
	let frameNumber = 0;
	for (let i = 0; i < anAudioBuffer.length; i++) {
		for (let j = 0; j < anAudioBuffer.numberOfChannels; j++) {
			const nextValue = Math.abs(channelsArray[j][i]);
			if (nextValue > maximumValue) {
				maximumValue = nextValue;
				frameNumber = i;
			}
		}
	}
	return [maximumValue, frameNumber];
}
