# Cutoff - very simple envelope shape

_Cutoff(sustain, decay, curve)_

Apply a cutoff envelope to a continuous sound.

- sustain: sustain portion of the envelope.
- decay: decay portion of the envelope.
- curve: shape of envelope segment.

Cutoff sine oscillator after four seconds with one second release time:

    Cutoff(4, 1, -4) * SinOsc(220, 0) * 0.1

# Decay - exponential decay

_Decay(in, decayTime)_

This is essentially the same as _Integrator_ except that instead of supplying the coefficient directly, it is caculated from a 60 dB decay time. This is the time required for the integrator to lose 99.9 % of its value or -60dB. This is useful for exponential decaying envelopes triggered by impulses.

- in: input signal
- decayTime: 60 dB decay time in seconds.

Decay time of one centisecond:

    Decay(Impulse(1, 0) * 0.25, 0.01)

Used as an envelope:

    Decay(Impulse(XLn(1, 50, 20), 0) * 0.25, 0.2) * PinkNoise()

# Decay2 - exponential decay

_Decay2(in, attackTime, decayTime)_

_Decay_ has a very sharp attack and can produce clicks. _Decay2_ rounds off the attack by subtracting one Decay from another. _Decay2(in, attackTime, decayTime)_ is equivalent to _Decay(in, decayTime) - Decay(in, attackTime)_.

- in: input signal
- attackTime: 60 dB attack time in seconds.
- decayTime: 60 dB decay time in seconds.

One millisecond attack, one centisecond decay:

    Decay2(Impulse(1, 0), 0.001, 0.01)

Since attack and decay are a difference of two Decays, if you swap the values, then the envelope turns upside down:

    Decay2(Impulse(1, 0), 0.01, 0.001)

Used as an envelope:

    Decay2(Impulse(XLn(1, 50, 20), 0) * 0.25, 0.01, 0.2) * FSinOsc(600, 0)

Compare the above with Decay used as the envelope:

    Decay(Impulse(XLn(1, 50, 20), 0) * 0.25, 0.2) * FSinOsc(600, 0)

# DegreeToKey- convert signal to modal pitch

_DegreeToKey(table, in, octave)_

The input signal value is truncated to an integer value and used as an index into an octave repeating table of note values. Indices wrap around the table and shift octaves as they do.

- table: an instance of FloatArray or Signal which contains the steps for each scale degree.
- in: the input signal.
- octave: the number of steps per octave in the scale. The default is 12.

Modal space, mouse x controls discrete pitch in dorian mode:

    var b = #[0, 2, 3.2, 5, 7, 9, 10].asLocalBuf;
    var k = DegreeToKey(b, MouseX(0, 15, 0, 0.1), 12);
    var c = {
        arg n, r;
        var o = SinOsc((r + k + (n * 0.04)).midiCps, 0) * 0.1;
        var t = LFPulse(#[48, 55].midiCps, 0, 0.15);
        var f = (SinOsc(0.1, 0) * 10 + r).midiCps;
        var d = RLPF(t, f, 0.1) * 0.1;
        var m = o + d;
        CombN(m, 0.31, 0.31, 2) + m
    };
    var n = LFNoise1([3, 3]);
    (c.value(n, 48) + c.value(n, 72)) * 0.25

# GetTempo - continuous tempo

_GetTempo()_

Gives the current tempo as a control rate signal.  Tempo is always in beats per second.

    SetTempo(MouseX(0.25, 4, 1, 0.2))

Use the tempo to modulate an oscillator:

    SinOsc(400 * GetTempo(), 0, 0.2);

# Impulse - impulse oscillator

_Impulse(freq, phase)_

Outputs non band limited single sample impulses.

- freq: frequency in Hertz
- phase: initial phase

Constant frequency:

    Impulse(800, 0) * 0.2

Modulate frequency:

    Impulse(XLn(800, 100, 5), 0) * 0.2

# Index - index into a table with a signal

_Index(table, in)_

The input signal value is truncated to an integer value and used as an index into the table.  Out of range index values are clipped to the valid range.

- table: an instance of FloatArray or Signal.
- in: the input signal.

Index buffer for frequency values:

    var b = [50, 100, 200, 400, 800, 1600].asLocalBuf;
    var f = Index(b, LinLin(LFSaw(2, 0), -1, 1, 0, 6));
    SinOsc([f, f * 9], 0) * 0.1

# Integrator - leaky integrator

_Integrator(in, leak)_

Integrates an input signal with a leak. The formula implemented is: _out(0) = in(0) + (leak * out(-1))_

- in: input signal
- leak: leak coefficient.

As filter:

    Integrator(LFPulse(300, 0, 0.2) * 0.1, 0.9)

Used as an envelope:

    Integrator(LFPulse(3, 0, 0.2) * 0.0004, 0.999) * FSinOsc(700, 0)

# K2A - control rate to audio rate converter

_K2A(in)_

Control rate signals are not legal outputs. If you want to output a control signal you need to convert it to audio rate. K2A converts via linear interpolation.

- in: input signal

Control rate white noise interpolated to audio rate.

    K2A(WhiteNoise().kr * 0.2)

# Lag - exponential lag

_Lag(in, lagTime)_

This is essentially the same as OnePole except that instead of supplying the coefficient directly, it is caculated from a 60 dB lag time. This is the time required for the filter to converge to within 0.01 % of a value. This is useful for smoothing out control signals.

- in: input signal
- lagTime: 60 dB lag time in seconds.

As filter:

    var x = LFPulse(300, 0, 0.5) * 0.1;
    [x, Lag(x, 0.002)]

Used to lag pitch:

    SinOsc( // sine wave
      Lag( // lag the modulator
        LFPulse(4, 0, 0.5) * 50 + 400, // frequency modulator
        Ln(0, 1, 15) // modulate lag time
      ),
    0) // phase
    * 0.3 // sine amplitude

# Latch - sample and hold

_Latch(in, trig)_

Holds input signal value when triggered.

- in: input signal.
- trig: trigger. Trigger can be any signal. A trigger happens when the signal changes from non-positive to positive.

Step noise:

    Latch(WhiteNoise(), Impulse(900, 0)) * 0.1

Step noise as frequency input:

    Blip(Latch(WhiteNoise(), Impulse(9, 0)) * 400 + 500, 4) * 0.1

The above are just meant as examples. LFNoise0 is a faster way to generate random steps:

    Blip(LFNoise0(9) * 400 + 500, 4) * 0.1

# LFPulse - pulse oscillator

_LFPulse(freq, phase, width)_

A non-band-limited pulse oscillator. Outputs a high value of one and a low value of zero.

- freq: frequency in Hertz
- width: pulse width duty cycle from zero to one.

Fixed frequency:

    LFPulse(500, 0, 0.3) * 0.1

Used as both Oscillator and LFO:

    LFPulse(LFPulse(3, 0, 0.3) * 200 + 200, 0, 0.2) * 0.1

# LFSaw - sawtooth oscillator

_LFSaw(freq, phase)_

A non-band-limited sawtooth oscillator. Output ranges from -1 to +1.

- freq: frequency in Hertz

Fixed frequency:

    LFSaw(500, 0) * 0.1

Used as both Oscillator and LFO:

    LFSaw(LFSaw(4, 0) * 400 + 400, 0) * 0.1

# LFTri - triangle wave oscillator

_LFTri(freq, phase)_

A non-band-limited triangle wave oscillator. Output ranges from -1 to +1.

- freq: frequency in Hertz

Used as both Oscillator and LFO:

    LFTri(LFTri(1, 0) * 400 + 400, 0) * 0.1

# Ln - line generator

_Ln(start, end, dur)_

Generates a line from the start value to the end value.

- start: starting value
- end: ending value
- dur: duration in seconds

XLn is usually better than Line for frequency:

    SinOsc(Ln(200, 17000, 10), 0) * 0.1

# LinExp - convert a linear range to an exponential range

_LinExp(in, srclo, srchi, dstlo, dsthi)_

Converts a linear range of values to an exponential range of values.  The dstlo and dsthi arguments must be nonzero and have the same sign.

- in: input to convert.
- srclo: lower limit of input range.
- srchi: upper limit of input range.
- dstlo: lower limit of output range.
- dsthi: upper limit of output range.

Convert -1 to +1 sawtooth into 0.01 to 1.0 exponential:

    var s = LFSaw(500, 0);
    [s * 0.1, LinExp(s, -1, 1, 0.001, 0.1)]

Convert oscillator output to frequency input:

    var mod = SinOsc(Line(1, 10, 10, 0), 0);
    [SinOsc(mod * 400 + 500, 0), SinOsc(LinExp(mod, -1, 1, 100, 900), 0)] * 0.1

# Osc1 - one-shot oscillator

_Osc1(table, dur)_

An oscillator that reads through a table only once.

- table: an instance of Signal; its size must be a power of 2.
- dur: how long  to read through the table

Pitch class table, linear interpolation, first slowly, then quickly, then slowly again:

    var tbl = [0, 2, 10, 12].asLocalBuf;
    SinOsc((Osc1(tbl, 5) + 48).midiCps, 0) * 0.1

# Slew - slew rate limiter

_Slew(in, upSlope, downSlope)_

Limits the slope of an input signal. The slope is expressed in units per second.

- in: input signal.
- upSlope: maximum upward slope.
- downSlope: maximum downward slope.

Slew square wave:

    var z = LFPulse(800, 0, 0.5) * 0.1;
    [z, Slew(z, 4000, 4000)]

# WrapIndex - index into a table with a signal

_WrapIndex(table, in)_

The input signal value is truncated to an integer value and used as an index into the table.  Out of range index values are wrapped cyclically to the valid range.

- table: an instance of FloatArray or Signal.
- in: the input signal.

Indexing into a table:

    var buf = [200, 300, 400, 500, 600, 800].asLocalBuf;
    SinOsc(WrapIndex(buf, MouseX(0, 6 * 3, 0, 0.1)), 0) * 0.1

# XLn - exponential line generator

_XLn(start, end, dur)_

Generates an exponential curve from the start value to the end value. Both the start and end values must be non-zero and have the same sign.

- start: starting value
- end: ending value
- dur: duration in seconds

Control frequency of sine oscillator:

    SinOsc(XLn(200, 17000, 10), 0) * 0.1
