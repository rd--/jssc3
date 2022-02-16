'use strict';

var sc3_buffer_dict = { 'harp-a4': 'https://rohandrape.net/pub/jssc3/flac/harp-a4.flac' };
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
        return bufferNumber;
    };
}
