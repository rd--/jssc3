// modal space (jmcc) #8 ; mouse control
var b, k, n, r, o, t, f, d, m;
b = asLocalBuf([0, 2, 3.2, 5, 7, 9, 10]);
k = DegreeToKey(b, MouseX(0, 15, 0, 0.1), 12);
n = LFNoise1([3, 3]);
r = 48;
o = mul(SinOsc(midiCps(add(add(r, k), mul(n, 0.04))), 0), 0.1);
t = LFPulse(midiCps([48, 55]), 0, 0.15);
f = midiCps(add(mul(SinOsc(0.1, 0), 10), r));
d = mul(RLPF(t, f, 0.1), 0.1);
m = add(o, d);
mul(add(CombC(m, 0.31, 0.31, 2), m), 0.25)
