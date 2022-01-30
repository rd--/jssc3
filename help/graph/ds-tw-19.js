// sc-140 ; 19 ; MCLD
var a, k, f;
a = [0.02, 0.1, 1, 2, 3, 4];
k = sum(LFPar(add(a, 0.5), 0));
f = Latch(k, Impulse(a, 0));
Splay2(fdiv(SinOsc(add(mul(f, 100), 300), 0), 5))
