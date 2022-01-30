// https://twitter.com/redFrik/status/1464534258173849611 ; f0
var b, n, f, c, x, y, z;
b = [11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
n = mul(GrayNoise(), max(SinOsc(fdiv(fdiv(1, b), 99), 0), 0));
f = mul(62.5, b);
c = mul(f, [6, 3, 7, 5, 1, 8, 4, 2, 6, 3, 7, 5, 1]);
x = mul(BBandPass(n, f, add(fdiv(add(SinOsc(0.5, 0), SinOsc(fdiv(b, 999), 0)), 99), 0.1)), add(SinOsc(fdiv(b, 666), 0), 2));
y = fdiv(mul(BBandPass(n, c, fdiv(pow(9, SinOsc(fdiv(b, 333), 0)), 99)), 666), c);
z = fdiv(mul(BBandPass(n, fdiv(c, 2), fdiv(pow(9, SinOsc(fdiv(b, 222), 0)), 99)), 888), c);
Splay2(mul(add(add(x, y), z), max(SinOsc(0.001, fdiv(b, 9)), 0)))
