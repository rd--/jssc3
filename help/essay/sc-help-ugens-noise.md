# BrownNoise

_BrownNoise()_

Generates noise whose spectrum falls off in power by 6 dB per octave.

	BrownNoise() * 0.1

# ClipNoise

_ClipNoise()_

Generates noise whose values are either -1 or 1.  This produces the maximum energy for the least peak to peak amplitude.

	ClipNoise() * 0.1

# Crackle - chaotic noise function

_Crackle(param)_

A noise generator based on a chaotic function.

- param: a parameter of the chaotic function with useful values from just below 1.0 to just above 2.0. Towards 2.0 the sound crackles.

Fixed param:

	Crackle(1.95) * 0.1

Modulate param:

	Crackle(Ln(1, 2, 10)) * 0.1

# Dust - random impulses

_Dust(density)_

Generates random impulses from 0 to +1.

- density: average number of impulses per second

Fixed density:

	Dust(200) * 0.1

Modulate density:

	Dust(XLn(20000, 2, 10)) * 0.1

# Dust2 - bipolar random impulses

_Dust2(density)_

Generates random impulses from -1 to +1. There is no noticeable difference in sound from Dust, but it may be useful for its properties in some situations.

- density: average number of impulses per second

Fixed density:

	Dust2(200) * 0.1

Modulate density:

	Dust2(XLn(20000, 2, 10)) * 0.1

# GrayNoise

_GrayNoise()_

Generates noise which results from flipping random bits in a word.  This type of noise has a high RMS level relative to its peak to peak level.  The spectrum is emphasized towards lower frequencies.

	GrayNoise() * 0.125

# LatoocarfianC - chaotic function

_LatoocarfianC(freq, a, b, c, d, xi, yi)_

This is a function given inClifford Pickover's book Chaos In Wonderland, pg 26.  The function has four parameters a, b, c, and d.  The function is _x1 = sin(b*y0) + c*sin(b*x0)\ny1 = sin(a*x0) + d*sin(a*y0)_.

According to Pickover, parameters a and b should be in the range from -3 to +3, and parameters c and d should be in the range from 0.5 to 1.5.  The function can, depending on the parameters given, give continuous chaotic output, converge to a single value (silence) or oscillate in a cycle (tone).  This UGen is experimental and not optimized currently, so is rather hoggish of CPU.

	// LatoocarfianC ; texture
	OverlapTexture({
		arg tr;
		var freq = TRand(400, SampleRate() / 3, tr);
		var a = TRand(-3, 3, tr);
		var b = TRand(-3, 3, tr);
		var c = TRand(0.5, 1.5, tr);
		var d = TRand(0.5, 1.5, tr);
		SinOsc(freq, 0) * 0.05 + Pan2(LatoocarfianC(freq, a, b, c, d, 0.5, 0.5), TRand(-1, 1, tr), 0.05)
	}, 1, 4, 8)

# LFClipNoise - clipped noise

_LFClipNoise(freq)_

Randomly generates the values -1 or +1 at a rate given by the nearest integer division of the sample rate by the freq argument. It is probably pretty hard on your speakers!

- freq: approximate rate at which to generate random values.

Fixed frequency:

	LFClipNoise(1000) * 0.05

Modulate frequency:

	LFClipNoise(XLn(1000, 10000, 10)) * 0.05

# LFNoise0 - step noise

_LFNoise0(freq)_

Generates random values at a rate given by the nearest integer division of the sample rate by the freq argument.

- freq: approximate rate at which to generate random values.

Fixed frequency:

	LFNoise0(1000) * 0.05

Modulate frequency:

	LFNoise0(XLn(1000, 10000, 10)) * 0.05

# LFNoise1 - ramp noise

_LFNoise1(freq)_

Generates linearly interpolated random values at a rate given by the nearest integer division of the sample rate by the freq argument.

- freq: approximate rate at which to generate random values.

Fixed frequency:

	LFNoise1(1000) * 0.05

Modulate frequency:

	LFNoise1(XLn(1000, 10000, 10)) * 0.05

# LFNoise2 - quadratic noise

_LFNoise2(freq)_

Generates quadratically interpolated random values at a rate given by the nearest integer division of the sample rate by the freq argument.

- freq: approximate rate at which to generate random values.

Fixed frequency:

	LFNoise2(1000) * 0.05

Modulate frequency:

	LFNoise2(XLn(1000, 10000, 10)) * 0.05

# LinCongC - linear congruential generator

_LinCong(freq, a, c, m, xi)_

Linear congruential generators are often used to implement random number generators. However the number series they generate are cyclic.  There are 'good' and 'bad' choices for the parameters if one wants to have a good random number series. However the real point of this UGen is to experiment and use the function as something between an oscillator and a noise source.  The formula is _"x1 = ((a * x0) + c) % m_.

All of the parameters are integers and cannot be modulated.

- a: a multiplier.
- c: an offset.
- m: the modulus of the series.
- xi: the seed value for the generator.

Texture:

	OverlapTexture({
		arg tr;
		var freq = SampleRate() / 2;
		var m = TIRand(0, 1000000, tr);
		var a = TIRand(1, 2000, tr);
		var c = TIRand(1, 30000, tr);
		LinCongC(freq, a, c, m, { TIRand(0, m, tr) }.dup(2)) * 0.05
	}, 1, 2, 4)

# PinkNoise

_PinkNoise()_

Generates noise whose spectrum falls off in power by 3 dB per octave.  This gives equal power over the span of each octave.

	PinkNoise() * 0.1

# WhiteNoise

_WhiteNoise()_

Generates noise whose spectrum has equal power at all frequencies.

	WhiteNoise() * 0.1
