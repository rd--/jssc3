// sc3-buffer.ts

import { encodeFloat32Array } from './sc3-encode.js'
import { ServerMessage, b_alloc_then_memcpy } from './sc3-servercommand.js'
import { audiobuffer_interleaved_channel_data, fetch_soundfile_to_audiobuffer_and_then } from './sc3-soundfile.js'

declare function sendOsc(message: ServerMessage): void; // sc3-wasm

export function audiobuffer_to_scsynth_buffer(audioBuffer: AudioBuffer, bufferNumber: number, numberOfChannels: number, bufferData: Float32Array): void {
	const numberOfFrames = audioBuffer.length;
	const sampleRate = audioBuffer.sampleRate;
	const oscMessage = b_alloc_then_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, encodeFloat32Array(bufferData));
	console.log(`audiobuffer_to_scsynth_buffer: ${oscMessage}`);
	sendOsc(oscMessage);
}

// Fetch sound file data, and then allocate a buffer and memcpy all interleaved channel data.
export function fetch_soundfile_to_scsynth_buffer(soundFileUrl: string, numberOfChannels: number, bufferNumber: number): void {
	fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
		if(audioBuffer.numberOfChannels === numberOfChannels) {
			audiobuffer_to_scsynth_buffer(
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
export function fetch_soundfile_channels_to_scsynth_buffers(soundFileUrl: string, bufferNumbers: number[], channelIndices: number[]): void {
	fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
		for(let i = 0; i < bufferNumbers.length; i++) {
			const bufferNumber = bufferNumbers[i];
			const channelIndex = channelIndices[i];
			if(channelIndex >= 1 && channelIndex <= audioBuffer.numberOfChannels) {
				audiobuffer_to_scsynth_buffer(audioBuffer, bufferNumber, 1, audioBuffer.getChannelData(channelIndex - 1));
			} else {
				console.error(`fetch_soundfile_channels_to_scsynth_buffers: index out of bounds: ${channelIndex}, ${audioBuffer.numberOfChannels}`);
			}
		}
	});
}
