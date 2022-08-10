# AudioIn -  read audio input from ADC

_AudioIn(channel=1)_

Reads audio from the sound input hardware.

- channel: input channel number to read. Channel numbers begin at 1.

Stereo through patching from input to output:

		AudioIn([1, 2])

# BufRd - Buffer reading oscillator

Read the content of a buffer at an index.

Where PlayBuf plays through the buffer by itself, BufRd only moves its read point by the phase input and therefore has no pitch input. BufRd has variable interpolation.

_BufRd(numChannels, bufnum=0, phase=0, loop=1, interpolation=2)_

- numChannels: number of channels
- bufnum: signal buffer index
- phase: index into the buffer
- loop: 1 means true, 0 means false
- interpolation: 1 means no interpolation, 2 is linear, 4 is cubic interpolation.

Zig zag around sound:

    var sf = SfAcquire("floating_1", 1, [1]).first;
    var phase = LFNoise2(MouseX(2, 20, 1, 0.2)) * SfFrames(sf);
    BufRd(1, sf, phase, 1, 2)

Ordinary playback, phase courtesy _LFSaw_:

    var sf = SfAcquire("floating_1", 1, [1]).first;
    BufRd(1, sf, LinLin(LFSaw(SfDur(sf).reciprocal, 0), -1, 1, 0, SfFrames(sf)), 1, 2)

Ordinary playback, phase courtesy _Phasor_:

    var sf = SfAcquire("floating_1", 1, [1]).first;
    BufRd(1, sf, Phasor(0, SfRateScale(sf), 0, SfFrames(sf), 0), 1, 2)

# PlayBuf - sample playback oscillator

_PlayBuf(numChannels, bufnum=0, rate=1, trigger=1, startPos=0, loop = 0, doneAction=0)_

Plays back a memory resident sample.

- numChannels: number of channels
- bufnum: a signal buffer
- rate: playback rate, 1 is normal, 2 is one octave up, 0.5 is one octave down, -1 is backwards normal rate. Interpolation is cubic.
- trigger: A trigger causes a jump to the startPos
- startPos: sample frame to start playback
- loop: 1 means true, 0 means false
- doneAction: action to be executed when the buffer is finished playing

Normal playback at same speed of recording:

    var sf = SfAcquire("floating_1", 1, [1]).first;
    PlayBuf(1, sf, 1, 0, 0, 1, 0)

Accelerating pitch:

    var sf = SfAcquire("floating_1", 1, [1]).first;
    var rate = XLn(0.1, 100, 60);
    PlayBuf(1, sf, rate, 0, 0, 1, 0)

Sine wave control of playback rate.  Negative rate plays backwards:

    var sf = SfAcquire("floating_1", 1, [1]).first;
    var rate = SinOsc(XLn(0.2, 8, 30), 0) * 2 + 0.1;
    PlayBuf(1, sf, rate, 0, 0, 1, 0)
