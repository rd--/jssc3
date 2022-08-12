# abs

Absolute value, _-1.abs = 1.abs = 1_.

	var a = Ln(-1, 1, 2);
	var b = a.abs;
	SinOsc([a, b] * 220 + [220, 440], 0) * [a, a.abs] * 0.1

Compare:

	var o = SyncSaw(100, 440);
	[o, o.abs] * 0.1

# acos

Arc cosine

	var x = (Ln(-1, 1, 2).acos / 0.5 * pi);
	SinOsc(x * 110 + 110, 0) * 0.1

# ampdb

Convert linear amplitude to decibels

	SinOsc([Ln(0, 1, 2).ampdb, Ln(-96, 0.001, 2)] * 110 + 110, 0) * 0.1

# asin

Arcsine

# atan

Arctangent

# ceil

Next higher integer

# cos

Cosine

# cosh

Hyperbolic cosine

# cpsmidi

Convert cycles per second to midi note

	SinOsc(SampleRate().cpsMidi, 0) * 0.1

# cpsoct

Convert cycles per second to decimal octaves

# cubed

Cubed value

# dbamp

Convert decibels to linear amplitude

Fixed amplitude:

	SinOsc(440, 0) * -24.dbamp

Modulate amplitude:

	FSinOsc(800, 0) * Ln(-12, -40, 10).dbAmp

# distort

Nonlinear distortion

	(FSinOsc(500, 0) * XLn(0.1, 10, 10)).distort * 0.1

# exp

Exponential

# floor

Next lower integer

# frac

Fractional part

# isNegative

Test if signal is < 0

# isPositive

Test if signal is >= 0

# isStrictlyPositive

Test if signal is > 0

# log10

Base 10 logarithm

# log2

Base 2 logarithm

# log

Natural logarithm

# midicps

Convert midi note to cycles per second

	Saw(Ln(24, 108, 10).midicps) *  0.1

# neg

Negation (inversion)

# octcps

Convert decimal octaves to cycles per second

	Saw(Ln(2, 9, 10).octcps) * 0.1

# reciprocal

Reciprocal

# sign

Sign function, -1 when a < 0, +1 when a > 0, 0 when a is 0

# sin

Sine

# sinh

Hyperbolic sine

# softclip - nonlinear distortion

Distortion with a perfectly linear region from -0.5 to +0.5.

	(FSinOsc(500, 0) * XLn(0.1, 10, 10)).softclip * 0.1

# sqrt - square root

The definition of square root is extended for signals so that sqrt(a) when a<0 returns -sqrt(-a).

# squared

Squared value

# tan

Tangent

# tanh

Hyperbolic tangent
