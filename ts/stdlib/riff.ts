// deno does not implement AudioContext>>decodeAudioData

export type ChunkHeader = {
	name: string,
	size: number
};

function get_chunk_name(byteArray: ArrayBuffer, offset: number): string {
	const textView = new DataView(byteArray, offset, 4);
	const textDecoder = new TextDecoder('utf-8');
	return textDecoder.decode(textView);
}

function get_chunk_size(byteArray: ArrayBuffer, offset: number): number {
	const sizeData = new DataView(byteArray, offset, 4);
	return sizeData.getUint32(0, true);
}

export function read_chunk_header(byteArray: ArrayBuffer, offset: number): ChunkHeader {
	return {
		name: get_chunk_name(byteArray, offset),
		size: get_chunk_size(byteArray, offset + 4)
	};
}

export type Chunk = {
	name: string,
	size: number,
	data: DataView,
};

export function read_chunk(byteArray: ArrayBuffer, offset: number): Chunk {
	const header = read_chunk_header(byteArray, offset);
	return {
		name: header.name,
		size: header.size,
		data: new DataView(byteArray, offset + 8, header.size)
	};
}

export function read_chunk_sequence(byteArray: ArrayBuffer): Chunk[] {
	let offset = 0;
	const size = byteArray.byteLength;
	const answer = [];
	while(offset < size) {
		const waveData = new DataView(byteArray, offset, 4);
		const chunk = read_chunk(byteArray, offset);
		answer.push(chunk);
		offset += chunk.size + 8;
	}
	return answer;
}

export function read_wave_chunk_sequence(byteArray: ArrayBuffer): Chunk[] {
	const size = byteArray.byteLength;
	const header = read_chunk_header(byteArray, 0);
	if(header.name != 'RIFF' || header.size != (size - 8)) {
		throw new Error('Invalid Riff?');
	};
	const waveText = get_chunk_name(byteArray, 8);
	if(waveText != 'WAVE') {
		throw new Error('Invalid Riff?');
	};
	const answer = [];
	let offset = 12;
	while(offset < size) {
		const chunk = read_chunk(byteArray, offset);
		answer.push(chunk);
		offset += chunk.size + 8;
	}
	return answer;
}

export type FmtChunk = {
    audioFormat: number,
	numChannels: number,
    sampleRate: number
};

export function parse_wave_fmt_chunk(fmt: Chunk) {
	return {
		audioFormat: fmt.data.getUint16(0, true),
		numChannels: fmt.data.getUint16(2, true),
		sampleRate: fmt.data.getUint32(4, true)
	};
}

export type FactChunk = {
    numFrames: number
};

export function parse_wave_fact_chunk(fact: Chunk) {
	return {
		numFrames: fact.data.getUint32(0, true)
	};
}

export function parse_float32_data(data: Chunk): Float32Array {
	const numSamples = data.size / 4;
	return new Float32Array(data.data.buffer, 4, numSamples);
}

export function fetch_wave_chunk_sequence(url: string): Promise<Chunk[]> {
	return fetch(url)
		.then(response => response.arrayBuffer())
		.then(read_wave_chunk_sequence);
}

fetch_wave_chunk_sequence('https://rohandrape.net/pub/jssc3/flac/floating_1.wav')
	.then(chunks => chunks.forEach(chunk => {
		console.log(chunk.name, chunk.size);
		if(chunk.name == 'fmt ') {
			console.log(parse_wave_fmt_chunk(chunk));
		}
		if(chunk.name == 'fact') {
			console.log(parse_wave_fact_chunk(chunk));
		}
		if(chunk.name == 'data') {
			console.log(parse_float32_data(chunk));
		}
	}));
