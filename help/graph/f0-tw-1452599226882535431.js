// https://twitter.com/redFrik/status/1452599226882535431 f0
var e, b, f, d, x, y, o;
e = LFSaw(0.1, 0);
b = fdiv([1, 2, 3, 4], 2);
f = [0, 1];
d = LinExp(LFSaw(11, f), -1, 1, sub(mul(pow(2, LFSaw(0.061, f)), 4), 1), sub(mul(pow(2, LFSaw(0.031, f)), 20), 8));
x = LFSaw(mul(roundTo(LFSaw(0.001, b), fdiv(gt(LFSaw(0.071, 0), 0), 8)), 5), 0);
y = LinExp(x, -1, 1, Latch(sub(mul(pow(2, LFSaw(0.041, f)), 120), 59), e), Latch(mul(pow(2, LFSaw(0.051, 0)), 500), e));
o = fdiv(Blip(y, d), max(d, 1));
HPF(Splay2(o), 9)
