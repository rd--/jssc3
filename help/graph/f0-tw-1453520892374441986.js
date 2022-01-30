// <https://twitter.com/redFrik/status/1453520892374441986> ; f0
var b, c, t, x, f, y, h, o;
b = fdiv([1, 2, 3], 3);
c = mul(mul(2, pi), b);
t = SinOsc(10, mul(pi, b));
x = add(mul(fdiv(add(mul(gt(SinOsc(b, 0), 0), SinOsc(mul(b, 50), 0)), 1), 2), add(pow(300, SinOsc(fdiv(1, 32), c)), 99)), add(mul(rounded(SinOsc(fdiv(1, 256), c)), 50), 99));
f = Latch(x, mod(t, SinOsc(pow(99, SinOsc(fdiv(1, 64), 0)), 0)));
y = mul(fdiv(add(SinOsc(add(mul(SinOsc(fdiv(1, 16), 0), 3), 12), 0), 1), 2), add(mul(SinOsc(fdiv(1, 8), c), 50), 51));
h = Latch(y, mul(t, SinOsc(fdiv(1, 4), 0)));
o = fdiv(Splay2(Blip(f, h)), 3);
add(o, GVerb(fdiv(fdiv(sum(o), 3), 3), 30, 3, 0.5, 0.5, 15, 1, 0.7, 0.5, 300))
