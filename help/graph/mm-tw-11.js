// sc-140 ; #11 ; Micromoog
var f0, f1;
f0 = [[1, 2, 3, 4], [1, 2, 3, 4]];
f1 = add(mul(Hasher(Latch(SinOsc(f0, 0), Impulse([fdiv(5, 2), 5], 0))), 300), 300);
fdiv(mul(VarSaw(roundTo(f1, 60), 0, 0.5), add(mul(LFNoise2(2), fdiv(1, 3)), 0.5)), 5)

