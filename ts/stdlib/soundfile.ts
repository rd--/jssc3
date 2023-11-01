import { arrayIota } from '../kernel/array.ts'
import { Dictionary, dictionaryNew } from '../kernel/dictionary.ts'
import { fetch_arraybuffer_then } from '../kernel/io.ts'

export type AudioBufferHeader = {
	numFrames: number,
	duration: number, // numFrames ÷ sampleRate
	sampleRate: number,
	numberOfChannels: number
};

// Return the header fields of an audioBuffer.  length is the number of frames.
export function audiobuffer_header(audioBuffer: AudioBuffer): AudioBufferHeader {
	return {
		numFrames: audioBuffer.length,
		duration: audioBuffer.duration,
		sampleRate: audioBuffer.sampleRate,
		numberOfChannels: audioBuffer.numberOfChannels
	};
}

// Number of frames multiplied by the number of channels.
export function audiobuffer_number_of_samples(audioBuffer: AudioBuffer): number {
	return audioBuffer.length * audioBuffer.numberOfChannels;
}

// Get all audio data as an array of Float32Array.
export function audiobuffer_channel_data_array(audioBuffer: AudioBuffer): Float32Array[] {
	return arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
}

// Interleave data from channelsArray into outputArray.
export function interleave_sample_data(numberOfFrames: number, numberOfChannels: number, channelsArray: Float32Array[], outputArray: Float32Array): void {
	for(let i = 0; i < numberOfFrames; i++) {
		for(let j = 0; j < numberOfChannels; j++) {
			outputArray[i * numberOfChannels + j] = channelsArray[j][i];
		}
	}
}

// Get all audio data as an interleaved Float32Array.
export function audiobuffer_interleaved_channel_data(audioBuffer: AudioBuffer): Float32Array {
	if(audioBuffer.numberOfChannels === 1) {
		return audioBuffer.getChannelData(0);
	} else {
		const channelsArray = arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
		const outputArray = new Float32Array(audioBuffer.length * audioBuffer.numberOfChannels);
		interleave_sample_data(audioBuffer.length, audioBuffer.numberOfChannels, channelsArray, outputArray);
		return outputArray;
	}
}

export function audiobuffer_maximum_absolute_value_and_frame_number_of(audioBuffer: AudioBuffer): number[] {
	const channelsArray = arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
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

// Get the sample rate of the audio context
export function system_samplerate(): number {
	const audioContext = new window.AudioContext();
	console.log('audioContext.sampleRate', audioContext.sampleRate);
	return audioContext.sampleRate;
}

// Load soundfile from url, decode it, and call proc on the resulting AudioBuffer.
export function fetch_soundfile_to_audiobuffer_and_then(soundFileUrl: string, proc: (x: AudioBuffer) => void): void {
	const audioContext = new window.AudioContext();
	fetch_arraybuffer_then(soundFileUrl, function(arrayBuffer) {
		audioContext.decodeAudioData(arrayBuffer).then(proc);
	});
}
