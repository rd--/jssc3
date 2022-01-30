// f0 ; https://twitter.com/redFrik/status/1395040511795372038
var b, c, f, o, p, q;
b = [2, 6, 3, 1];
c = 500;
f = DmdFor(b, SinOscFB(fdiv(b, 9), 0), Seq(inf, midiCps(add(mul(add(rounded(SinOscFB(fdiv(b, 24), 0)), to(0, 9)), 7), 29.17))));
o = SinOscFB(f, mul(fdiv(max(SinOscFB(fdiv(b, 13), 0), 0), 3), 2));
p = AllpassC(fdiv(o, 8), 1, 0.51, 8);
q = BPF(fdiv(mul(Hasher(max(SinOscFB(fdiv(b, 12), 0), 0)), max(SinOscFB(fdiv(b, c), 0), 0)), c), mul(pow(2, SinOscFB(mul(fdiv(b, c), 2), 0)), 1000), fdiv(1, 99));
mul(sum(transpose(sum(clump(HPF(add(p, GVerb(q, 99, 9, 0.2, 0.5, 15, 1, 0.7, 0.5, 300)), 50), 2)))), 0.2)
