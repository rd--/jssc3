import { OscMessage } from '../stdlib/openSoundControl.ts'
import { fetchSoundFile, SoundFile } from '../stdlib/soundFile.ts'

import { ScSynth } from './scSynth.ts'
import { b_allocMemcpyFloat32Array } from './serverCommand.ts'

export function b_allocMemcpySoundFile(
	soundFile: SoundFile,
	bufferNumber: number
): OscMessage {
	return b_allocMemcpyFloat32Array(
		bufferNumber,
		soundFile.numberOfFrames,
		soundFile.numberOfChannels,
		soundFile.sampleRate,
		soundFile.interleavedData
	);
}

/* Fetch sound file data, and then allocate a buffer and memcpy all interleaved channel data. */
export async function fetchSoundFileToScSynthBuffer(
	scSynth: ScSynth,
	soundFileUrl: string,
	numberOfChannels: number,
	bufferNumber: number
): Promise<void> {
	const soundFile = await fetchSoundFile(soundFileUrl);
	if(soundFile.numberOfChannels === numberOfChannels) {
		scSynth.sendOsc(
			b_allocMemcpySoundFile(
				soundFile,
				bufferNumber
			)
		);
	} else {
		console.error('fetchSoundFileToScSynthBuffer: numberOfChannels mismatch');
	}
}

/* Fetch single channels of sound file data to mono scSynth buffers.
The channel numbers are one-indexed. */
export async function fetchSoundFileChannelsToScSynthBuffers(
	scSynth: ScSynth,
	soundFileUrl: string,
	bufferNumbers: number[],
	channelIndices: number[]
): Promise<void> {
	const soundFile = await fetchSoundFile(soundFileUrl);
	// console.debug('fetchSoundFileChannelsToScSynthBuffers', soundFile);
	for(let i = 0; i < bufferNumbers.length; i++) {
		const bufferNumber = bufferNumbers[i];
		const channelIndex = channelIndices[i];
		if(channelIndex >= 1 && channelIndex <= soundFile.numberOfChannels) {
			scSynth.sendOsc(
				b_allocMemcpyFloat32Array(
					bufferNumber,
					soundFile.numberOfFrames,
					1,
					soundFile.sampleRate,
					soundFile.channelData(channelIndex - 1)
				)
			);
		} else {
			console.error(
				'fetchSoundFileChannelsToScSynthBuffers: index out of bounds',
				channelIndex,
				soundFile.numberOfChannels
			);
		}
	}
}

/*

import * as sc from './sc3.ts'
import * as scTcp from './sc3/scSynthTcp.ts'
const addr = scTcp.tcpAddress('192.168.1.53', 57110);
const scSynth = await scTcp.ScSynthTcp(addr);

const msg = sc.b_allocMemcpyFloat32Array(200, 10, 1, 1000, new Float32Array([1,3,5,7,9,0,2,4,6,8]));
scSynth.sendOsc(msg)

const url = 'https://rohandrape.net/pub/jssc3/flac/floating_1.wav';
sc.fetchSoundFileToScSynthBuffer(scSynth, url, 1, 100);

const url = 'https://rohandrape.net/pub/jssc3/flac/floating_1.wav';
sc.fetchSoundFileChannelsToScSynthBuffers(scSynth, url, [100], [1]);

*/
