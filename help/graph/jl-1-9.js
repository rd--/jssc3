// http://sccode.org/1-9 (jl)
var n, a, f;
n = 956;
a = mul(HPF(mul(PinkNoise(), 0.005), 10), Ln(0, 1, 9));
f = function(i) {  return Ringz(mul(a, LFNoise1(add(0.05, Rand(0, 0.1)))), add(mul(55, add(i, n)), 60), 0.2); };
tanh(GVerb(sum(collect(to(1, 99), f)), 70, 990, 0.5, 0.5, 15, 1, 0.7, 0.5, 300))

