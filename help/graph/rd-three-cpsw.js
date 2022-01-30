// three cpsw (rd)
var t, f, o;
t = Dust([12, 18]);
f = add(mul(LFNoise0(TRand(1, 64, t)), [9000, 12000]), 9500);
o = sum(Saw([f, mul(f, TRand(0.75, 0.7505, t)), mul(f, TRand(0.975, 1.025, t))]));
clip2(mul(o, TRand(0.0, 0.5, t)), 0.75)
