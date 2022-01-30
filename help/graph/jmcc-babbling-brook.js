// babbling brook (jmcc) #SC3
var p, q;
p = mul(RHPF(OnePole(BrownNoise(), 0.99), add(mul(LPF(BrownNoise(), 14), 400), 500), 0.03), 0.06);
q = mul(RHPF(OnePole(BrownNoise(), 0.99), add(mul(LPF(BrownNoise(), 20), 800), 1000), 0.01), 0.1);
add(p, q)
