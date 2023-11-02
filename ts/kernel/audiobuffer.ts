import { arrayFillWithIndex } from '../kernel/array.ts'
import { interleave_sample_data } from '../kernel/float32array.ts'

// Number of frames multiplied by the number of channels.
export function audiobuffer_number_of_samples(audioBuffer: AudioBuffer): number {
	return audioBuffer.length * audioBuffer.numberOfChannels;
}

// Get all audio data as an array of Float32Array.
export function audiobuffer_channel_data_array(audioBuffer: AudioBuffer): Float32Array[] {
	return arrayFillWithIndex(
		audioBuffer.numberOfChannels,
		i => audioBuffer.getChannelData(i)
	);
}

// Get all audio data as an interleaved Float32Array.
export function audiobuffer_interleaved_channel_data(audioBuffer: AudioBuffer): Float32Array {
	if(audioBuffer.numberOfChannels === 1) {
		return audioBuffer.getChannelData(0);
	} else {
		const channelsArray = audiobuffer_channel_data_array(audioBuffer);
		const numberOfSamples = audioBuffer.length * audioBuffer.numberOfChannels;
		return interleave_sample_data(
			audioBuffer.length,
			audioBuffer.numberOfChannels,
			channelsArray
		);
	}
}

export function audiobuffer_maximum_absolute_value_and_frame_number_of(
	audioBuffer: AudioBuffer
): number[] {
	const channelsArray = audiobuffer_channel_data_array(audioBuffer);
	let maximumValue = 0;
	let frameNumber = 0;
	for(let i = 0; i < audioBuffer.length; i++) {
		for(let j = 0; j < audioBuffer.numberOfChannels; j++) {
			const nextValue = Math.abs(channelsArray[j][i]);
			if (nextValue > maximumValue) {
				maximumValue = nextValue;
				frameNumber = i;
			}
		}
	}
	return [maximumValue, frameNumber];
}
