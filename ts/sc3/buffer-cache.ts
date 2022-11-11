import { isArray, asArray, arrayAtWrap, arrayFromTo } from '../kernel/array.ts'

import { fetch_soundfile_channels_to_scsynth_buffers } from './buffer.ts'
import { ScsynthWasm } from './scsynth-wasm.ts'

export type BufferDictionary = { [key: string]: string };
export type BufferCache = { [key: string]: number[] };

export const sc3_buffer: { dict: BufferDictionary, cache: BufferCache, next: number } = {
	dict: {
		'crotale-d6': 'https://rohandrape.net/pub/jssc3/flac/crotale-d6.flac',
		'harp-a4': 'https://rohandrape.net/pub/jssc3/flac/harp-a4.flac',
		'piano-c5': 'https://rohandrape.net/pub/jssc3/flac/piano-c5.flac',
		'floating_1': 'https://rohandrape.net/pub/jssc3/flac/floating_1.flac',
		'then': 'https://rohandrape.net/pub/jssc3/flac/then.flac'
	},
	cache: {},
	next: 100
};

declare global {
	var globalScsynth: ScsynthWasm;
}

// Fetch buffer index from cache, allocate and load if required.  Resolve soundFileId against dictionary.
export function SfAcquire(urlOrKey: string, numberOfChannels: number, channelSelector: number | number[]): number | number[] {
	if(globalThis.globalScsynth) {
		const channelIndices = asArray(channelSelector);
		const soundFileUrl = sc3_buffer.dict[urlOrKey] || urlOrKey;
		let cacheValue = sc3_buffer.cache[soundFileUrl];
		if(!cacheValue) {
			const bufferNumberArray = arrayFromTo(sc3_buffer.next, sc3_buffer.next + numberOfChannels - 1);
			fetch_soundfile_channels_to_scsynth_buffers(globalThis.globalScsynth, soundFileUrl, bufferNumberArray, channelIndices);
			sc3_buffer.cache[soundFileUrl] = bufferNumberArray;
			sc3_buffer.next += numberOfChannels;
			cacheValue = bufferNumberArray;
		}
		if(isArray(channelIndices)) {
			return channelIndices.map(item => arrayAtWrap(cacheValue, item - 1));
		} else {
			return [arrayAtWrap(cacheValue, channelIndices - 1)];
		}
	} else {
		return -1;
	}
}

/*

SfAcquire('piano-c5', 2, [100, 101])

*/
