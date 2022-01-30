// f0 ; tw 0165
var s, dt;
s = Limiter(LeakDC(InFb(1, [1, 0]), 0.995), 1, 0.01);
dt = add(mul(LFTri(fdiv(1, [6, 8]), 0), 0.4), 0.5);
mul(CombC(add(BLowPass(s, 2000, 1), Impulse(0, 0)), 1, dt, 1), 0.99)
