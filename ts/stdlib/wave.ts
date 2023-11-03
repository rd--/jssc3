/*
<https://www.mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html>
*/

import * as riff from './riff.ts'

export function wave_read_chunk_sequence(byteArray: ArrayBuffer): riff.RiffChunk[] {
	const size = byteArray.byteLength;
	riff.riff_verify_header(byteArray);
	const waveText = riff.riff_read_chunk_id(byteArray, 8);
	if(waveText != 'WAVE') {
		throw new Error('Invalid Wave?');
	};
	const answer = [];
	let offset = 12;
	while(offset < size) {
		const chunk = riff.riff_read_chunk(byteArray, offset);
		answer.push(chunk);
		offset += chunk.size + 8;
	}
	return answer;
}

export type WaveFmtChunk = {
    formatTag: number, /* 1 = Pcm, 3 = Ieee Float */
	channels: number,
    samplesPerSec: number,
	bitsPerSample: number
};

export function wave_parse_fmt_chunk(fmt: riff.RiffChunk): WaveFmtChunk {
	return {
		formatTag: fmt.data.getUint16(0, true),
		channels: fmt.data.getUint16(2, true),
		samplesPerSec: fmt.data.getUint32(4, true),
		bitsPerSample: fmt.data.getUint16(14, true)
	};
}

export type WaveFactChunk = {
    sampleLength: number /* number of frames */
};

export function wave_parse_fact_chunk(fact: riff.RiffChunk): WaveFactChunk {
	return {
		sampleLength: fact.data.getUint32(0, true)
	};
}

export function wave_parse_data_float32(data: riff.RiffChunk): Float32Array {
	const numSamples = data.size / 4;
	return new Float32Array(data.data.buffer, data.data.byteOffset, numSamples);
}

export type Wave = {
	chunks: riff.RiffChunk[],
	fmtChunk: WaveFmtChunk,
	factChunk: WaveFactChunk,
	data: Float32Array
};

export function Wave(chunks: riff.RiffChunk[]): Wave {
	let fmtChunk: WaveFmtChunk | null = null, factChunk = null, data = null;
	chunks.forEach(chunk => {
		if(chunk.id == 'fmt ') {
			fmtChunk = wave_parse_fmt_chunk(chunk);
		}
		if(chunk.id == 'fact') {
			factChunk = wave_parse_fact_chunk(chunk);
		}
		if(chunk.id == 'data') {
			if(fmtChunk == null || fmtChunk.formatTag != 3) {
				throw new Error('Wave: not Float32');
			} else {
				data = wave_parse_data_float32(chunk);
			}
		}
	});
	if(fmtChunk == null || factChunk == null || data == null) {
		throw new Error('Wave: invalid Wave');
	} else {
		return {
			chunks: chunks,
			fmtChunk: fmtChunk,
			factChunk: factChunk,
			data: data
		};
	}
}

export function wave_read(byteArray: ArrayBuffer): Wave {
	return Wave(wave_read_chunk_sequence(byteArray));
}

export function wave_fetch(url: string): Promise<Wave> {
	return fetch(url)
		.then(response => response.arrayBuffer())
		.then(wave_read)
}

/*
wave_fetch('https://rohandrape.net/pub/jssc3/flac/floating_1.wav')
	.then(wave => console.log(wave))
*/
