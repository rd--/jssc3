# 2.5 More Synthesis Examples

## Chorus

I'll use what we've looked at to create a chorusing effect. We make an array of oscillators slightly detuned from one another, mixed to keep them in mono.

	Saw([440, 443 ,437]).sum * 0.1 //chorusing

More complicated sound combining AM, FM, chorusing and time-variation from Ln and XLn.  The Resonz filter has arguments _input, freq, rq=bandwidth/centre frequency_.

	var src = Saw([440, 443, 437] + (SinOsc(100, 0) * 100)); // frequency modulated sawtooth wave with chorusing
	var amp = LFSaw(Ln(3, 17, 3), 0) * 0.5 + 0.5 * Ln(1, 0, 10); // for amplitude modulation
	Resonz(src, XLn(10000, 10, 10), Ln(1, 0.05, 10)).sum * amp // vary filter bandwidth and rq over time

## Sample playback rate modulation

Modulation of sample playback by an oscillator.

Soundfiles will be explained properly in a future week, though see the PlayBuf and Buffer help files if you want to look ahead.

	var sf = SfAcquire("harp-a4", 2, [1, 2]);
	var modfreq= MouseX(1, 4400, 1, 0.2);
	var modindex=MouseY(0, 10, 0, 0.2);
	var modulator = SinOsc(modfreq, 0) * modfreq * modindex + 440;
	SfPlay(sf, SfRateScale(sf) * (modulator / 440), 1, 0, 1, 0)

## Richer bell patch

We are now in a position to return to the additive bell sound and add some modulation effects to make it a richer, more vibrant sound

	var spectrum = #[0.5, 1, 1.19, 1.56, 2, 2.51, 2.66, 3.01, 4.1];
	var amplitudes = #[0.25, 1, 0.8, 0.5, 0.9, 0.4, 0.3, 0.6, 0.1];
	var numpartials = spectrum.size;
	var modfreqs1 = { Rand(1, 5) }.dup(numpartials);
	var modfreqs2 = { Rand(0.1, 3) }.dup(numpartials);
	var decaytimes = 1.to(numpartials).collect({ arg i; Rand(2.5, 2.5 + (5 * (1.0 - (i - 1 / numpartials)))) });
	var partial = {
		arg i;
		var freq = spectrum.nth(i) + (SinOsc(modfreqs1.nth(i), 0) * 0.005) * 500;
		var amp = 0.1 * Line(1, 0, decaytimes.nth(i), 0) * (SinOsc(modfreqs2.nth(i), 0) * 0.1 + 0.9 * amplitudes.nth(i));
		Pan2(SinOsc(freq.kr, 0), Rand(-1, 1), amp.kr)
	};
	1.to(numpartials).collect(partial).sum

I won't explain everything here right now, but it's the sort of thing that should become much clearer and decipherable as you gain SC experience.

NC [2.5](https://composerprogrammer.com/teaching/supercollider/sctutorial/2.5%20More%20Synthesis%20Examples.html)
