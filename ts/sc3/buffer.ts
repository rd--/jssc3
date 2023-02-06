import { encodeFloat32Array } from '../kernel/encode.ts'

import { audiobuffer_interleaved_channel_data, fetch_soundfile_to_audiobuffer_and_then } from '../stdlib/soundfile.ts'

import { ScSynth } from './scsynth.ts'
import { b_alloc_then_memcpy } from './servercommand.ts'

export function audiobuffer_to_scsynth_buffer(scSynth: ScSynth, audioBuffer: AudioBuffer, bufferNumber: number, numberOfChannels: number, bufferData: Float32Array): void {
	const numberOfFrames = audioBuffer.length;
	const sampleRate = audioBuffer.sampleRate;
	const oscMessage = b_alloc_then_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, encodeFloat32Array(bufferData));
	console.log(`audiobuffer_to_scsynth_buffer: ${oscMessage}`);
	scSynth.sendOsc(oscMessage);
}

// Fetch sound file data, and then allocate a buffer and memcpy all interleaved channel data.
export function fetch_soundfile_to_scsynth_buffer(scSynth: ScSynth, soundFileUrl: string, numberOfChannels: number, bufferNumber: number): void {
	fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
		if(audioBuffer.numberOfChannels === numberOfChannels) {
			audiobuffer_to_scsynth_buffer(
				scSynth,
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

// Fetch single channels of sound file data to mono scSynth buffers.  The channel numbers are one-indexed.
export function fetch_soundfile_channels_to_scsynth_buffers(scSynth: ScSynth, soundFileUrl: string, bufferNumbers: number[], channelIndices: number[]): void {
	fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
		for(let i = 0; i < bufferNumbers.length; i++) {
			const bufferNumber = bufferNumbers[i];
			const channelIndex = channelIndices[i];
			if(channelIndex >= 1 && channelIndex <= audioBuffer.numberOfChannels) {
				audiobuffer_to_scsynth_buffer(scSynth, audioBuffer, bufferNumber, 1, audioBuffer.getChannelData(channelIndex - 1));
			} else {
				console.error(`fetch_soundfile_channels_to_scsynth_buffers: index out of bounds: ${channelIndex}, ${audioBuffer.numberOfChannels}`);
			}
		}
	});
}
