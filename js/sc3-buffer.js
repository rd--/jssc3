'use strict';

function audiobuffer_to_scsynth_buffer(audioBuffer, bufferNumber, numberOfChannels, bufferData) {
    var numberOfFrames = audioBuffer.length;
    var sampleRate = audioBuffer.sampleRate;
    var oscMessage = b_alloc_then_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, encodeFloat32Array(bufferData));
    console.log('audiobuffer_to_scsynth_buffer', oscMessage);
    sendOsc(oscMessage);
}

// Fetch sound file data, and then allocate a buffer and memcpy all channel data.
function fetch_soundfile_to_scsynth_buffer(soundFileUrl, numberOfChannels, bufferNumber) {
    fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
        if(audioBuffer.numberOfChannels == numberOfChannels) {
            audiobuffer_to_scsynth_buffer(
                audioBuffer,
                bufferNumber,
                numberOfChannels,
                audiobuffer_interleaved_channel_data(audioBuffer)
            );
        } else {
            console.error('fetch_soundfile_to_scsynth_buffer: numberOfChannels mismatch');
        };
    });
}

// Fetch single channel of sound file data.  The channel number is one-indexed.
function fetch_soundfile_channels_to_scsynth_buffer(soundFileUrl, bufferNumbers, channelIndices) {
    fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
        for(var i = 0; i < bufferNumbers.length; i++) {
            var bufferNumber = bufferNumbers[i];
            var channelIndex = channelIndices[i];
            if(channelIndex >= 1 && channelIndex <= audioBuffer.numberOfChannels) {
                audiobuffer_to_scsynth_buffer(audioBuffer, bufferNumber, 1, audioBuffer.getChannelData(channelIndex - 1));
            } else {
                console.error('fetch_soundfile_channel_to_scsynth_buffer: channelIndex out of bounds', channelIndex, audioBuffer.numberOfChannels);
            };
        };
    });
}
