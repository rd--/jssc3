// https://twitter.com/redFrik/status/1246461901669838848
var c, l1, f1, l2, f2, d, e;
c = add(mul(LFPulse(fdiv(1, 11), 0, fdiv(1, 4)), 99), 99);
l1 = fdiv(add(fdiv(SinOscFB(fdiv(1, 11), 0), 2), 1), 9);
f1 = mul(pow(add(fdiv(mul(Lag(LFPulse(add(fdiv(1, [8, 9]), LFPulse(0.1, 0, 0.5)), 0, 0.5), l1), 4), 3), 1), LFPulse(fdiv(1, [9, 8]), 0, 0.5)), c);
l2 = fdiv(max(SinOscFB(fdiv(1, [5, 4]), 0), 0), 9);
f2 = first(Pitch(sum(Lag(LFPulse(f1, 0, 0.5), l2)), 440, 60, 4000, 100, 16, 1, 0.01, 0.5, 1, 0));
d = SinOscFB(f2, add(fdiv(Lag(LFPulse(fdiv(1, [add(LFPulse(fdiv(1, 9), 0, 0.5), 2), 3]), 0, 0.5), 0.1), 4), 0.3));
e = PitchShift(fdiv(d, 2), 2, sub([3, 2], Lag(LFPulse(fdiv(1, [18, 17]), 0, 0.5), 0.1)), 0, 0);
fdiv(fdiv(HPF(add(d, e), 9), 4), 4)
