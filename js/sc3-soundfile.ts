// requires: sc3-array, sc3-dictionary

// Return the header fields of an audioBuffer.  length is the number of frames.
function audiobuffer_header(audioBuffer: AudioBuffer): Dictionary {
    var keysArray = ['length', 'duration', 'sampleRate', 'numberOfChannels'];
    return dictionaryCopyKeys(audioBuffer, keysArray);
}

// Number of frames multiplied by the number of channels.
function audiobuffer_number_of_samples(audioBuffer: AudioBuffer): number {
    return audioBuffer.length * audioBuffer.numberOfChannels;
}

// Get all audio data as an array of Float32Array.
function audiobuffer_channel_data_array(audioBuffer: AudioBuffer): Float32Array[] {
    return arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
}

// Interleave data from channelsArray into outputArray.
function interleave_sample_data(numberOfFrames: number, numberOfChannels: number, channelsArray: Float32Array[], outputArray: Float32Array): void {
    for(var i = 0; i < numberOfFrames; i++) {
        for(var j = 0; j < numberOfChannels; j++) {
            outputArray[i * numberOfChannels + j] = channelsArray[j][i];
        }
    }
}

// Get all audio data as an interleaved Float32Array.
function audiobuffer_interleaved_channel_data(audioBuffer: AudioBuffer): Float32Array {
    if(audioBuffer.numberOfChannels === 1) {
        return audioBuffer.getChannelData(0);
    } else {
        var channelsArray = arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
        var outputArray = new Float32Array(audioBuffer.length * audioBuffer.numberOfChannels);
        interleave_sample_data(audioBuffer.length, audioBuffer.numberOfChannels, channelsArray, outputArray);
        return outputArray;
    }
}

function audiobuffer_maximum_absolute_value_and_frame_number_of(audioBuffer: AudioBuffer): number[] {
    var channelsArray = arrayIota(audioBuffer.numberOfChannels).map(i => audioBuffer.getChannelData(i));
    var maximumValue = 0;
    var frameNumber = 0;
    for(var i = 0; i < audioBuffer.length; i++) {
        for(var j = 0; j < audioBuffer.numberOfChannels; j++) {
            var nextValue = Math.abs(channelsArray[j][i]);
            if (nextValue > maximumValue) {
                maximumValue = nextValue;
                frameNumber = i;
            }
        }
    }
    return [maximumValue, frameNumber];
}

// Get the sample rate of the audio context
function system_samplerate(): number {
    var audioContext = new window.AudioContext();
    console.log('audioContext.sampleRate', audioContext.sampleRate);
    return audioContext.sampleRate;
}

// Load soundfile from url, decode it, and call proc on the resulting AudioBuffer.
function fetch_soundfile_to_audiobuffer_and_then(soundFileUrl: string, proc: (x: AudioBuffer) => void): void {
    var audioContext = new window.AudioContext();
    load_arraybuffer_and_then(soundFileUrl, function(arrayBuffer) {
        audioContext.decodeAudioData(arrayBuffer).then(proc);
    });
}
