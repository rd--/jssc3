# CoinGate - statistical gate

_CoinGate(prob, trig)_

When it receives a trigger, it tosses a coin, and either passes the trigger or doesn't.

- prob: value between 0 and 1 determines probability of either possibilities
- trig: input signal

Mouse controls probablity:

    var prob = MouseX(0, 1, 0, 0.2);
    var trig = CoinGate(prob, Impulse(10, 0));
    SinOsc(TRand([200, 300], [400, 900], trig), 0) * 0.1

Trigger level is preserved, mouse controls probablity over partial range:

    var prob = MouseX(0, 0.65, 0, 0.2);
    var trig = Impulse(20, 0) * (SinOsc(0.5, 0) + 1);
    { Ringz(CoinGate(prob, trig * 0.5), #[1, 1.5] * Rand(1000, 9000), 0.01) }.dup(3).sum

# ExpRand

_ExpRand(lo, hi)_

Generates a single random float value in an exponential distributions from lo to hi.

    var n = 5;
    var o = SinOsc({ ExpRand(110, 220) }.dup(n), 0) * ({ ExpRand(0.05, 0.10) }.dup(n));
    Splay2(o)

# IRand

_IRand(lo, hi)_

Generates a single random integer value in uniform distribution from lo to hi

    var scale = [0, 2, 4, 5, 7, 9, 10, 12].asLocalBuf;
    {
        var degree = IRand(0, 7);
        var octave = IRand(4, 7);
        var pitchClass = Index(scale, degree);
        var mnn = (octave * 12) + pitchClass;
        var numHarm = IRand(1, 4);
        Blip(mnn.midiCps, numHarm) * 0.1
    }.dup(7).splay2

# LinRand

_LinRand(lo, hi, minmax)_

Generates a single random float value in linear distribution from lo to hi, skewed towards lo if minmax < 0, otherwise skewed towards hi.

    var minmax = MouseX(0, 1, 0, 0.2);
    {
        var freq = LinRand(200, 10000, minmax);
        var dur =  (1 / freq) * 7500;
        FSinOsc(freq, 0) * Ln(0.2, 0, dur)
    }.dup(15).splay2

# NRand

_NRand(lo, hi, n)_

Generates a single random float value in a sum of n uniform distributions from lo to hi.

- n = 1 : uniform distribution - same as Rand
- n = 2 : triangular distribution
- n = 3 : smooth hump

As n increases, distribution converges towards gaussian.

    var n = MouseX(1, 9, 0, 0.2).rounded;
    {
        var freq = NRand(200, 10000, n);
        var dur =  (1 / freq) * 7500;
        FSinOsc(freq, 0) * Ln(0.2, 0, dur)
    }.dup(15).splay2

# Rand

_Rand(lo, hi)_

Generates a single random float value in uniform distribution from lo to hi. It generates this when the SynthDef first starts playing, and remains fixed for the duration of the synth's existence.

    {
        var freq = Rand(200, 800);
        var dur =  (1 / freq) * 7500;
        FSinOsc(freq, 0) * Ln(0.2, 0, 1)
    }.dup(5).splay2

# TExpRand - triggered exponential random number generator

_TExpRand(lo, hi, trig)_

Generates a random float value in exponential distribution from lo to hi each time the trig signal changes from nonpositive to positive values lo and hi must both have the same sign and be non-zero.

    var trig = Dust(10);
    SinOsc(TExpRand(300, 3000, trig), 0) * 0.1

Mouse controls density:

    var trig = Dust(MouseX(1, 8000, 1, 0.2));
    SinOsc(TExpRand(300, 3000, trig), 0) * 0.1

# TIRand - triggered integer random number generator

_TIRand(lo, hi, trig)_

Generates a random integer value in uniform distribution from lo to hi each time the trig signal changes from nonpositive to positive values

    var trig = Dust(10);
    SinOsc(TIRand(4, 12, trig) * 100, 0) * 0.1

Mouse controls density:

    var trig = Dust(MouseX(1, 8000, 1, 0.2));
    SinOsc(TIRand(4, 12, trig) * 100, 0) * 0.1

Random degree, octave and number of harmonics:

    var scale = [0, 2, 4, 5, 7, 9, 10, 12].asLocalBuf;
    OverlapTexture({
        arg tr;
        {
            var degree = TIRand(0, 7, tr);
            var octave = TIRand(4, 7, tr);
            var pitchClass = Index(scale, degree);
            var mnn = (octave * 12) + pitchClass;
            var numHarm = TIRand(1, 4, tr);
            Blip(mnn.midiCps, numHarm) * 0.05
        }.dup(7).splay2
    }, 4, 0.05, 2)

# TRand - triggered random number generator

_TRand(lo, hi, trig)_

Generates a random float value in uniform distribution from lo to hi each time the trig signal changes from nonpositive to positive values

    var trig = Dust(10);
    SinOsc(TRand(300, 3000, trig), 0) * 0.1

Mouse controls density:

    var trig = Dust(MouseX(1, 8000, 1, 0.2));
    SinOsc(TRand(300, 3000, trig), 0) * 0.1
