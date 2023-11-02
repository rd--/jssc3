// deno does not implement AudioContext>>decodeAudioData

export type ChunkHeader = {
	id: string,
	size: number
};

export function read_chunk_id(byteArray: ArrayBuffer, offset: number): string {
	const textView = new DataView(byteArray, offset, 4);
	const textDecoder = new TextDecoder('utf-8');
	return textDecoder.decode(textView);
}

export function read_chunk_size(byteArray: ArrayBuffer, offset: number): number {
	const sizeData = new DataView(byteArray, offset, 4);
	return sizeData.getUint32(0, true);
}

export function read_chunk_header(byteArray: ArrayBuffer, offset: number): ChunkHeader {
	return {
		id: read_chunk_id(byteArray, offset),
		size: read_chunk_size(byteArray, offset + 4)
	};
}

export type Chunk = {
	id: string,
	size: number,
	data: DataView,
};

export function read_chunk(byteArray: ArrayBuffer, offset: number): Chunk {
	const header = read_chunk_header(byteArray, offset);
	return {
		id: header.id,
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

export function verify_header(byteArray: ArrayBuffer): void {
	const size = byteArray.byteLength;
	const header = read_chunk_header(byteArray, 0);
	if(header.id != 'RIFF' || header.size != (size - 8)) {
		throw new Error('Invalid Riff?');
	}
}
