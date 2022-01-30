// f0 https://twitter.com/redFrik/status/1254441448327479299 ; rd (edit)
var b, e, c, d, m, l, j, k, o;
b = [1, 3, 5, 8, 10];
e = [3, fdiv(2, 3), 4, fdiv(3, 2), 2];
c = 0.021;
d = mod(LFTri(fdiv(b, 999), 0), 1);
m = LFTri(mul(b, c), 0);
l = add(add(mul(m, 7), 20), Seq(inf, add(mul(mod(b, m), 5), 6)));
j = DmdFor(fdiv(e, pow(12, m)), 0, l);
k = DegreeToKey(asLocalBuf(b), j, 12);
o = SinOscFB(midiCps(k), mul(LFTri(fdiv(add(fdiv(c, b), 1), 3), Decay2(Impulse([fdiv(2, 3), 1.5, 3, 1.5, 3], 0), c, d)), d));
mul(FreeVerb(Splay2(o), 0.1, 1, 0.5), 0.25)
