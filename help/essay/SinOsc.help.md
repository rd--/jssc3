# SinOsc - interpolating sine wavetable oscillator

_SinOsc.ar(freq, phase)_

This is the same as Osc except that the table is a sine table of 8192 entries.

- freq: frequency in Hertz
- phase: phase offset or modulator in radians

Constant frequency:

    SinOsc(200, 0) * 0.25

Modulate freq:

    SinOsc(XLn(2000, 200, 1), 0) * 0.25

Modulate freq:

    SinOsc(SinOsc(XLn(1, 1000, 9), 0) * 200 + 800, 0) * 0.25

Modulate phase:

    SinOsc(800, SinOsc(XLn(1, 1000, 9), 0) * 2 * pi) * 0.25
