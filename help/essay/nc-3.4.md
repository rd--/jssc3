# Server-side Sequencing and Triggers

Exploring some UGens that let you sequence on the server, without any language intervention; timing patterns all within a Synth. Like analogue sequencing modules...

## Clocking UGens

_Impulse_.  A sequence of isochronous clicks, can make a good clock signal.  From rhythmic to audio rate.

	Impulse(MouseX(1, 100, 0, 0.2), 0)

_Dust_.  Rather than evenly spaced clicks, the opposite is randomly occurring (stochastic) clicks.  From rhythmic to audio rate; the Mouse is controlling the average number of clicks per second, they are not evenly spaced!

	Dust(MouseX(1, 100, 0 ,0.2))

Types of LFNoise for linear random noise between -1 and 1 at a certain rate.

	SinOsc([
		LFNoise0(100),	//step
		LFNoise1(100),	//linear interpolation
		LFNoise2(100)	//quadratic interpolation
	] * 220 + 220, 0).splay2 * 0.1

## Triggers

When a signal crosses from a nonpositive value to a positive value, the transition can act as a trigger in the input of some UGens.

There are rounding errors to watch out for, and you need to avoid positive zero; usually safer to force a transition from -0.01 to 1, for example, rather than 0 to 1.

The clock signals often make good trigger sources, for instance, Impulse.

Stepper responds to triggers to go through a sequence: _Stepper(trig, reset, min, max, step, resetval)_

We'll trigger it with an Impulse and make it go between 1 and 10 in steps of 1 (values must be integers).

	SinOsc(Stepper(Impulse(10, 0), 0, 1, 10, 1, 1) * 100, 0) * 0.1

To get arbitrary pitches (rather than just a monotonic sequence), Stepper can be combined with Select:

Impulse frequency of 4 is 4 events per second, kr is used since slow rates and Select works with array data second input if kr but not ar.

	Saw(Select(Stepper(Impulse(4, 0.1).kr, 0, 0, 7, 1, 0), [72, 63, 67, 72, 55, 62, 63, 60].midicps)) * 0.1

Speed control

	Saw(Select(Stepper(Impulse(MouseX(1, 40, 0, 0.2), 0.1).kr,  0,  0,  7,  1,  0),  #[72, 63, 67, 72, 55, 62, 63, 60].midiCps)) *  0.1

(As well as this sort of sequencing, Select can also be used to dynamically choose between UGens in a single running Synth)

Any signal can be turned into triggers. The Trig and Trig1 UGens give 'spiky' signals as output (they hold for a user-specified duration when triggered; Trig1 always outputs a 1, Trig follows the stimulus value).

Trigger at start of every sinusoidal cycle (where sine goes from negative to positive)

	var source = SinOsc(10, 0);
	PinkNoise() * 0.1 * [source, Trig1(source, 0.001)]

In the following examples we'll show going from LFNoise UGens to the trigger points.

Trigger whenever crossing from negative to positive.

	var source = LFNoise0(10);
	var trigger = Trig1(source, 0.001); // 0.001 is duration of trigger signal output
	PinkNoise() * 0.1 * [source, trigger]

Trigger on all ups.

	var source = LFNoise0(10);
	var trigger= Trig1(source - Delay1(source), 0.001); // 0.001 is duration of trigger signal output
	PinkNoise() * 0.1 * [source, trigger]

Trigger on any change.

	var source = LFNoise0(10);
	var trigger = Trig1((source - Delay1(source)).abs, 0.001); // 0.001 is duration of trigger signal output
	PinkNoise() * 0.1 * [source, trigger]

Latch: on a trigger, hold an input value, _Latch(in, trig)_.  Allows resampling and triggered rendering.

Grab the sine's current value _n_ times a second.

	var xy = [MouseX(10, 100, 0, 0.2), MouseY(10, 100, 0, 0.2)];
	SinOsc(Latch(SinOsc(133, 0), Impulse(xy, 0)).lag(1 / xy) * 220 + 220, 0) * 0.1

Removes smoothing!

	SinOsc(Latch(LFNoise2(10), Impulse(10, 0)) * 220 + 220, 0) * 0.1

Could be used to create sequencing patterns!

	SinOsc(300 + (200 * Latch(SinOsc(13.3, 0), Impulse(10, 0))), 0) * 0.2

Non-sustaining envelopes can be retriggered via the gate input to an envelope.

	{EnvGen.ar(Env([0,1,0],[0.01,0.01]),Impulse.kr(50))}.plot(0.1)

If you set the envelope up carefully, this could be used like a more flexible Stepper

	{EnvGen.ar(Env([0,1,0,0.5,-0.4],0.01!4),Impulse.kr(25))}.plot(0.1)

Slowed down by factor of 10 to be heard as held pitches.

	SinOsc(400 * (1 + EnvGen(Impulse(2.5, 0), 1, 0, 1, 0, EnvSpec(#[0, 1, 0, 0.5, -0.4], #[0.1], #[\step], nil, nil, 0).coord)), 0) * 0.1

Use midiCps on output to get scales.

	SinOsc(EnvGen(Impulse(2, 0), 1, 0, 1, 0, EnvSpec(#[63, 63, 60, 55, 60], #[0.125], #[\step], nil, nil, 0).coord).midiCps, 0) * 0.1

The Impulse's rate acts like a beats per second here, and the envelope timings are in beats (0.125 per transition).

Percussive sound retriggered 3 times a second.

	var trig = Impulse(3, 0); // trigger source
	var sound = LFPulse(110 * [1, 5 / 2], 0, 0.5).sum * 0.2;
	var env = Decay2(trig, 0.02, 0.2); //with retriggering controlled by impulse
	Pan2(sound * env, 0, 1)

(Note that if the envelope has a release node, the gate input to an EnvGen is used instead as a control which keeps the envelope held open (gate=1) until released (gate=0); see the EnvGen and Env help files)

Another triggering example: you could collect triggers from one signal and use them to spawn changes in another part of the UGen graph

Value of third frequency component is a new random number with each trigger.

_>_ is itself a UGen when used in this context; it is outputting the result of comparing the LFNoise0 with the value 0 every sample!
_TRand_ chooses a random number in its range when triggered.

	var trig = LFNoise0(13) > 0;
	var sound = LFPulse(110 * [1, 5 / 2, TRand(3.9, 4.1, trig)], 0, 0.5).sum * 0.2;
	var env = Decay2(Trig(trig, SampleDur()), 0.02, 0.2);
	Pan2(sound * env, 0, 1)

Some oscillators can be retriggered, for example SyncSaw

For sync oscillators:

- hard sync = immediate reset of slave oscillator
- soft sync = wait till start of next period for a reset of state

The final frequency and timbre is an interaction of the frequency of the slave oscillator and the syncing (resetting) signal

SyncSaw is hard sync.

	SyncSaw(MouseX(1, 400, 0, 0.2), MouseY(400, 800, 0, 0.2)) * 0.1

Making a custom hard sync oscillator using an EnvGen and a trigger source

	{EnvGen.ar(Env([0,0,1,-1,0],MouseY.kr(0,1)*[0,128,256,128]/SampleRate.ir),Impulse.ar(MouseX.kr(10,300,'exponential')))}.play

To add smoothing and portamento to hard-edged signals, the Lag filter is useful

Portamento/glide:

	Saw((Stepper(Impulse(10, 0), 0, 1, 10, 1, 1) * 200).lag(MouseX(0.0, 0.2, 0, 0.2))) * 0.1

Another example: Ringz is a resonant filter, exprange puts values from -1 to 1 to the desired range (100 to 2000) with an exponential mapping more fitting to human perception of frequency values.

	Ringz(Saw(LFNoise0(5).lag(0.1).exprange(100, 2000)) * 0.2, 1000, 0.01) * 0.1

Round used to make frequency values round off to nearest 20 Hz (re-quantising the signal).  Perceived speed-ups due to interaction of slower lag and rounding of frequency.

	Ringz(Saw(LFNoise0(5).lag(MouseX(0.01, 0.3, 0, 0.2)).exprange(100, 2000).roundTo(20)) * 0.2, 1000, 0.01) * 0.1

The Decay UGen can also be used to put a smoothed tail on an impulse (or any signal).

	PinkNoise() * Decay(Impulse(10, 0), 0.1) * 0.1

See also Decay2 for smoothing at attack and release.

	PinkNoise() * Decay2(Impulse(5, 0), 0.05, 0.1) * 0.1

Other mechanisms (later):

Demand rate UGens

Sequencing and event reactive functionality can be constructed with other UGens like Index, IEnvGen, PulseCount, PulseDivider, ToggleFF, SetResetFF, Timer, Schmidt and more
