// https://twitter.com/redFrik/status/1197185125819277312
var f, e, g, c, o, d;
f = [2, 2.2];
e = fdiv(f, 22);
g = shiftLeft(2, 2);
c = RHPF(CombC(mul(fdiv(SinOsc(e, 0), 2), LocalIn(2, 0)), 2, 2, g), mul([22, 2], 222), mul(e, 2));
o = mul(SinOsc(mul(mul(pow(2.2, ToggleFF(LFPulse(2, [2.2, 2], e))), 22), 2.22), mul(Lag(ToggleFF(sub(c, e)), 0.1), g)), LFPulse(2, f, 0.5));
d = tanh(Splay2(add(RLPF(o, fdiv(mul(pow(g, SinOsc(fdiv(fdiv(e, 2), 2), 0)), 2222), 2), fdiv(add(SinOsc(e, 0), 2), mul(2, pi))), c)));
mrg(mul(d, 0.25), LocalOut(d))
