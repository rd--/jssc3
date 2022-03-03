# OverlapTexture - overlap events

_OverlapTexture(newEventFunc, sustainTime, transitionTime, overlap)_

Creates a series of overlapped sounds from a user function. The user function should return a graph of unit generators that produce a continuous sound.  OverlapTexture will apply an envelope to the sound to cross fade different invocations of the user function. OverlapTexture is a convenience class built upon Spawn.

- newEventFunc: You supply a function that returns a graph of unit generators. If it returns nil, then no event is spawned this time. This function is passed one argument, a trigger that is reset for each new event.
- sustainTime: the sustain time (in beats) of the envelope.
- transitionTime: the transition time (in beats)  of the envelope. The envelope transition is a welch envelope segment giving it a -3dB midpoint.
- overlap: number of overlapping events.

There are many examples of OverlapTexture in the examples files.

    var lfoFreq = 6;
    var lfo = LFNoise0(lfoFreq) * 1000 + 1200;
    var left = RLPF(
        OverlapTexture({
            arg tr;
            var f = TChoose(tr, [25, 30, 34, 37, 41, 42, 46, 49, 53, 54, 58, 61, 63, 66]).midiCps;
            LFPulse(f, 0, 0.2) + LFPulse(2 * f + TRand(-0.5, 0.5, tr), 0, 0.2)
        }, 4, 2, 4) * 0.02,
        lfo, // cutoff freq
        MouseX(0.2, 0.02, 1, 0.2)
    ); // filter bandwidth
    var delayTime = 2 / lfoFreq;
    var right = DelayC(left, delayTime, delayTime); // delay right channel by two beats
    [left,right]
