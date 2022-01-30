// nv https://swiki.hfbk-hamburg.de/MusicTechnology/899
var s, f, a;
s = add(mul(LocalIn(2, 0), 7.5), mul(Saw([32, 33]), 0.2));
f = mul(pow(2, Lag(mul(LFNoise0(fdiv(4, 3)), 4), 0.1)), 300);
a = CombC(distort(BPF(s, f, 0.1)), 2, 2, 40);
mrg(mul(a, 0.35), LocalOut(a))
