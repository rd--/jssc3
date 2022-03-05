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

# Ln - line generator

_Ln(start, end, dur)_

Generates a line from the start value to the end value.

- start: starting value
- end: ending value
- dur: duration in seconds

XLn is usually better than Line for frequency:

    SinOsc(Ln(200, 17000, 10), 0) * 0.1

# XLn - exponential line generator

_XLn(start, end, dur)_

Generates an exponential curve from the start value to the end value. Both the start and end values must be non-zero and have the same sign.

- start: starting value
- end: ending value
- dur: duration in seconds

Control frequency of sine oscillator:

    SinOsc(XLn(200, 17000, 10), 0) * 0.1
