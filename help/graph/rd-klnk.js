// klnk (rd) ; mouse control
var o, t, x, y;
o = SinOsc(LFNoise0([0.5, 1.5]), 0);
t = Impulse(mul(abs(Slope(o)), [2, 3]), 0);
x = MouseX(960, 3620, 1, 0.2);
y = MouseY(0.5, 2.0, 0, 0.2);
Ringz(Decay2(t, 0.1, 0.2), TRand(x, 3940, t), mul(TRand(0.005, 0.275, t), y))
