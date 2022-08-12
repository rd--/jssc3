# Blip - band limited impulse oscillator

_Blip.ar(freq, numharm)_

Band Limited ImPulse generator. All harmonics have equal amplitude.  This is the equivalent of 'buzz' in MusicN languages. _Warning_: This waveform in its raw form could be damaging to your ears at high amplitudes or for long periods.

Implementation notes: It is improved from other implementations in that it will crossfade in a control period when the number of harmonics changes, so that there are no audible pops. It also eliminates the divide in the formula by using a 1/sin table (with special precautions taken for 1/0). The lookup tables are linearly interpolated for better quality.

(_Synth-O-Matic_ (1990) had an impulse generator called blip, hence that name here rather than 'buzz').

- freq: frequency in Hertz
- numharm: number of harmonics. This may be lowered internally if it would cause aliasing.

Modulate frequency:

	Blip(XLn(20000, 200, 6), 100) * 0.2

Modulate numharmonics:

	Blip(200,Ln(1, 100, 20)) * 0.2

# Formant - formant oscillator

_Formant(kfundfreq, kformfreq, kwidthfreq)_

Generates a set of harmonics around a formant frequency at a given fundamental frequency.

- kfundfreq: fundamental frequency in Hertz.
- kformfreq: formant frequency in Hertz.
- kwidthfreq: pulse width frequency in Hertz. Controls the bandwidth of the formant.

Widthfreq must be greater than or equal fundfreq.

Modulate fundamental frequency, formant freq stays constant:

	Formant(XLn(400, 1000, 8), 2000, 800) * 0.125

Modulate formant frequency, fundamental freq stays constant:

	Formant(200, XLn(400, 4000, 8), 200) * 0.125

Modulate width frequency, other freqs stay constant:

	Formant(400, 2000, XLn(800, 8000, 8)) * 0.125

# FSinOsc - fast sine oscillator

_FSinOsc(freq, iphase)_

Very fast sine wave generator (2 PowerPC instructions per output sample) implemented using a ringing filter. This generates a much cleaner sine wave than a table lookup oscillator and is a lot faster.  However, the amplitude of the wave will vary with frequency. Generally the amplitude will go down as you raise the frequency and go up as you lower the frequency.  _Warning_: In the current implementation, the amplitude can blow up if the frequency is modulated by certain alternating signals.

- freq: frequency in Hertz

Constant frequency:

	FSinOsc(800, 0) * 0.25

Modulate frequency:

	FSinOsc(XLn(200, 4000, 1), 0) * 0.25

Loses amplitude towards the end:

	FSinOsc(FSinOsc(XLn(4, 401, 8), 0) * 200 + 800, 0) * 0.25

# Impulse - impulse oscillator

_Impulse(freq, phase)_

Outputs non band limited single sample impulses.

- freq: frequency in Hertz
- phase: phase offset in cycles (0..1)

Constant frequency:

	Impulse(800, 0) * 0.5

Modulate frequency:

	Impulse(XLn(800, 100, 5), 0) * 0.5

Modulate phase:

	Impulse(4, [0, MouseX(0, 1, 0, 0.2)]) * 0.2

# LFPulse - pulse oscillator

_LFPulse(freq, iphase,width)_

A non-band-limited pulse oscillator. Outputs a high value of one and a low value of zero.

- freq: frequency in Hertz
- iphase: initial phase offset in cycles (0..1)
- width: pulse width duty cycle from zero to one.

Mouse control of width:

	LFPulse(500, 0, MouseX(0, 1, 0, 0.2)) * 0.1

Used as both Oscillator and Lfo:

	LFPulse(LFPulse(3, 0, 0.3) * 200 + 200, 0, 0.2) * 0.1

Compare with band limited Pulse UGen:

	[Pulse(100, 0.3), LFPulse(100, 0, 0.3)] * 0.15

# LFSaw - sawtooth oscillator

_LFSaw(freq, iphase)_

A non-band-limited sawtooth oscillator. Output ranges from -1 to +1.

- freq: frequency in Hertz
- iphase: initial phase offset. For efficiency reasons this is a value ranging from 0 to 2.

Constant frequency:

	LFSaw(500, 1) * 0.1

Used as both Oscillator and LFO:

	LFSaw(LFSaw(4, 0) * 200 + 400, 0) * 0.1

# LFTri - triangle oscillator

_LFTri(freq, iphase)_

A non-band-limited triangle oscillator. Output ranges from -1 to +1.

- freq: frequency in Hertz
- iphase: initial phase offset. For efficiency reasons this is a value ranging from 0 to 4.

Constant frequency:

	LFTri(500, 0) * 0.1

Used as both Oscillator and LFO:

	LFTri(LFTri(4, 0) * 200 + 400, 0) * 0.1

# PMOsc - phase modulation oscillator pair

_PMOsc(carfreq, modfreq, index, modphase)_

Phase modulation sine oscillator pair.

- carfreq: carrier frequency in cycles per second.
- modfreq: modulator frequency in cycles per second.
- index: modulation index in radians.
- modphase: a modulation input for the modulator's phase in radians

Modulate carfreq:

	PMOsc(Ln(600, 900, 5), 600, 3, 0) * 0.1

Modulate modfreq:

	PMOsc(300, Ln(600, 900, 5), 3, 0) * 0.1

Modulate index:

	PMOsc(300, 550, Ln(0, 20, 8), 0) * 0.1

Texture:

	OverlapTexture({
		arg tr;
		LinPan2(PMOsc(TRand(20, 2000, tr), TRand(0, 800, tr), TLine(0, TRand(0, 12, tr), 9), 0), TRand(-1, 1, tr), 0.1)
	}, 2, 5, 4)

# Pulse - band limited pulse wave

_Pulse(kfreq, kwidth)_

Band limited pulse wave generator with pulse width modulation.

- kfreq: frequency in Hertz
- kwidth: pulse width ratio from zero to one. 0.5 makes a square wave.

Modulate frequency:

	Pulse(XLn(40, 4000, 6), 0.1) * 0.1

Modulate pulse width:

	Pulse(200, Ln(0.01, 0.99, 8)) * 0.1

Two band limited square waves thru a resonant low pass filter:

	RLPF(Pulse([100, 250], 0.5) * 0.1, XLn(8000, 400, 5), 0.05)

# Saw - band limited sawtooth

_Saw(kfreq)_

Band limited sawtooth wave generator.

- kfreq: frequency in Hertz

Modulating the frequency:

	Saw(XLn(40, 4000, 6)) * 0.1

Two band limited sawtooth waves through a resonant low pass filter:

	RLPF(Saw([100, 250]) * 0.1, XLn(8000, 400, 5), 0.05)

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

# SyncSaw - hard sync sawtooth wave

_SyncSaw(ksyncFreq, ksawFreq)_

A sawtooth wave that is hard synched to a fundamental pitch. This produces an effect similar to moving formants or pulse width modulation. The sawtooth oscillator has its phase reset when the sync oscillator completes a cycle. This is not a band limited waveform, so it may alias.

- ksyncFreq: frequency of the fundamental.
- ksawFreq: frequency of the slave synched sawtooth wave. sawFreq should always be greater than syncFreq.

Modulate saw frequency:

	SyncSaw(100, Ln(100, 800, 12)) * 0.1

Modulate saw frequency with mouse (view is oscilloscope, _Impulse_ shows sync frequency):

	 var freq = 400;
	 [SyncSaw(freq, freq * MouseX(1, 3, 0, 0.2)), Impulse(freq, 0)] * 0.1

# VarSaw - variable duty saw

_VarSaw(freq, iphase,width)_

- freq: frequency in Hertz
- iphase: initial phase offset in cycles ( 0..1 )
- width: duty cycle from zero to one.

Modulate frequency and width:

	VarSaw(
		LFPulse([3, 3.03], 0, 0.3) * 200 + 200, // frequency
		0, // initial phase
		LFTri(1, 0) * 0.5 + 0.5 // width
	) * 0.1 // mul

Same but with static width:

	VarSaw(
		LFPulse([3, 3.03], 0, 0.3) * 200 + 200, // frequency
		0, // initial phase
		0.2 // width
	) * 0.1 // mul

Compare VarSaw and LFPulse:

	[
		LFPulse(LFPulse(3, 0, 0.3) * 200 + 200, 0, 0.2) * 0.1,
		VarSaw(LFPulse(3, 0, 0.3) * 200 + 200, 0, 0.2) * 0.1
	]
