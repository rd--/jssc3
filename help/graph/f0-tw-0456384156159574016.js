// https://twitter.com/redFrik/status/456384156159574016
var a, s, f;
a = fdiv(1, [3, 12, 4, 1, 6, 2]);
s = mul(Lag3(SinOsc(a, 0), abs(SinOsc(pow(2.67, a), 0))), 99);
f = fdiv(add(mul(gt(SinOsc(fdiv(fdiv(1, a), 9), a), 0), 20), 99), a);
mul(Splay2(SinOsc(HPF(Ringz(s, f, 1), 440), 0)), 0.25)
