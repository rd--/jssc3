// sample and hold liquidities (jmcc) #4 ; mouse control
var r, t, c, cf, f, p, i;
r = MouseX(1, 200, 1, 0.1);
t = reciprocal(r);
c = mul(Impulse(r, 0), 0.4);
cf = MouseY(100, 8000, 1, 0.1);
f = Latch(add(mul(mul(WhiteNoise(), cf), 0.5), cf), c);
p = Latch(WhiteNoise(), c);
i = Pan2(SinOsc(f, 0), p, Decay2(c, mul(0.1, t), mul(0.9, t)));
CombC(i, 0.3, 0.3, 2)
