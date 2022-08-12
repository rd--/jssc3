# 2.4 Sound Synthesis in SuperCollider: Modulation Synthesis

In modulation synthesis one wave, the carrier, is influenced (modulated) by a second, the modulator.

Depending on how the carrier and modulator are plugged together there are a variety of methods in common use.

Modulation synthesis is easy to implement, providing computationally efficient shortcuts to complex dynamic spectra. The methods have their own unique sounds too, which can be musically useful.

In this tutorial I will use some small GUIs to give controls for the parameters of the synthesis; this is because we may have more than 2 controls, and MouseX and MouseY only give us two dimensions. We shall learn more about building GUIs in due course.

## Ring Modulation

A straight multiplication of two signals, _carrier * modulator_.

	var carrfreq = MouseX(440, 5000, 1, 0.2);
	var modfreq = MouseY(1, 5000, 1, 0.2);
	var carrier = SinOsc(carrfreq, 0) * 0.5;
	var modulator = SinOsc(modfreq, 0) * 0.5;
	carrier * modulator

For simple sine waves, the spectrum ends up with two frequencies (two sidebands), at _C+M_ and _C-M_, where _C_ is the carrier frequency and _M_ is the modulator frequency.

For more complex waves than sines, we get many more components to the spectrum of the multiplied signals.

But if _C_ and _M_ are harmonic, the sidebands are also harmonic.

For those who want to see some proof, it all follows from the mathematical relation _cos(C)*cos(M) = 0.5*(cos(C-M) + cos(C+M))_

## Amplitude Modulation (AM)

AM is like ring modulation but with a subtle difference: the modulator is unipolar, that is, always positive. Think of tremolo, where the amplitude goes up and down (but is never negative!).

Bipolar, -0.1 to 0.1, _SinOsc(440, 0) * 0.1_.

Unipolar, 0 to 0.2 (0.1 plus or minus 0.1), _SinOsc(440, 0) * 0.1 + 0.1_

The spectrum ends up with the sum and difference frequencies we saw in ring modulation, at C+M and C-M, as well as the original carrier frequency C.

	var carrfreq = MouseX(440, 5000, 1, 0.2);
	var modfreq = MouseY(1, 5000, 1, 0.2);
	var carrier = SinOsc(carrfreq, 0) * 0.5;
	var modulator = SinOsc(modfreq, 0) * 0.25 + 0.25;
	carrier * modulator

The maths is now: _cos(C)*(1+cos(M)) = cos(C)+ 0.5*(cos(C-M) + cos(C+M))_

## Frequency Modulation (FM)

FM was applied to sound synthesis by John Chowning in 1967, though he published his results in 1973. Yamaha licensed the patents and in 1983 released the Yamaha DX7 synthesiser, which went on to sell 300,000 units, the most commercially successful synthesiser of all time.

You might know the 'slow version' of FM already: a vibrato.

Rather than plugging the modulator into the amplitude of the carrier, we're going to plug the modulator into the carrier frequency. There will be three parameters, the carrier frequency C, the modulation frequency M, and the modulation depth or frequency deviation D.

Because there are three variables I'm going to use a GUI rather than the 2-dimensional mouse. I'll explain GUIs properly at a later stage of this course.

	var carrfreq = LinExp(Cc(1), 0, 1, 20, 5000);
	var modfreq = LinExp(Cc(2), 0, 1, 1, 5000);
	var moddepth = LinLin(Cc(3), 0, 1, 0, 10);
	SinOsc(carrfreq + (moddepth * SinOsc(modfreq, 0)), 0) * 0.2

In the spectrum now, there are an infinite number of sidebands, but of varying strength. Based on the values we choose for the parameters C, M and D we can make very thick spectrums, or only a light modulation effect. The sidebands turn up at _C + kM where k is any integer, ie. C. C+M, C-M, C+2M, C-2M, ..._

By changing the modulation frequency and depth, you can see how the energy in the sidebands is redistributed; the actual formulas for this use Bessel functions and are outside the scope of this lecture: but see the Roads Computer Music Tutorial if you're curious.

There is a much more musically effective way to control FM, through the modulation index I, defined as: _I = D/M_

The ratio of frequency deviation to modulation frequency. If I is small there is little audible FM effect. The higher I is, the stronger the energy in the sidebands.

	var carrfreq = LinExp(Cc(1), 0, 1, 20, 5000);
	var modfreq = LinExp(Cc(2), 0, 1, 1, 5000);
	var modindex = LinExp(Cc(3), 0, 1, 0.01, 5000);
	SinOsc(carrfreq + (modindex * modfreq * SinOsc(modfreq, 0)), 0) * 0.2

Or via mouse control

	var modfreq = MouseX(1, 440, 1, 0.2);
	var modindex = MouseY(0, 10, 0, 0.2);
	SinOsc(SinOsc(modfreq, 0) * modfreq * modindex + 440, 0) * 0.2

Harmonicity ratio, following Moore Elements of Computer Music, also see the Max/MSP help file MSP Tutorial 11; Frequency Modulation.  Since sideband energy is distributed to _C+(k*M)_ for integer k, if _M = h*C_, everything is related by an integer to _C_ (negative integers bounce back around, giving harmonic tones).

	var carrfreq = 440;
	var harmonicity = MouseX(0,10, 0, 0.2).roundTo(1);
	var modindex= MouseY(0, 10, 0, 0.2);
	var modfreq = carrfreq * harmonicity;
	SinOsc(carrfreq + (SinOsc(modfreq, 0) * modfreq * modindex), 0) * 0.1

ModIndex is really modulation amplitude/modulation frequency, acts as brightness control as energy distribution changed over components.

## Phase Modulation

Recall the arguments for a sine, _SinOsc(freq, phase).

If you have a input for a phase control you could modulate phase too.

_Phasor_ is a UGen which will loop around a given interval, in this case 0 to 2 * pi, taking us around the waveform of the sinusoid; note that all the action is in the phase input.

	var modfreq = MouseX(1,1000, 1, 0.2);
	var modindex=MouseY(0, 100, 0, 0.2);
	var conversion= 2 * pi / SampleRate();
	SinOsc(0, Phasor(0, 440 * conversion, 0, 2 * pi, 0) + ((modfreq * modindex)  * conversion * SinOsc(modfreq, 0))) * 0.2

The rate of change of phase is frequency. So phase modulation is related to frequency modulation.

See also [PMOsc], a dedicated phase modulation oscillator.

In fact, anything you could control can be modulated, that is, changed over time by some oscillator or other signal.

See also:

- [SinOscFB], feedback FM; a bit of the output is leaked back into the frequency input
- [Vibrato], add vibrato (slow frequency modulation) potentially at some delay after onset

NC: [2.4](https://composerprogrammer.com/teaching/supercollider/sctutorial/2.4%20Modulation%20Synthesis.html)
