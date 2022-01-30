// TChoose ; select input at trigger
var x = MouseX(1, 1000, 1, 0.1);
var t = Dust(x);
var f = midiCps(TIRand(48, 60, t));
var o = TChoose(t, [SinOsc(f, 0), Saw(mul(f, 2)), Pulse(mul(f, 0.5), 0.1)]);
mul(o, 0.1)

