// deno does not implement AudioContext>>decodeAudioData

export type RiffChunkHeader = {
	id: string,
	size: number
};

export function riffReadChunkId(byteArray: ArrayBuffer, offset: number): string {
	const textView = new DataView(byteArray, offset, 4);
	const textDecoder = new TextDecoder('utf-8');
	return textDecoder.decode(textView);
}

export function riffReadChunkSize(byteArray: ArrayBuffer, offset: number): number {
	const sizeData = new DataView(byteArray, offset, 4);
	return sizeData.getUint32(0, true);
}

export function riffReadChunkHeader(byteArray: ArrayBuffer, offset: number): RiffChunkHeader {
	return {
		id: riffReadChunkId(byteArray, offset),
		size: riffReadChunkSize(byteArray, offset + 4)
	};
}

export type RiffChunk = {
	id: string,
	size: number,
	data: DataView,
};

export function riffReadChunk(byteArray: ArrayBuffer, offset: number): RiffChunk {
	const header = riffReadChunkHeader(byteArray, offset);
	return {
		id: header.id,
		size: header.size,
		data: new DataView(byteArray, offset + 8, header.size)
	};
}

export function riffReadChunkSequence(byteArray: ArrayBuffer): RiffChunk[] {
	let offset = 0;
	const size = byteArray.byteLength;
	const answer = [];
	while(offset < size) {
		const waveData = new DataView(byteArray, offset, 4);
		const chunk = riffReadChunk(byteArray, offset);
		answer.push(chunk);
		offset += chunk.size + 8;
	}
	return answer;
}

export function riffVerifyHeader(byteArray: ArrayBuffer): void {
	const size = byteArray.byteLength;
	const header = riffReadChunkHeader(byteArray, 0);
	if(header.id != 'RIFF' || header.size != (size - 8)) {
		throw new Error('Invalid Riff?');
	}
}
