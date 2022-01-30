// FreqShift
var a, b, c;
a = mul(Blip(60, 4), LFGauss(4, fdiv(1, 8), 0, 1, 0));
b = add(fdiv(a, 4), LocalIn(2, 0));
c = FreqShift(b, mul(LFNoise0(fdiv(1, 4)), 90), 0);
mrg(c, LocalOut(mul(DelayC(c, 1, 0.1), 0.9)))
