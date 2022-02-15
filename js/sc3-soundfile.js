'use strict';

// Return the header fields of an audioBuffer.
function audiobuffer_header(audioBuffer) {
    return copy_keys_from_object(audioBuffer, ['length', 'duration', 'sampleRate', 'numberOfChannels']);
}

// Number of frames (length) multiplied by the number of channels.
function audiobuffer_number_of_samples(audioBuffer) {
    return audioBuffer.length * audioBuffer.numberOfChannels;
}

// Interleave data from channelsArray into outputArray.
function interleave_sample_data(numberOfFrames, numberOfChannels, channelsArray, outputArray) {
    for(var i = 0; i < numberOfFrames; i++) {
        for(var j = 0; j < numberOfChannels; j++) {
            outputArray[i * numberOfChannels + j] = channelsArray[j][i];
        }
    }
}

// Get all audio data as an interleaved Float32Array.
function audiobuffer_interleaved_channel_data(audioBuffer) {
    if(audioBuffer.numberOfChannels == 1) {
        return audioBuffer.getChannelData(0);
    } else {
        var channelsArray = arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
        var outputArray = new Float32Array(audioBuffer.length * audioBuffer.numberOfChannels);
        interleave_sample_data(audioBuffer.length, audioBuffer.numberOfChannels, channelsArray, outputArray);
        return outputArray;
    }
}

// Get the sample rate of the audio context
function system_samplerate() {
    var audioContext = new window.AudioContext();
    console.log('audioContext.sampleRate', audioContext.sampleRate);
    return audioContext.sampleRate;
}

// Load soundfile from url, decode it, and call proc on the resulting AudioBuffer.
function fetch_soundfile_to_audiobuffer_and_then(soundFileUrl, proc) {
    var audioContext = new window.AudioContext();
    load_arraybuffer_and_then(soundFileUrl, function(arrayBuffer) {
        audioContext.decodeAudioData(arrayBuffer).then(proc);
    });
};
