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
