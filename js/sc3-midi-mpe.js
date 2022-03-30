'use strict';

/*

mpejs does not set noteState except for noteOff.
This means we have to track state, hence channelActive.
mpejs reallocates channels immediately, here a voice number is allocated on a longest inactive basis.

*/

var mpe;
var channelActive = [null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // channel active (0 = false, 1 = true) ; note does not indicate note on?
var whenActive = [null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // voice last active
var channelVoice = [null, null, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // map from channel->voice
var noteCounter = 0; // count note on events (for information only, not required)
var monitorCounter = 0; // count change events

function longestInactive() {
    var inactiveVoice;
    var minima = Number.MAX_SAFE_INTEGER;
    for(var voice = 2; voice <= 16; voice++) {
        if(whenActive[voice] < minima) {
            minima = whenActive[voice];
            inactiveVoice = voice;
        }
    }
    return inactiveVoice;
}

function set_event_ctl(note) {
    var channel = note.channel;
    var noteEnd = note.noteState === 0; // noteState is 0 on note end
    var noteActive = !noteEnd; // noteState is only set at note end (this seems odd)
    var noteBegin = noteActive && (channelActive[channel] === 0); // track active channels to see start of note
    channelActive[channel] = noteActive;
    if(noteBegin) {
        channelVoice[channel] = longestInactive();
        noteCounter += 1;
    }
    var voice = channelVoice[channel];
    if(noteActive) {
        whenActive[voice] = monitorCounter;
    }
    if(noteActive) {
        var fractionalNoteNumber = note.noteNumber + note.pitchBend;
        var x = fractionalNoteNumber / 127;
        var y = note.timbre;
        var useVelocityForZ = true;
        var z = useVelocityForZ ? note.noteOnVelocity : note.pressure;
        var event = { v: voice, w: 1, x: x, y: y, z: z, o: 0.5, rx: 0.5, ry: 0.5, p: x, px: 0 };
        console.debug('set_event_ctl', event, eventParamSetMessage(event));
        sendOsc(eventParamSetMessage(event));
    } else {
        sendOsc(voiceEndMessage(voice));
    }
    monitorCounter += 1;
}

function sc3_midi_mpe_init() {
    mpe = window.mpe({normalize: true, log: false});
    navigator.requestMIDIAccess().then(access => {
        access.inputs.forEach(midiInput => {
            midiInput.addEventListener(
                'midimessage',
                (event) => mpe.processMidiMessage(event.data)
            );
        });
    });
    mpe.subscribe(activeNotes => activeNotes.forEach(note => set_event_ctl(note)));
}
