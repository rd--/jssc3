# Gate - gate or hold

_Gate(in, gate)_

Allows input signal value to pass when gate is positive, otherwise holds last value.

- in: input signal.
- gate: trigger. Trigger can be any signal. A trigger happens when the signal changes from non-positive to positive.

Frequency is a random curve for 1/4 of a cycle and a held tone for 3/4 of a cycle:

    SinOsc(Gate(LFNoise2(4), LFPulse(1.333, 0, 0.25)) * 100 + 200, 0) * 0.1

# InRange - tests if a signal is within a given range

_InRange(in, lo, hi)_

If in is >= lo and <= hi output 1.0, otherwise output 0.0. Output is initially zero.

- in: signal to be tested
- lo: low threshold
- hi: high threshold

Trigger noise burst:

    InRange(SinOsc(1, 0) *  0.2, [-0.15, -0.1], [0.15, 0.2]) * PinkNoise() * 0.1

# PeakFollower - track peak signal amplitude

_PeakFollower(in, decay)_

Outputs the peak amplitude of the signal received at the input.  if level is below maximum, the level decreases by the factor given in decay.

- in: input signal.
- decay: decay factor.

Internally, the absolute value of the signal is used, to prevent underreporting the peak value if there is a negative DC offset. To obtain the minimum and maximum values of the signal as is, use the _RunningMin_ and _RunningMax_ UGens.

No decay:

	SinOsc(PeakFollower(Dust(20) * Ln(0, 1, 4), 1) * 1500 + 200, 0) * 0.1

A little decay:

	SinOsc(PeakFollower(Dust(20) * Ln(0, 1, 4), 0.999) * 1500 + 200, 0) * 0.1

Mouse controls decay:

    var decay = MouseX(0.99, 1.00001, 0, 0.1).min(1);
	SinOsc(PeakFollower(Dust(20) * Ln(0, 1, 4), decay) * 1500 + 200, 0) * 0.1

Follow a sine lfo, decay controlled by mouse:

    var decay = MouseX(0, 1.1, 0, 0.1).min(1);
	SinOsc(PeakFollower(SinOsc(0.2, 0), decay) * 200 + 500, 0) * 0.1

# Phasor - a resettable linear ramp between two levels

_Phasor(trig, rate, start, end, resetPos)_

Phasor is a linear ramp between start and end values. When its trigger input crosses from non-positive to positive, Phasor's output will jump to its reset position. Upon reaching the end of its ramp Phasor will wrap back to its start. N.B. Since end is defined as the wrap point, its value is never actually output.

Phasor is commonly used as an index control with [BufRd] and [BufWr].

- trig: when triggered, reset value to resetPos (default: 0, Phasor outputs start initially)
- rate: the amount of change per sample i.e at a rate of 1 the value of each sample	will be 1 greater than the preceding sample
- start: start point of ramp
- end: end point of ramp
- resetPos: the value to jump to upon receiving a trigger.

Phasor controls sine frequency, end frequency matches a second sine wave:

    var rate = MouseX(0.2, 2, 1, 0.2);
    var trig = Impulse(rate, 0);
    var sr = SampleRate();
    var x = Phasor(trig, rate / sr, 0, 1, 0);
    SinOsc(
        [
            LinLin(x, 0, 1, 600, 1000), // convert range from 0..1 to 600..1000
            1000 // constant second frequency
        ],
        0
    ) * 0.1

Two phasors control two sine frequencies.  _MouseX_ controls trigger frequency and _MouseY_ controls resetPos of the second:

    var rate = MouseX(1, 200, 1, 0.2);
    var trig = Impulse(rate, 0);
    var sr = SampleRate();
    var x = Phasor(trig, rate / sr, 0, 1, [0, MouseY(0, 1, 0, 0.2)]);
    SinOsc(x * 500 + 500, 0) * 0.2

Use phasor to index into a sound file.  Start and end here are defined as 0 and the number of frames in the buffer.  This means that the Phasor will output values from 0 to numFrames - 1 before looping, which is perfect for driving BufRd.  (See note above)

    var b = SfAcquire("crotale-d6", 1, [1]);
    SfRead(b, Phasor(1, SfRateScale(b), 0, SfFrames(b)), 1, 2)

Two phasors control two sound file positions.  _MouseX_ controls trigger frequency and _MouseY_ controls resetPos of the second:

    var b = SfAcquire("crotale-d6", 1, [1]);
    var rate = MouseX(0.1, 100, 1, 0.2);
    var trig = Impulse(rate, 0);
    var framesInBuffer = SfFrames(b);
    var x = Phasor(trig, SfRateScale(b), 0, framesInBuffer, [0, MouseY(0, framesInBuffer, 0, 0.2)]);
    SfRead(b, x, 1, 2)

# PulseCount - pulse counter

_PulseCount(trig, reset)_

Each trigger increments a counter which is output as a signal.

- trig: trigger. Trigger can be any signal. A trigger happens when the signal changes from non-positive to positive.
- reset: resets the counter to zero when triggered.

Pulse count as frequency input:

    SinOsc(PulseCount(Impulse(10, 0), Impulse(0.4, 0)) * 200, 0) * 0.05

# PulseDivider - pulse divider

_PulseDivider(trig, div, startCount)_

Outputs one impulse each time it receives a certain number of triggers at its input.

- trig: trigger. Trigger can be any signal. A trigger happens when the signal changes from non-positive to positive.
- div: number of pulses to divide by.
- startCount: starting value for the trigger count. This lets you start somewhere in the middle of a count, or if startCount is negative it adds that many counts to the first time the output is triggers.

Lower tone at quarter the clock rate:

    var p = Impulse(8, 0);
    var a = SinOsc(1200, 0) * Decay2(p, 0.005, 0.1);
    var b = SinOsc(600,  0) * Decay2(PulseDivider(p, 4, 0), 0.005, 0.5);
    (a + b) * 0.4

Four divisions:

    var p = Impulse(8, 0);
    var a = SinOsc(1200, 0) * Decay2(p, 0.005, 0.1);
    var b = SinOsc(600,  0) * Decay2(PulseDivider(p, 4, 0), 0.005, 0.5);
    var c = SinOsc(800,  0) * Decay2(PulseDivider(p, 2, 1), 0.005, 0.5);
    var d = SinOsc(200,  0) * Decay2(PulseDivider(p, 16, 0), 0.005, 1.0);
    (a + b + c + d) * 0.3

# Schmidt - Schmidt trigger

_Schmidt(in, lo, hi)_

When in crosses to greater than hi, output 1.0, then when signal crosses lower than lo output 0.0. Uses the formula if(out == 1, { if(in < lo, { out = 0.0 }) }, { if(in > hi, { out = 1.0 }) }). Output is initially zero.

- in: signal to be tested
- lo: low threshold
- hi: high threshold

Threshold octave jumps:

    var in = LFNoise1(3);
    var octave = Schmidt(in, -0.15, 0.15) + 1;
    SinOsc(in * 200 + 500 * octave, 0) * 0.1

# Stepper - pulse counter

_Stepper(trig, reset, min, max, step, resetval)_

Each trigger increments a counter which is output as a signal. The counter wraps between min and max.

- trig: trigger. Trigger can be any signal. A trigger happens when the signal changes from non-positive to positive.
- reset: resets the counter to resetval when triggered.
- min: minimum value of the counter.
- max: maximum value of the counter.
- step: step value each trigger. May be negative.
- resetval: value to which the counter is reset when it receives a reset trigger. If nil, then this is patched to min.

Count by 1:

    SinOsc(Stepper(Impulse(10, 0), 0, 4, 16, 1, 0) * 100, 0) * 0.05

Count by -3:

    SinOsc(Stepper(Impulse(10, 0), 0, 4, 16, -3, 0) * 100, 0) * 0.05

Count by 4:

    SinOsc(Stepper(Impulse(10, 0), 0, 4, 16, 4, 0) * 100, 0) * 0.05

Count by mouse control:

    SinOsc(Stepper(Impulse(10, 0), 0, 4, 16, MouseX(-9, 9, 0, 0.2), 0) * 100, 0) * 0.05

Using Stepper and BufRd for sequencing, mouse controls clock rate:

    var b = [43, 55, 72, 70, 55, 58, 41, 67, 41, 60, 55, 39, 58, 55, 43, 51].asLocalBuf;
    var rate = MouseX(1, 3, 1, 0.2);
    var clock = Impulse(rate, 0);
    var env = Decay2(clock, 0.002, 2.5);
    var index = Stepper(clock, 0, 0, 15, 1, 0);
    var freq = Lag2(BufRd(1, b, index, 1, 1).midiCps, 0.1) + [0, 0.3];
    var ffreq = Lag2(freq, 0.1) + [0, 0.3];
    var out, rev, lfo;
    out = LFPulse(freq * [1, 3/2, 2], 0, 0.3).sum;
    out = RLPF(out, ffreq, 0.3) * env;
    out = RLPF(out, ffreq, 0.3) * env;
    out = out * 0.02;
    out = CombL(out, 1, 0.66 / rate, 2) * 0.8 + out; // echo
    rev = out;
    5.timesRepeat({ rev = AllpassN(rev, 0.05, { Rand(0, 0.05) }.dup(2), Rand(1.5, 2)) });
    out = out + (0.3 * rev);
    out = LeakDC(out, 0.995);
    lfo = SinOsc(0.2, [0, 0.5 * pi]) * 0.0024 + 0.0025;
    1.timesRepeat({ out = DelayL(out, 0.1, lfo) + out }); // flanger
    OnePole(out, 0.9) * 0.5

# Sweep - triggered linear ramp

_Sweep(trig, rate)_

Starts a linear raise by rate/sec from zero when trig input crosses from non-positive to positive 

Using sweep to modulate sine frequency:

    var trig = Impulse(MouseX(0.5, 20, 1, 0.2), 0);
    SinOsc(Sweep(trig, 700) + 500, 0) * 0.1

Using sweep to index into a buffer:

    var trig = Impulse(MouseX(0.5, 10, 1, 0.2), 0);
    var sf = SfAcquire("floating_1", 1, [1]).first;
    BufRd(1, sf, Sweep(trig, BufSampleRate(sf)))

Backwards, variable offset:

    var trig = Impulse(MouseX(0.5, 10, 1, 0.2), 0);
    var sf = SfAcquire("floating_1", 1, [1]).first;
    var rate = BufSampleRate(sf);
    BufRd(1, sf, Sweep(trig, rate.negated) + (BufFrames(sf) * LFNoise0(0.2)))

Raising rate:

    var trig = Impulse(MouseX(0.5, 10, 1, 0.2), 0);
    var sf = SfAcquire("floating_1", 1, [1]).first;
    var rate = Sweep(trig, 2) + 0.5;
    BufRd(1, sf, Sweep(trig, BufSampleRate(sf) * rate))

# TDelay - trigger delay

_TDelay(trigger, delayTime)_

Delays a trigger by a given time. Any triggers which arrive in the time between an input trigger and its delayed output, are ignored.

- trigger: input trigger signal.
- delayTime: delay time in seconds.

Impulse runs faster than flip flop:

	var z = Impulse(2, 0);
	[z, ToggleFF(TDelay(z, 0.5)) * SinOsc(440, 0)] * 0.1

Dust runs faster than flip flop:

	var z = Dust(5);
	[z, ToggleFF(TDelay(z, 0.5)) * SinOsc(440, 0)] * 0.1

# Timer - returns time since last triggered

_Timer(trig)_

Using timer to modulate sine frequency, the slower the trigger is the higher the frequency:

    var x = MouseX(0.5, 20, 1, 0.2);
    var trig = Impulse(x, 0);
    SinOsc([x * 20 + 100, Timer(trig) * 500 + 500], 0) * 0.1

# ToggleFF - toggle flip flop

_ToggleFF(trig)_

Toggles between zero and one upon receiving a trigger.

- trig: trigger input

Increasing density triggers frequency switcher:

    SinOsc((ToggleFF(Dust(XLn(1, 1000, 60))) * 400) + 800, 0) * 0.1
