// https://twitter.com/redFrik/status/1254441448327479299
var b, e, c, d, m, l, j, f, o;
b = [1, 3, 5, 8, 10];
e = [3, fdiv(2, 3), 4, fdiv(3, 2), 2];
c = 0.021;
d = mod(LFTri(fdiv(b, 999), 0), 1);
m = LFTri(mul(b, c), 0);
l = add(add(mul(m, 7), 20), Seq(inf, mod(b, add(mul(m, 5), 6))));
j = DmdFor(fdiv(e, pow(12, m)), 0, l);
f = midiCps(DegreeToKey(asLocalBuf(b), j, 12));
o = mul(mul(SinOscFB(f, fdiv(add(LFTri(fdiv(c, b), 0), 1), 3)), Decay2(Impulse([fdiv(2, 3), 1.5, 3, 1.5, 3], 0), c, d)), d);
FreeVerb(Splay2(o), 0.1, 1, 0.5)
