// https://twitter.com/redFrik/status/1452954849885163525 ; f0 ; reset (rd)
var r, i, x, t, y, f;
r = Impulse(fdiv(1, 9), 0);
i = TRand(1, 64, r);
x = ceil(add(mul(SinOsc(mod(i, 9.33), 0), 5), 5));
t = SinOsc(fdiv(mul(pow(2, mod(i, 11)), 150), x), 0);
y = gt(abs(HPZ1(x)), 0);
f = LinExp(t, -1, 1, Latch(LinExp(SinOsc(mod(i, 4.4), 0), -1, 1, 9, 999), y), Latch(LinExp(SinOsc(mod(i, pi), 0), -1, 1, 99, 9000), y));
Pan2(mul(Blip(f, add(t, 2)), sub(1, t)), SinOsc(0.1, i), pow(min(TLine(0.2, 0, 9, r), 0.6), 2))
