import * as audioBuffer from '../kernel/audioBuffer.ts'
import * as typedArray from '../kernel/typedArray.ts'
import * as wave from './wave.ts'

export class SoundFile {
	url: string;
	numberOfChannels: number;
	numberOfFrames: number;
	sampleRate: number;
	interleavedData: Float32Array;
	cachedChannelData: Float32Array[] | null;
	constructor(
		url: string,
		numberOfChannels: number,
		numberOfFrames: number,
		sampleRate: number,
		interleavedData: Float32Array
	) {
		this.url = url;
		this.numberOfChannels = numberOfChannels;
		this.numberOfFrames = numberOfFrames;
		this.sampleRate = sampleRate;
		this.interleavedData = interleavedData;
		this.cachedChannelData = null;
	}
	channelData(index: number): Float32Array {
		if(this.cachedChannelData == null) {
			this.cachedChannelData = typedArray.deinterleaveSampleData(
				this.numberOfFrames,
				this.numberOfChannels,
				this.interleavedData,
				size => new Float32Array(size)
			);
		}
		return this.cachedChannelData[index];
	}
	duration(): number {
		return this.numberOfFrames / this.sampleRate;
	}
}

export function audiobufferToSoundFile(url: string, anAudioBuffer: AudioBuffer): SoundFile {
	const soundFile = new SoundFile(
		url,
		anAudioBuffer.numberOfChannels,
		anAudioBuffer.length,
		anAudioBuffer.sampleRate,
		audioBuffer.audioBufferInterleavedChannelData(anAudioBuffer)
	);
	soundFile.cachedChannelData = audioBuffer.audioBufferChannelDataArray(anAudioBuffer);
	return soundFile;
}

export function waveToSoundFile(wave: wave.Wave): SoundFile {
	return new SoundFile(
		wave.url,
		wave.fmtChunk.channels,
		wave.factChunk.sampleLength,
		wave.fmtChunk.samplesPerSec,
		wave.data
	);
}

export function arrayBufferToSoundFile(
	url: string,
	arrayBuffer: ArrayBuffer
): Promise<SoundFile> {
	if(window.AudioContext) {
		const audioContext = new window.AudioContext();
		return audioContext.decodeAudioData(arrayBuffer)
			.then(audioBuffer => audiobufferToSoundFile(url, audioBuffer));
	} else {
		const soundFile = waveToSoundFile(wave.waveParse(url, arrayBuffer));
		return new Promise((resolve, reject) => resolve(soundFile));
	}
}

export async function fetchSoundFile(url: string): Promise<SoundFile> {
	// console.debug('fetchSoundFile', url);
	const response = await fetch(url);
	const arrayBuffer = await response.arrayBuffer();
	return arrayBufferToSoundFile(url, arrayBuffer);
}

/*

import * as sf from './stdlib/soundFile.ts'
const url = 'https://rohandrape.net/pub/jssc3/flac/crotale-d6.wav';
const soundFile = await sf.fetchSoundFile(url)
console.log(soundFile)

*/
