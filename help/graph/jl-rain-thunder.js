// rain thunder (jl) ; http://sccode.org/1-e
var n0, d0, e0, p0, n1, f1, e1, p1;
n0 = mul(PinkNoise(), add(0.08, mul(LFNoise1(0.3), 0.02)));
d0 = LPF(Dust2(LinLin(LFNoise1(0.2), -1, 1, 40, 50)), 7000);
e0 = Ln(0, 1, 10);
p0 = tanh(mul(mul(3, GVerb(HPF(add(n0, d0), 400), 250, 100, 0.25, 0.5, 15, 0.3, 0.7, 0.5, 300)), e0));
n1 = mul(PinkNoise(), pow(mul(Clip(LFNoise1(3), 0, 1), Clip(LFNoise1(2), 0, 1)), 1.8));
f1 = LinExp(LFNoise1(1), -1, 1, 100, 2500);
e1 = Ln(0, 0.7, 30);
p1 = mul(GVerb(tanh(LPF(mul(10, HPF(n1, 20)), f1)), 270, 30, 0.7, 0.5, 15, 0.5, 0.7, 0.5, 300), e1);
mul(Limiter(add(p0, p1), 1, 0.01), 0.25)
