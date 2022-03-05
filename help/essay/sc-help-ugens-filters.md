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

# LeakDC - remove DC

_LeakDC(in, coef)_

This filter removes a DC offset from a signal.

- in: input signal.
- coef: leak coefficient.

Add DC to a pulse wave and then remove it:

    var a = LFPulse(800, 0, 0.5) * 0.5 + 0.5;
    [a * 0.1, LeakDC(a, 0.995) * 0.1]

# Limiter - peak limiter

_Limiter(input, level, lookAheadTime)_

Limits the input amplitude to the given level. Limiter will not overshoot like _Compander_ will, but it needs to look ahead in the audio. Thus there is a delay equal to twice the lookAheadTime.

Limiter, unlike Compander, is completely transparent for an in range signal.

- input: the signal to be processed.
- level: the peak output amplitude level to which to normalize the input.
- lookAheadTime: the buffer delay time. Shorter times will produce smaller delays and quicker transient response times, but may introduce amplitude modulation artifacts.

    var z = Decay2(Impulse(8, 0) * (LFSaw(0.25, 0) * -0.6 + 0.7), 0.001, 0.3) * FSinOsc(500, 0);
    [z, Limiter(z, 0.4, 0.01)] * 0.2

# LPF - 2nd order Butterworth lowpass filter

_LPF(in, freq)_

A second order low pass filter.

- in: input signal to be processed
- freq: cutoff frequency.

Modulate frequency:

    LPF(Saw(200) * 0.1, SinOsc(XLn(0.7, 300, 20), 0) * 3600 + 4000)

# LPZ1 - two point average filter

_LPZ1(in)_

A special case fixed filter. Implements the formula _out(i) = 0.5 * (in(i) + in(i-1))_ which is a two point averager.

Compare:

    WhiteNoise() * 0.1

and:

    LPZ1(WhiteNoise() * 0.1)

# LPZ2 two zero fixed lowpass

_LPZ2(in)_

A special case fixed filter. Implements the formula _out(i) = 0.25 * (in(i) + (2*in(i-1)) + in(i-2))_.

Compare:

    WhiteNoise() * 0.1

and:

    LPZ2(WhiteNoise() * 0.1)

# Median - median filter

_Median(length, in)_

Returns the median of the last length input points.  This non linear filter is good at reducing impulse noise from a signal.

- length: number of input points in which to find the median. Must be an odd number from 1 to 31. If length is 1 then Median has no effect.
- in: input signal to be processed

A signal with impulse noise.

    Saw(500) * 0.1 + (Dust2(100) * 0.9)

After applying median filter:

    var z = Saw(500) * 0.1 + (Dust2(100) * 0.9);
    Median(3, z)

The median length can be increased for longer duration noise.

A signal with longer impulse noise:

    Saw(500) * 0.1 + (LPZ1(Dust2(100) * 0.9))

Length 3 doesn't help here because the impulses are 2 samples long.

    var z = Saw(500) * 0.1 + (LPZ1(Dust2(100) * 0.9));
    Median(3, z)

Length 5 does better:

    var z = Saw(500) * 0.1 + (LPZ1(Dust2(100) * 0.9));
    Median(5, z)

Long Median filters begin chopping off the peaks of the waveform:

	var x = SinOsc(1000, 0) * 0.1;
	XFade2(x, Median(31, x), MouseX(-1, 1, 0, 0.2), 1)

Another noise reduction application:

    WhiteNoise() + SinOsc(800, 0) * 0.1

Use Median filter for high frequency noise:

    var z = WhiteNoise() + SinOsc(800, 0) * 0.1;
    Median(31, z)

Use LeakDC for low frequency noise:

    var z = WhiteNoise() + SinOsc(800, 0) * 0.1;
    LeakDC(Median(31, z), 0.9)

# Normalizer - flattens dynamics

_Normalizer(input, level, lookAheadTime)_

Normalizes the input amplitude to the given level. Normalize will not overshoot like Compander will, but it needs to look ahead in the audio. Thus there is a delay equal to twice the lookAheadTime.

- input: the signal to be processed.
- level: the peak output amplitude level to which to normalize the input.
- lookAheadTime: the buffer delay time. Shorter times will produce smaller delays and quicker transient response times, but may introduce amplitude modulation artifacts.

Example signal to process:

    var z = Decay2(Impulse(8, 0) * (LFSaw(0.25, 0) * -0.6 + 0.7), 0.001, 0.3) * FSinOsc(500, 0);
    [z, Normalizer(z, 0.4, 0.01)] * 0.2

# OnePole - one pole filter

_OnePole(in, coef)_

A one pole filter. Implements the formula _out(i) = ((1 - abs(coef)) * in(i)) + (coef * out(i-1))_.

- in: input signal to be processed
- coef: feedback coefficient. Should be between -1 and +1

Low pass:

    OnePole(WhiteNoise() * 0.2, 0.95)

High pass:

    OnePole(WhiteNoise() * 0.2, -0.95)

Modulate coeficient:

    OnePole(WhiteNoise() * 0.2, Ln(0.95, -0.95, 10))

# OneZero - one zero filter

_OneZero(in, coef)_

A one zero filter. Implements the formula _out(i) = ((1 - abs(coef)) * in(i)) + (coef * in(i-1))_.

- in: input signal to be processed
- coef: feed forward coefficient. +0.5 makes a two point averaging filter (see also LPZ1), -0.5 makes a differentiator (see also HPZ1),  +1 makes a single sample delay (see also Delay1), -1 makes an inverted single sample delay.

Low pass:

    OneZero(WhiteNoise() * 0.2, 0.5)

High pass:

    OneZero(WhiteNoise() * 0.2, -0.5)

Modulate coeficient:

    OneZero(WhiteNoise() * 0.2, Ln(-0.5, 0.5, 10))

# Resonz - resonant filter

_Resonz(in, freq, rq)_

A two pole resonant filter with zeroes at z = +/- 1. Based on K. Steiglitz,  "A Note on Constant-Gain Digital Resonators," Computer Music Journal, vol 18, no. 4, pp. 8-10, Winter 1994.

- in: input signal to be processed
- freq: resonant frequency in Hertz
- rq: bandwidth ratio (reciprocal of Q). rq = bandwidth / centerFreq

The reciprocal of Q is used rather than Q because it saves a divide operation inside the unit generator.

Fixed frequency:

    Resonz(WhiteNoise() * 0.5, 2000, 0.1)

Modulate frequency:

    Resonz(WhiteNoise() * 0.5, XLn(1000, 8000, 10), 0.05)

Modulate bandwidth:

    Resonz(WhiteNoise() * 0.5, 2000, XLn(1, 0.001, 8))

Modulate bandwidth opposite direction:

    Resonz(WhiteNoise() * 0.5, 2000, XLn(0.001, 1, 8))

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

# RingzBank - bank of resonators

_RingzBank(input, freqArray, ampArray, timeArray)_

RingzBank (_Klank_) is a bank of fixed frequency resonators which can be used to simulate the resonant modes of an object. Each mode is given a ring time, which is the time for the mode to decay by 60 dB.

- input: the excitation input to the resonant filter bank.
- frequencies: an Array of filter frequencies.
- amplitudes: an Array of filter amplitudes. If _nil_ default to 1.
- ring times: an Array of 60 dB decay times for the filters. If _nil_ default to 1.

Four resonant filters, default amplitudes and decay times:

    RingzBank(Impulse(2, 0) * 0.1, [800, 1071, 1153, 1723], nil, nil)

With dust input:

    RingzBank(Dust(8) * 0.1, [800, 1071, 1153, 1723], nil, nil)

With noise input:

    RingzBank(PinkNoise() * 0.007, [800, 1071, 1153, 1723], nil, nil)

With stereo input:

    RingzBank({ PinkNoise() }.dup(2) * 0.005, [200, 671, 1153, 1723], nil, nil)

With random frequencies input:

    RingzBank(Decay(Impulse(4, 0), 0.03) * ClipNoise() * 0.005, { Rand(800, 4000) }.dup(12), nil, { Rand(0.1, 2) }.dup(12))

Texture of variation of above:

    OverlapTexture({
        arg tr;
        var z = Decay(Impulse(4, 0), TRand(0.03, 0.09, tr)) * ClipNoise() * 0.0025;
        var r = RingzBank(z, { TRand(800, 4000, tr) }.dup(12), nil, { TRand(0.1, 2, tr) }.dup(12));
        Pan2(r, TRand(-1, 1, tr), 1)
    }, 8, 3, 4)

# RLPF - resonant low pass filter

_RLPF(in, freq, rq)_

A resonant low pass filter.

- in: input signal to be processed
- freq: cutoff frequency.
- rq: the reciprocal of Q.  bandwidth / cutoffFreq.

Modulate frequency:

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
