// https://twitter.com/redFrik/status/1125557217086857216
var scl, b, m, o, s;
scl = [0, 2.94, 4.98, 7.02, 9.96];
b = fdiv(mul(add(to(-7, 6), 0.7), 2), 666);
m = add(DegreeToKey(asLocalBuf(scl), mod(add(mul(mul(LFTri(b, b), LFTri(b, 0)), 9), 9), 32), 12), 24);
o = mul(mul(mul(mul(VarSaw(midiCps(m), 0, fdiv(add(LFTri(b, 0), 1), 2)), AmpComp(m, 440, fdiv(1, 3))), LFTri(b, b)), b), 9);
s = RLPF(o, mul(Lag2(m, mod(fdiv(1, b), 1)), 3), 1);
tanh(Splay2(AllpassC(s, 0.3, sub(0.2, b), 3)))
