// <https://twitter.com/redFrik/status/1452318302768963589> ; f0
var b, m, c, t, f, h, a, z, o;
b = fdiv(mul(mul(2, pi), [4, 3, 1, 2, 5]), 5);
m = mul(pow(2, SinOsc(fdiv(1, 50), b)), 99);
c = roundTo(m, 50);
t = add(fdiv(b, mul(2, pi)), max(SinOsc(fdiv(b, 50), pow(SinOsc(max(SinOsc(fdiv(1, 99), pi), 0), 0), mul(2, pi))), 0));
f = add(fdiv(SinOsc(fdiv(b, 9), b), 3), c);
h = CombC(fdiv(c, 50), 2, t, 5);
a = add(mul(fdiv(50, m), max(SinOsc(fdiv(b, 50), 0), 0)), 0.5);
z = mul(Blip(f, h), a);
o = tanh(HPF(mul(Splay2(z), 1.5), 15));
fdiv(add(o, GVerb(mul(fdiv(sum(o), 2), Ln(0, 1, 1)), 50, 3, 0.5, 0.5, 15, 1, 0.7, 0.5, 300)), 5)
