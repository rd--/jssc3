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
			this.cachedChannelData = typedArray.deinterleave_sample_data(
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

export function audiobuffer_to_soundfile(url: string, anAudioBuffer: AudioBuffer): SoundFile {
	const soundFile = new SoundFile(
		url,
		anAudioBuffer.numberOfChannels,
		anAudioBuffer.length,
		anAudioBuffer.sampleRate,
		audioBuffer.audioBuffer_interleaved_channel_data(anAudioBuffer)
	);
	soundFile.cachedChannelData = audioBuffer.audioBuffer_channel_data_array(anAudioBuffer);
	return soundFile;
}

export function wave_to_soundfile(url: string, wave: wave.Wave): SoundFile {
	return new SoundFile(
		url,
		wave.fmtChunk.channels,
		wave.factChunk.sampleLength,
		wave.fmtChunk.samplesPerSec,
		wave.data
	);
}

export function arraybuffer_to_soundfile(
	url: string,
	arrayBuffer: ArrayBuffer
): Promise<SoundFile> {
	if(window.AudioContext) {
		const audioContext = new window.AudioContext();
		return audioContext.decodeAudioData(arrayBuffer)
			.then(audioBuffer => audiobuffer_to_soundfile(url, audioBuffer));
	} else {
		const soundFile = wave_to_soundfile(url, wave.wave_read(arrayBuffer));
		return new Promise((resolve, reject) => resolve(soundFile));
	}
}

export function fetch_soundfile(url: string): Promise<SoundFile> {
	// console.debug('fetch_soundfile', url);
	return fetch(url)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => arraybuffer_to_soundfile(url, arrayBuffer))
}
