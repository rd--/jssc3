import { isArray, asArray, arrayAtWrap, arrayFromTo } from '../kernel/array.ts'

import { fetch_soundFile_channels_to_scSynth_buffers } from './buffer.ts'
import { ScSynth } from './scSynth.ts'

export type BufferDictionary = { [key: string]: string };
export type BufferCache = { [key: string]: number[] };

export const sc3_buffer: { dict: BufferDictionary, cache: BufferCache, next: number } = {
	dict: {
		'crotale-d6': 'https://rohandrape.net/pub/jssc3/flac/crotale-d6.wav',
		'harp-a4': 'https://rohandrape.net/pub/jssc3/flac/harp-a4.wav',
		'piano-c5': 'https://rohandrape.net/pub/jssc3/flac/piano-c5.wav',
		'floating_1': 'https://rohandrape.net/pub/jssc3/flac/floating_1.wav',
		'then': 'https://rohandrape.net/pub/jssc3/flac/then.wav'
	},
	cache: {},
	next: 100
};

// Fetch buffer index from cache, allocate and load if required.  Resolve soundFileId against dictionary.
export function SfAcquire(
	urlOrKey: string,
	numberOfChannels: number,
	channelSelector: number | number[]
): number | number[] {
	if(globalThis.globalScSynth) {
		const channelIndices = asArray(channelSelector);
		const soundFileUrl = sc3_buffer.dict[urlOrKey] || urlOrKey;
		let cacheValue = sc3_buffer.cache[soundFileUrl];
		if(!cacheValue) {
			const bufferNumberArray = arrayFromTo(sc3_buffer.next, sc3_buffer.next + numberOfChannels - 1);
			fetch_soundFile_channels_to_scSynth_buffers(
				globalThis.globalScSynth,
				soundFileUrl,
				bufferNumberArray,
				channelIndices
			);
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
