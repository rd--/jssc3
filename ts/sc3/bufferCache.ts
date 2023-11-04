import { isArray, asArray, arrayAtWrap, arrayFromTo } from '../kernel/array.ts'

import { fetchSoundFileChannelsToScSynthBuffers } from './buffer.ts'
import { ScSynth } from './scSynth.ts'

export type BufferDictionary = { [key: string]: string };
export type BufferCache = { [key: string]: number[] };

export const sc3Buffer: { dict: BufferDictionary, cache: BufferCache, next: number } = {
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
		const soundFileUrl = sc3Buffer.dict[urlOrKey] || urlOrKey;
		let cacheValue = sc3Buffer.cache[soundFileUrl];
		if(!cacheValue) {
			const bufferNumberArray = arrayFromTo(sc3Buffer.next, sc3Buffer.next + numberOfChannels - 1);
			fetchSoundFileChannelsToScSynthBuffers(
				globalThis.globalScSynth,
				soundFileUrl,
				bufferNumberArray,
				channelIndices
			);
			sc3Buffer.cache[soundFileUrl] = bufferNumberArray;
			sc3Buffer.next += numberOfChannels;
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

import * as scTcp from './sc3/scSynthTcp.ts'
const scSynth = await scTcp.ScSynthTcp(scTcp.defaultScSynthAddress);

globalThis.globalScSynth = scSynth;

import * as bc from './sc3/bufferCache.ts'
const b0 = bc.SfAcquire('piano-c5', 2, [1, 2]);
const b1 = bc.SfAcquire('crotale-d6', 1, [1]);

*/
