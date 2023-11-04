import { encodeFloat32Array } from '../kernel/encode.ts'

import { OscMessage } from '../stdlib/openSoundControl.ts'
import { fetch_soundfile, SoundFile } from '../stdlib/soundFile.ts'

import { ScSynth } from './scSynth.ts'
import { b_alloc_then_memcpy } from './serverCommand.ts'

/*
import * as sc from './sc3.ts'

var scSynth = new sc.ScSynth();
sc.scSynthUseWebSocket(scSynth, 'ws://localhost:58110');
scSynth.connect();
var msg = sc.b_alloc_then_memcpy_float32array(200, 10, 1, 1000, new Float32Array([1,3,5,7,9,0,2,4,6,8]));
scSynth.sendOsc(msg)
*/
export function b_alloc_then_memcpy_float32array(
	bufferNumber: number,
	numberOfFrames: number,
	numberOfChannels: number,
	sampleRate: number,
	data: Float32Array
): OscMessage {
	return b_alloc_then_memcpy(
		bufferNumber,
		numberOfFrames,
		numberOfChannels,
		sampleRate,
		encodeFloat32Array(data, true), /* arm64 is LittleEndian, do not byte-swap */
		0
	);
}

export function b_alloc_then_memcpy_soundfile(
	soundFile: SoundFile,
	bufferNumber: number
): OscMessage {
	return b_alloc_then_memcpy_float32array(
		bufferNumber,
		soundFile.numberOfFrames,
		soundFile.numberOfChannels,
		soundFile.sampleRate,
		soundFile.interleavedData
	);
}

/* Fetch sound file data, and then allocate a buffer and memcpy all interleaved channel data. */
export function fetch_soundFile_to_scSynth_buffer(
	scSynth: ScSynth,
	soundFileUrl: string,
	numberOfChannels: number,
	bufferNumber: number
): void {
	fetch_soundfile(soundFileUrl)
		.then(soundFile => {
			if(soundFile.numberOfChannels === numberOfChannels) {
				scSynth.sendOsc(
					b_alloc_then_memcpy_soundfile(
						soundFile,
						bufferNumber
					)
				);
			} else {
				console.error('fetch_soundFile_to_scSynth_buffer: numberOfChannels mismatch');
			}
		});
}

/* Fetch single channels of sound file data to mono scSynth buffers.
The channel numbers are one-indexed. */
export function fetch_soundFile_channels_to_scSynth_buffers(
	scSynth: ScSynth,
	soundFileUrl: string,
	bufferNumbers: number[],
	channelIndices: number[]
): void {
	fetch_soundfile(soundFileUrl)
		.then(soundFile => {
			// console.debug('fetch_soundFile_channels_to_scSynth_buffers', soundFile);
			for(let i = 0; i < bufferNumbers.length; i++) {
				const bufferNumber = bufferNumbers[i];
				const channelIndex = channelIndices[i];
				if(channelIndex >= 1 && channelIndex <= soundFile.numberOfChannels) {
					scSynth.sendOsc(
						b_alloc_then_memcpy_float32array(
							bufferNumber,
							soundFile.numberOfFrames,
							1,
							soundFile.sampleRate,
							soundFile.channelData(channelIndex - 1)
						)
					);
				} else {
					console.error(
						'fetch_soundFile_channels_to_scSynth_buffers: index out of bounds',
						channelIndex,
						soundFile.numberOfChannels
					);
				}
			}
		});
}
