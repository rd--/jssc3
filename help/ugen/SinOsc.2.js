// SinOsc ; FM
var modIndex, modFreq;
modIndex = MouseY(0, 1000, 0, 0.2);
modFreq = LinExp(MouseX(0, 1, 0, 0.2), 0, 1, 5, 5000);
mul(SinOsc(add(440, mul(modIndex, SinOsc(modFreq, 0))), 0), 0.1)
