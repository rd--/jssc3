# Other Topics

## LFPulse vs. Pulse and LFSaw vs. Saw

In different situations you will want to use different versions of these unit generators. The _LF_ versions are faster but are not band limited.  That means that they can fold over the Nyquist frequency and cause aliased frequencies. For example here is the same frequency sweep using both kinds of oscillators:

_LFPulse_ will alias at high frequencies.

	LFPulse(XLn(1000, 8000, 5), 0, 0.1) * 0.2

_Pulse_ is band limited and therefore smoother.

	Pulse(XLn(1000, 8000, 5), 0.1) * 0.2

Another pair of examples to compare, _Pulse_:

	Pulse(SinOsc(0.75, 0) * 5800 + 6000, 0.1) * 0.2

and _LFPulse_:

	LFPulse(SinOsc(0.75, 0) * 5800 + 6000, 0, 0.1) * 0.2

LFPulse is better to use as a low frequency controller because it is truely a rectangular wave.

	// Synth.plot({ [LFPulse.ar(1000,0.3,0.7),Pulse.ar(1000,0.3,0.7)] })

The same issues apply to _Saw_ and _LFSaw_.

LFSaw will alias at high frequencies.

	LFSaw(XLn(1000, 8000, 5), 0) * 0.2

Saw is band limited and therefore smoother.

	Saw(XLn(1000, 8000, 5)) * 0.2

Another pair of examples to compare, Saw:

	Saw(SinOsc(0.75, 0) * 5800 + 6000) * 0.2

and LFSaw:

	LFSaw(SinOsc(0.75, 0) * 5800 + 6000, 0) * 0.2

LFSaw is better to use as a low frequency controller because it is truely a sawtooth shape.

	 // Synth.plot({ [LFSaw(1000,0.7),Saw(1000,0.7)] })
