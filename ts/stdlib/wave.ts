/*
<https://www.mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html>
*/

import * as riff from './riff.ts';

export function waveReadChunkSequence(
	byteArray: ArrayBuffer,
): riff.RiffChunk[] {
	const size = byteArray.byteLength;
	riff.riffVerifyHeader(byteArray);
	const waveText = riff.riffReadChunkId(byteArray, 8);
	if (waveText != 'WAVE') {
		throw new Error('Invalid Wave?');
	}
	const answer = [];
	let offset = 12;
	while (offset < size) {
		const chunk = riff.riffReadChunk(byteArray, offset);
		answer.push(chunk);
		offset += chunk.size + 8;
	}
	return answer;
}

export type WaveFmtChunk = {
	formatTag: number; /* 1 = Pcm, 3 = Ieee Float */
	channels: number;
	samplesPerSec: number;
	bitsPerSample: number;
};

export function waveParseFmtChunk(fmt: riff.RiffChunk): WaveFmtChunk {
	return {
		formatTag: fmt.data.getUint16(0, true),
		channels: fmt.data.getUint16(2, true),
		samplesPerSec: fmt.data.getUint32(4, true),
		bitsPerSample: fmt.data.getUint16(14, true),
	};
}

export type WaveFactChunk = {
	sampleLength: number; /* number of frames */
};

export function waveParseFactChunk(fact: riff.RiffChunk): WaveFactChunk {
	return {
		sampleLength: fact.data.getUint32(0, true),
	};
}

// This will fail if the chunk is not 4-byte aligned.
export function waveParseDataFloat32(data: riff.RiffChunk): Float32Array {
	const numSamples = data.size / 4;
	return new Float32Array(data.data.buffer, data.data.byteOffset, numSamples);
}

export type Wave = {
	url: string;
	chunks: riff.RiffChunk[];
	fmtChunk: WaveFmtChunk;
	factChunk: WaveFactChunk;
	data: Float32Array;
};

export function chunksToWave(url: string, chunks: riff.RiffChunk[]): Wave {
	let fmtChunk: WaveFmtChunk | null = null, factChunk = null, data = null;
	chunks.forEach((chunk) => {
		// console.debug('chunksToWave', chunk.id, chunk.size, chunk.data);
		if (chunk.id == 'fmt ') {
			fmtChunk = waveParseFmtChunk(chunk);
		}
		if (chunk.id == 'fact') {
			factChunk = waveParseFactChunk(chunk);
		}
		if (chunk.id == 'data') {
			if (fmtChunk == null || fmtChunk.formatTag != 3) {
				throw new Error('Wave: not Float32');
			} else {
				data = waveParseDataFloat32(chunk);
			}
		}
	});
	if (fmtChunk == null || factChunk == null || data == null) {
		throw new Error('Wave: invalid Wave');
	} else {
		return {
			url: url,
			chunks: chunks,
			fmtChunk: fmtChunk,
			factChunk: factChunk,
			data: data,
		};
	}
}

export function waveParse(url: string, byteArray: ArrayBuffer): Wave {
	return chunksToWave(url, waveReadChunkSequence(byteArray));
}

export function waveFetch(url: string): Promise<Wave> {
	return fetch(url, { cache: 'default' })
		.then((response) => response.arrayBuffer())
		.then((byteArray) => waveParse(url, byteArray));
}

/*

import * as wave from './stdlib/wave.ts'
const url = 'https://rohandrape.net/pub/jssc3/flac/crotale-d6.wav';
wave.waveFetch(url).then(wave => console.log(wave))

*/
