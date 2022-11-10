import { encodeFloat32Array } from '../kernel/encode.js'

import { audiobuffer_interleaved_channel_data, fetch_soundfile_to_audiobuffer_and_then } from '../stdlib/soundfile.js'

import { ScsynthWasm, sendOsc } from './scsynth-wasm.js'
import { b_alloc_then_memcpy } from './servercommand.js'

export function audiobuffer_to_scsynth_buffer(scsynth: ScsynthWasm, audioBuffer: AudioBuffer, bufferNumber: number, numberOfChannels: number, bufferData: Float32Array): void {
	const numberOfFrames = audioBuffer.length;
	const sampleRate = audioBuffer.sampleRate;
	const oscMessage = b_alloc_then_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, encodeFloat32Array(bufferData));
	console.log(`audiobuffer_to_scsynth_buffer: ${oscMessage}`);
	sendOsc(scsynth, oscMessage);
}

// Fetch sound file data, and then allocate a buffer and memcpy all interleaved channel data.
export function fetch_soundfile_to_scsynth_buffer(scsynth: ScsynthWasm, soundFileUrl: string, numberOfChannels: number, bufferNumber: number): void {
	fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
		if(audioBuffer.numberOfChannels === numberOfChannels) {
			audiobuffer_to_scsynth_buffer(
				scsynth,
				audioBuffer,
				bufferNumber,
				numberOfChannels,
				audiobuffer_interleaved_channel_data(audioBuffer)
			);
		} else {
			console.error('fetch_soundfile_to_scsynth_buffer: numberOfChannels mismatch');
		}
	});
}

// Fetch single channels of sound file data to mono scsynth buffers.  The channel numbers are one-indexed.
export function fetch_soundfile_channels_to_scsynth_buffers(scsynth: ScsynthWasm, soundFileUrl: string, bufferNumbers: number[], channelIndices: number[]): void {
	fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
		for(let i = 0; i < bufferNumbers.length; i++) {
			const bufferNumber = bufferNumbers[i];
			const channelIndex = channelIndices[i];
			if(channelIndex >= 1 && channelIndex <= audioBuffer.numberOfChannels) {
				audiobuffer_to_scsynth_buffer(scsynth, audioBuffer, bufferNumber, 1, audioBuffer.getChannelData(channelIndex - 1));
			} else {
				console.error(`fetch_soundfile_channels_to_scsynth_buffers: index out of bounds: ${channelIndex}, ${audioBuffer.numberOfChannels}`);
			}
		}
	});
}
