'use strict';

var sc3_buffer_dict = {
    'crotale-d6': 'https://rohandrape.net/pub/jssc3/flac/crotale-d6.flac',
    'harp-a4': 'https://rohandrape.net/pub/jssc3/flac/harp-a4.flac',
    'piano-c5': 'https://rohandrape.net/pub/jssc3/flac/piano-c5.flac',
    'floating_1': 'https://rohandrape.net/pub/jssc3/flac/floating_1.flac',
    'then': 'https://rohandrape.net/pub/jssc3/flac/then.flac'
};
var sc3_buffer_cache = {};
var sc3_buffer_next = 100;

// Fetch buffer index from cache, allocate and load if required.  Resolve soundFileId against dictionary.
function SfAcquire(urlOrKey, numberOfChannels, channelIndices) {
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
        return arrayAtWrap(cacheValue, channelIndices - 1);
    }
}

/*

SfAcquire('piano-c5', 2, [100, 101])

*/
