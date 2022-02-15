'use strict';

// fetch_soundfile_to_scsynth_buffer(0, 'https://rohandrape.net/rd/j/2022-02-15/harp-a4.flac')
function fetch_soundfile_to_scsynth_buffer(bufferNumber, soundFileUrl) {
    fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, function (audioBuffer) {
        var numberOfFrames = audioBuffer.length;
        var numberOfChannels = audioBuffer.numberOfChannels;
        var sampleRate = audioBuffer.sampleRate;
        var bufferData = encodeFloat32Array(audiobuffer_interleaved_channel_data(audioBuffer));
        var oscMessage = b_alloc_then_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, bufferData);
        console.log('fetch_soundfile_to_scsynth_buffer', oscMessage);
        sendOsc(oscMessage);
    });
}
