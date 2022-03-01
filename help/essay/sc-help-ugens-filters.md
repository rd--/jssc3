# BPF - 2nd order Butterworth bandpass filter

_BPF(in, freq, rq)_

A second order low pass filter.

- in: input signal to be processed
- freq: cutoff frequency in Hertz.
- rq: the reciprocal of Q.  bandwidth / cutoffFreq.

Modulate frequency:

    BPF(Saw(200) * 0.5, FSinOsc(XLn(0.7, 300, 20), 0) * 3600 + 4000, 0.3)

# BPZ2 - two zero fixed midpass

_BPZ2(in)_

A special case fixed filter.  Implements the formula _out(i) = 0.5 * (in(i) - in(i-2))_

This filter cuts out 0 Hz and the Nyquist frequency.

Compare:

    WhiteNoise() * 0.1

and:

    BPZ2(WhiteNoise() * 0.1)

# BRF - 2nd order Butterworth band reject filter

_BRF(in, freq, rq)_

A second order low pass filter.

- in: input signal to be processed
- freq: cutoff frequency in Hertz.
- rq: the reciprocal of Q.  bandwidth / cutoffFreq.

Modulate frequency:

    BRF(Saw(200) * 0.1, FSinOsc(XLn(0.7, 300, 20), 0) * 3800 + 4000, 0.3)

# BRZ2 - two zero fixed midcut

_BRZ2(in)_

A special case fixed filter.  Implements the formula _out(i) = 0.5 * (in(i) + in(i-2))_.

This filter cuts out frequencies around 1/2 of the Nyquist frequency.

Compare:

    WhiteNoise() * 0.1

and:

    BRZ2(WhiteNoise() * 0.1)

# Formlet - FOF-like filter

_Formlet(in, freq, attackTime, decayTime)_

This is a resonant filter whose impulse response is like that of a sine wave with a Decay2 envelope over it.  It is possible to control the attacktime and decaytime.

Formlet is equivalent to _Ringz(in, freq, decaytime) - Ringz(in, freq, attacktime)_.

Note that if _attacktime = decaytime_ then the signal cancels out and if _attacktime > decaytime_ then the impulse response is inverted.

The great advantage to this filter over FOF is that there is no limit to the number of overlapping grains since the grain is just the impulse response of the filter.

- in: input signal to be processed
- freq: resonant frequency in Hertz
- attackTime: 60 dB attack time in seconds.
- decayTime: 60 dB decay time in seconds.

Fixed parameters:

    Formlet(Impulse(20, 0) * 0.5, 1000, 0.01, 0.1)

Fixed parameters, modulate frequency of input signal:

    Formlet(Blip(XLn(10, 400, 8), 1000) * 0.1, 1000, 0.01, 0.1)

Modulating formant frequency:

    var input = Blip(SinOsc(5, 0) * 20 + 300, 1000) * 0.1;
    Formlet(input, XLn(1500, 700, 8), 0.005, 0.04)

Mouse control of frequency and decay time:

    var input = Blip(SinOsc(5, 0) * 20 + 300, 1000) * 0.1;
	Formlet(input, MouseY(700, 2000, 1, 0.2), 0.005, MouseX(0.01, 0.2, 1, 0.2))

# FOS - first order filter section

_FOS(in, a0, a1, b1)_

A standard first order filter section. Filter coefficients are given directly rather than calculated for you.  Formula is equivalent to _out(i) = (a0 * in(i)) + (a1 * in(i-1)) + (b1 * out(i-1))_.

Same as OnePole:

    var x = MouseX(-1, 1, 0, 0.2);
    FOS(LFSaw(200, 0) * 0.1, 1 - x.abs, 0, x)

Same as OneZero:

    var x = MouseX(-1, 1, 0, 0.2);
    FOS(LFSaw(200, 0) * 0.1, 1 - x.abs, x, 0)

# HPF - 2nd order Butterworth highpass filter

_HPF(in, freq)_

A second order high pass filter.

- in: input signal to be processed
- freq: cutoff frequency.

Modulate frequency, note makeup gain:

    HPF(Saw(200) * 0.1, FSinOsc(XLn(0.7, 300, 20), 0) * 3600 + 4000) * 2

# HPZ1 - two point difference filter

_HPZ1(in)_

A special case fixed filter. Implements the formula _out(i) = 0.5 * (in(i) - in(i-1))_ which is a two point differentiator.

Compare:

    WhiteNoise() * 0.1

and:

    HPZ1(WhiteNoise() * 0.25)

# HPZ2 - two zero fixed highpass

_HPZ2(in)_

A special case fixed filter. Implements the formula _out(i) = 0.25 * (in(i) - (2*in(i-1)) + in(i-2))_.

Compare:

    WhiteNoise() * 0.1

and:

    HPZ2(WhiteNoise()) * 0.1

# RHPF - resonant high pass filter

_RHPF(in, freq, q)_

A resonant high pass filter.

- in: input signal to be processed
- freq: cutoff frequency.
- rq: the reciprocal of Q.  bandwidth / cutoffFreq.

Modulate frequency:

    RHPF(Saw(200) * 0.1, FSinOsc(XLn(0.7, 300, 20), 0) * 3600 + 4000, 0.2)

# Ringz - ringing filter

_Ringz(in, freq, decaytime)_

This is the same as Resonz, except that instead of a resonance parameter, the bandwidth is specified in a 60dB ring decay time. One Ringz is equivalent to one component of the Klank UGen.

- in: input signal to be processed
- freq: resonant frequency in Hertz
- decaytime: the 60 dB decay time of the filter

Resonant dust:

    Ringz(Dust(3) *  0.1, 2000, 2)

Resonant noise:

    Ringz(WhiteNoise() * 0.005, 2000, 0.5)

Modulate frequency:

   var freq = XLn(100, 3000, 10);
   [Ringz(WhiteNoise() * 0.005, freq, 0.5), Ringz(Impulse(6, 0) * 0.1,  freq, 0.5)]

Modulate ring time:

    Ringz(Impulse(6, 0) * 0.1,  2000, XLn(4, 0.04, 8))

Modulate ring time opposite direction:

    Ringz(Impulse(6, 0) * 0.1,  2000, XLn(0.04, 4, 8))

Parallel filters with frequency ramps:

    var exciter = WhiteNoise() * 0.001;
    { Ringz(exciter, XLn(ExpRand(100, 5000), ExpRand(100, 5000), 20), 0.5) }.dup(10).splay2

Texture of above:

    OverlapTexture({
        arg tr;
        var exciter = WhiteNoise() * 0.001;
        { Ringz(exciter, TXLine(TExpRand(100, 5000, tr), TExpRand(100, 5000, tr), 20, tr), 0.5) }.dup(10).splay2
    }, 5, 10, 3)

# RLPF - resonant low pass filter

_RLPF(in, freq, rq)_

A resonant low pass filter.

- in: input signal to be processed
- freq: cutoff frequency.
- rq: the reciprocal of Q.  bandwidth / cutoffFreq.

    RLPF(Saw(200) * 0.1, FSinOsc(XLn(0.7, 300, 20), 0) * 3600 + 4000, 0.2)

# SOS - second order filter section (biquad)

_SOS(in, a0, a1, a2, b1, b2)_

A standard second order filter section. Filter coefficients are given directly rather than calculated for you. Formula is equivalent to _out(i) = (a0 * in(i)) + (a1 * in(i-1)) + (a2 * in(i-2)) + (b1 * out(i-1)) + (b2 * out(i-2))_.

Same as TwoPole:

    var theta = MouseX(0.2 * pi, pi, 0, 0.2);
    var rho = MouseY(0.6, 0.99, 0, 0.2);
    var b1 = 2 * rho * theta.cos;
    var b2 = rho.squared.negated;
    SOS(LFSaw(200, 0) * 0.1, 1, 0, 0, b1, b2)

# TwoPole - two pole filter

_TwoPole(in, freq, radius)_

A two pole filter. This provides lower level access to setting of pole location.  For general purposes Resonz is better.

- in: input signal to be processed
- freq: frequency of pole angle.
- radius: radius of pole. Should be between 0 and +1

Fixed frequency:

    TwoPole(WhiteNoise() * 0.005, 2000, 0.95)

Modulate frequency:

    TwoPole(WhiteNoise() * 0.005, XLn(800, 8000, 8), 0.95)

# TwoZero - two zero filter

_TwoZero(in, freq, radius)_

A two zero filter.

- in: input signal to be processed
- freq: frequency of zero angle.
- radius: radius of zero.

Modulate frequency:

    TwoZero(WhiteNoise() * 0.125, XLn(20, 20000, 8), 1)
