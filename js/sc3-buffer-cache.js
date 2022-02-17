'use strict';

var sc3_buffer_dict = {
    'crotale-d6': 'https://rohandrape.net/pub/jssc3/flac/crotale-d6.flac',
    'harp-a4': 'https://rohandrape.net/pub/jssc3/flac/harp-a4.flac',
    'piano-c5': 'https://rohandrape.net/pub/jssc3/flac/piano-c5.flac'
};
var sc3_buffer_cache = {};
var sc3_buffer_next = 100;

// Fetch buffer index from cache, allocate and load if required.  Resolve soundFileId against dictionary.
function SoundFileBuffer(soundFileId, numberOfChannels) {
    var soundFileUrl = sc3_buffer_dict[soundFileId] || soundFileId;
    var cacheValue = sc3_buffer_cache[soundFileUrl];
    if(cacheValue) {
        if(cacheValue.numberOfChannels == numberOfChannels) {
            cacheValue.useCount += 1;
            return cacheValue.bufferNumber;
        } else {
            console.error('SoundFileBuffer: channel mismatch');
            return null;
        }
    } else {
        var bufferNumber = sc3_buffer_next;
        fetch_soundfile_to_scsynth_buffer(soundFileUrl, numberOfChannels, bufferNumber);
        sc3_buffer_cache[soundFileUrl] = { bufferNumber: bufferNumber, numberOfChannels: numberOfChannels, useCount: 1 };
        sc3_buffer_next += 1;
        return bufferNumber;
    };
}
