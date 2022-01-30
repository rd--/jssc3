// pkt 00 (f0)
var f0, ph0, a0, i, w, s;
f0 = add([100, 200, 300], SinOsc([0.11, 0.22, 0.33], 0));
ph0 = mul(mul(SinOsc([0.1, 0.2, 0.3], 0), 2), pi);
a0 = add(mul(SinOsc([0.01, 0.02, 0.03], 0), 0.05), 0.1);
i = mul(SinOsc(f0, ph0), a0);
w = add(SinOsc(add(mul(SinOsc(add(mul(SinOsc(0.13, 0), 5), 6), 0), 8), 50), 0), 1);
s = Splay(i, w, 0.7, mul(SinOsc(1.2, 0), 0.6), true);
sum(GVerb(s, 20, 5, 1, 0.5, 25, 0, 1, 1, 300))

