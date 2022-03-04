# TGrains - buffer granulator

_TGrains(numChannels, trigger, bufnum, rate, centerPos, dur, pan, amp, interp)_

Triggers generate grains from a buffer. Each grain has a Hanning envelope (_sin^2(x)_ for x from 0 to pi) and is panned between two channels of multiple outputs.

- numChannels: number of output channels.
- trigger: at each trigger, the following arguments are sampled and used as the arguments of a new grain. A trigger occurs when a signal changes from <= 0 to > 0. If the trigger is audio rate then the grains will start with sample accuracy.
- bufnum: the index of the buffer to use. It must be a one channel (mono) buffer.
- rate: 1.0 is normal, 2.0 is one octave up, 0.5 is one octave down -1.0 is backwards normal rate ... etc. Unlike PlayBuf, the rate is multiplied by BufRate, so you needn't do that yourself.
- centerPos: the position in the buffer in seconds at which the grain envelope will reach maximum amplitude.
- dur: duration of the grain in seconds.
- pan: a value from -1 to 1. Determines where to pan the output in the same manner as PanAz.
- amp: amplitude of the grain
- interp: 1,2,or 4. Determines whether the grain uses (1) no interpolation, (2) linear interpolation, or (4) cubic interpolation.

Sequences for _rate_ and _pan_ inputs, mouse control of _trigger_ rate and _pos_:

    var trate = MouseY(2, 200, 1, 0.2);
    var clk = Impulse(trate, 0);
    var buf = SfAcquire("floating_1", 1, [1]).first;
    var rate = Seq(inf, [10, 1, 1, 0.5, 0.5, 0.2, 0.1]);
    var pos = MouseX(0, BufDur(buf), 0, 0.2);
    var dur = 4 / trate;
    var pan = Seq(inf, [-1, 1]);
    TGrains(2, clk, buf, rate, pos, dur, pan, 0.25, 2)

Uniform unary rate, perturb _pos_ at clock rate

    var trate = MouseY(8, 120, 1, 0.2);
    var clk = Impulse(trate, 0);
    var buf = SfAcquire("floating_1", 1, [1]).first;
    var pos = MouseX(0,BufDur(buf), 0, 0.2) + TRand(0, 0.01, clk);
    var dur = 12 / trate;
    var pan = WhiteNoise() * 0.6;
    TGrains(2, clk, buf, 1, pos, dur, pan, 0.2, 4)

Stochastic clock (_Dust_):

    var trate = MouseY(8, 120, 1, 0.2);
    var clk = Dust(trate);
    var buf = SfAcquire("floating_1", 1, [1]).first;
    var pos = MouseX(0, BufDur(buf), 0, 0.2) + TRand(0, 0.01, clk);
    var dur = 4 / trate;
    var pan = WhiteNoise() * 0.6;
    TGrains(2, clk, buf, 1, pos, dur, pan, 0.1, 4)

Mouse control of _pos_ and _dur_:

    var trate = 12;
    var clk = Impulse(trate, 0);
    var buf = SfAcquire("floating_1", 1, [1]).first;
    var pos = MouseX(0, BufDur(buf), 0, 0.2) + TRand(0, 0.01, clk);
    var dur = MouseY(0.2, 24, 1, 0.2) / trate;
    var pan = WhiteNoise() * 0.6;
    TGrains(2, clk, buf, 1, pos, dur, pan, 0.1, 4)

Stochastic _pos_, no external control:

    var trate = 100;
    var clk = Impulse(trate, 0);
    var buf = SfAcquire("floating_1", 1, [1]).first;
    var pos = Integrator(BrownNoise().kr * 0.001, 1);
    var dur = 8 / trate;
    var pan = WhiteNoise().kr * 0.6;
    TGrains(2, clk, buf, 1, pos, dur, pan, 0.1, 4)

Stochastic _rate_:

    var trate = MouseY(1, 400, 1, 0.2);
    var clk = Impulse(trate, 0);
    var buf = SfAcquire("floating_1", 1, [1]).first;
    var rate = 2 ** (WhiteNoise().kr * 2);
    var pos = MouseX(0, BufDur(buf), 0, 0.2);
    var dur = 8 / trate;
    var pan = WhiteNoise() * 0.8;
    TGrains(2, clk, buf, rate, pos, dur, pan, 0.1, 4)

Stochastic _rate_, fixed clock rate:

    var clk = Impulse(440, 0);
    var buf = SfAcquire("floating_1", 1, [1]).first;
    var rate = 1.2 ** (WhiteNoise() * 3).roundTo(1);
    var pos = MouseX(0, BufDur(buf), 0, 0.2);
    var dur = 1.2 / MouseY(2, 120, 1, 0.2);
    var pan = WhiteNoise() * 0.6;
    TGrains(2, clk, buf, rate, pos, dur, pan, 0.1, 4)
