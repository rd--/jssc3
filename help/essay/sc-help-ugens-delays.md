# AllpassC - All pass filter

_AllpassC(in, maxdelaytime, delaytime, decaytime)_

All pass delay line. AllpassN uses no interpolation, AllpassL uses linear interpolation, AllpassC uses cubic interpolation.

- in: the input signal.
- maxdelaytime: the maximum delay time in seconds. used to initialize the delay buffer size.
- delaytime: delay time in seconds.
- decaytime: time for the echoes to decay by 60 decibels. If this time is negative then the feedback coefficient will be negative, thus emphasizing only odd harmonics at an octave lower.

Since the allpass delay has no audible effect as a resonator on steady state sound...

    AllpassC(WhiteNoise() * 0.1, 0.01, XLn(0.0001, 0.01, 20), 0.2)

...these examples add the input to the effected sound so that you can hear the effect of the phase comb:

    var z = WhiteNoise() * 0.1;
    z + AllpassC(z, 0.01, XLn(0.0001, 0.01, 20), 0.2)

The interpolation schemes result in different signals.

Used as an echo this doesn't really sound different than _Comb_, but it outputs the input signal immediately (inverted) and the echoes are lower in amplitude.

    AllpassC(Decay(Dust(1) * 0.5, 0.2) * WhiteNoise(), 0.2, 0.2, 3)

# CombC - comb filter

_CombC(in, maxdelaytime, delaytime, decaytime)_

Comb delay line. CombN uses no interpolation, CombL uses linear interpolation, CombC uses cubic interpolation.

- in: the input signal.
- maxdelaytime: the maximum delay time in seconds. used to initialize the delay buffer size.
- delaytime: delay time in seconds.
- decaytime: time for the echoes to decay by 60 decibels. If this time is negative then the feedback coefficient will be negative, thus emphasizing only odd harmonics at an octave lower.

Comb used as a resonator. The resonant fundamental is equal to reciprocal of the delay time.

     CombC(WhiteNoise() * 0.01, 0.01, XLn(0.0001, 0.01, 20), 0.2)

With negative feedback:

     CombC(WhiteNoise() * 0.01, 0.01, XLn(0.0001, 0.01, 20), -0.2)

Used as an echo:

    CombC(Decay(Dust(1) * 0.5, 0.2) * WhiteNoise(), 0.2, 0.2, 3)

# Delay1 - single sample delay

_Delay1(in)_

- in: sample to be delayed.

Original, with delayed subtracted from original:

    var z = Dust(1000);
    [z, z - Delay1(z)]

# Delay2 - two sample delay

_Delay2(in)_

- in: sample to be delayed.

Original, with delayed subtracted from original:

    var z = Dust(1000);
    [z, z - Delay2(z)]

# DelayC - delay line

_DelayC(in, maxdelaytime, delaytime)_

Simple delay line. DelayN uses no interpolation, DelayL uses linear interpolation, DelayA uses all pass interpolation.

- in: the input signal.
- maxdelaytime: the maximum delay time in seconds. used to initialize the delay buffer size.
- delaytime: delay time in seconds.

Dust randomly triggers Decay to create an exponential decay envelope for the WhiteNoise input source, input is mixed with delay:

    var z = Decay(Dust(1) * 0.5, 0.3) * WhiteNoise();
    DelayC(z, 0.2, 0.2) + z

# DelayWr, TapC

_DelayWr(buffer, in)_,
_TapC(buffer, delayTime)_

These unit generators implement delay line reading and writing in separate objects. This lets you put processing in the feedback loop, or granulate a delay line, or implement a ping pong delay or other feedback network. The Tap unit generators read from the delay line and DelayWr writes to it. You must supply an instance of Signal long enough to hold the maximum delay time you will require. You do not need to initialize the buffer.  The maximum delay time is the length of the buffer minus the block size. The minimum delay time is equal to the block size + 1.  A single delay line may have any number of Taps but only one DelayWr. The same buffer should be supplied to the DelayWr and all Tap unit generators which are part of the same delay line.

 TapN uses no interpolation, TapL uses linear interpolation, TapA uses all pass interpolation.

The output of DelayWr is just its input. The output of DelayWr is usually not needed, but it must be in the call graph of the Synth. In order to acheive this you will usually use the _mrg_ operator which returns the first argument but ignores the second. This is just a bit of prestidigitation to give the DelayWr object an order in the call graph. Otherwise, if the Synth object is unable to trace up the graph and find theDelayWr object, it will never get called and the Taps will produce either garbage or silence. The use of _mrg_ is shown below. Also see the help for _mrg_.

DelayWr arguments:

- buffer: an instance of Signal.
- in:  the input signal to write to the delay line.

Tap arguments:

- delaytime: delay time in seconds.

Simple feedback delay (if this is all you want, Comb is easier to use):

    var buffer = BufAlloc(1, 48000 * 0.3); // allocate a buffer for the delay line
    var input = Decay(Impulse(1, 0), 0.2) * PinkNoise(); // make a percussive sound as input
    var delayedSignal = TapN.ar(buffer, 1, 0.15); // tap the delay line at 0.15 second delay
    var mixedSignal = (delayedSignal * 0.4) + input; // mix the delayed signal with the input
    var writer = DelayWr.ar(buffer, mixedSignal); // write the mixed signal to the delay line
    mixedSignal.mrg(writer) // output the mixed signal

# PitchShift

_PitchShift(in, windowSize, pitchRatio, pitchDispersion, timeDispersion)_

A time domain granular pitch shifter. Grains have a triangular amplitude envelope and an overlap of 4:1.

- in: the input signal.
- windowSize: the size of the grain window in seconds. This value cannot be modulated.
- pitchRatio: the ratio of the pitch shift. Must be from 0.0 to 4.0.
- pitchDispersion: the maximum random deviation of the pitch from the pitchRatio.
- timeDispersion: a random offset of from zero to timeDispersion seconds is added to the delay of each grain. Use of some dispersion can alleviate a hard comb filter effect due to uniform grain placement. It can also be an effect in itself. timeDispersion can be no larger than windowSize.

Modulate pitch ratio:

    var z = Blip(800, 6) * 0.1;
    PitchShift(z, 0.02, Ln(0.1, 4, 20), 0, 0.0001)

Pitch shift input.  **Use headphones** to prevent feedback:

    PitchShift(
        AudioIn([1, 2]), // stereo audio input
        0.1, // grain size
        MouseX(0, 2, 0, 0.2), // mouse x controls pitch shift ratio
        0, // pitch dispersion
        0.004 // time dispersion
    )

Use PitchShift to granulate input.  **Use headphones** to prevent feedback.  Upper left corner is normal playback. x = pitch dispersion, y = time dispersion.

    var grainSize = 0.5;
    PitchShift(
       AudioIn([1, 2]),
       grainSize,
       1, // nominal pitch rate = 1
       MouseX(0, 1, 0, 0.2), // pitch dispersion
       MouseY(0, grainSize, 0, 0.2) // time dispersion
    )
