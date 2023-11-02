import { arrayFillWithIndex } from '../kernel/array.ts'
import * as audiobuffer from '../kernel/audiobuffer.ts'
import { deinterleave_sample_data } from '../kernel/float32array.ts'
import { fetch_arraybuffer_then } from '../kernel/io.ts'
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
			this.cachedChannelData = deinterleave_sample_data(
				this.numberOfFrames,
				this.numberOfChannels,
				this.interleavedData
			);
		}
		return this.cachedChannelData[index];
	}
	duration(): number {
		return this.numberOfFrames / this.sampleRate;
	}
}

export function audiobuffer_to_soundfile(url: string, audioBuffer: AudioBuffer): SoundFile {
	const soundFile = new SoundFile(
		url,
		audioBuffer.numberOfChannels,
		audioBuffer.length,
		audioBuffer.sampleRate,
		audiobuffer.audiobuffer_interleaved_channel_data(audioBuffer)
	);
	soundFile.cachedChannelData = audiobuffer.audiobuffer_channel_data_array(audioBuffer);
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
		const soundFile = wave_to_soundfile(url, wave.read_wave(arrayBuffer));
		return new Promise((resolve, reject) => resolve(soundFile));
	}
}

export function fetch_soundfile(url: string): Promise<SoundFile> {
	// console.debug('fetch_soundfile', url);
	return fetch(url)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => arraybuffer_to_soundfile(url, arrayBuffer))
}

// Load soundfile from url, decode it, and call proc on the resulting SoundFile.
export function fetch_soundfile_and_then(
	soundFileUrl: string,
	proc: (sf: SoundFile) => void
): void {
	// console.debug('fetch_soundfile_and_then', soundFileUrl);
	fetch_soundfile(soundFileUrl).then(proc);
}
