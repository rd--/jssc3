// jh ; https://scsynth.org/t/auditory-illusion-with-exponentially-spaced-frequencies/4157 ; rd (edit)
var t, sinosc, k, b, n, f0, e;
t = Impulse(0.1, 0);
sinosc = function(freq) {  return sin(mul(mul(Phasor(t, fdiv(freq, SampleRate()), 0, 1, 0), 2), pi)); };
k = 160;
b = TRand(2, 2.25, t);
n = TRand(0.002, 0.02, t);
f0 = TRand(90, 180, t);
e = mul(Decay2(t, 1, 10), 0.1);
mul(Splay2(collect(to(0, k), function(i) {  return (sinosc)(mul(f0, pow(b, mul(i, n)))); })), e)
