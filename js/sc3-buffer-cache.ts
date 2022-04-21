// sc3-buffer-cache.ts

import { arrayAsArray, arrayAtWrap, arrayFromTo } from './sc3-array.js'
import { fetch_soundfile_channels_to_scsynth_buffers } from './sc3-buffer.js'

export type BufferDictionary = { [key: string]: string };

export var sc3_buffer_dict: BufferDictionary = {
    'crotale-d6': 'https://rohandrape.net/pub/jssc3/flac/crotale-d6.flac',
    'harp-a4': 'https://rohandrape.net/pub/jssc3/flac/harp-a4.flac',
    'piano-c5': 'https://rohandrape.net/pub/jssc3/flac/piano-c5.flac',
    'floating_1': 'https://rohandrape.net/pub/jssc3/flac/floating_1.flac',
    'then': 'https://rohandrape.net/pub/jssc3/flac/then.flac'
};

export type BufferCache = { [key: string]: number[] };

export var sc3_buffer_cache: BufferCache = {};

export var sc3_buffer_next: number = 100;

// Fetch buffer index from cache, allocate and load if required.  Resolve soundFileId against dictionary.
export function SfAcquire(urlOrKey: string, numberOfChannels: number, channelSelector: number | number[]): number | number[] {
    var channelIndices = arrayAsArray(channelSelector);
    var soundFileUrl = sc3_buffer_dict[urlOrKey] || urlOrKey;
    var cacheValue = sc3_buffer_cache[soundFileUrl];
    if(!cacheValue) {
        var bufferNumberArray = arrayFromTo(sc3_buffer_next, sc3_buffer_next + numberOfChannels - 1);
        fetch_soundfile_channels_to_scsynth_buffers(soundFileUrl, bufferNumberArray, channelIndices);
        sc3_buffer_cache[soundFileUrl] = bufferNumberArray;
        sc3_buffer_next += numberOfChannels;
        cacheValue = bufferNumberArray;
    }
    if(Array.isArray(channelIndices)) {
        return channelIndices.map(item => arrayAtWrap(cacheValue, item - 1));
    } else {
        return [arrayAtWrap(cacheValue, channelIndices - 1)];
    }
}

/*

SfAcquire('piano-c5', 2, [100, 101])

*/
