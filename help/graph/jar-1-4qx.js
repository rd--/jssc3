// http://sccode.org/1-4Qx (jar)
var f, g, h, s;
f = add(mul(LFPar(9.1, 0), 100), mul([2, 3, 4, 5], 100));
g = add(mul(LFPar(9, 0), 1), mul(LFPar(fdiv(1, [2, 3, 5, 7]), 0), 0.5));
h = add(mul(LFPar(0.5, 0), 0.4), 0.5);
s = mul(LFPar(f, 0), Lag(gt(g, h), 0.1));
mul(Splay2(s), 0.075)
