// impulse sequencer (jmcc) SC2
var t, isequ, c_sq, d_sq, n_sq, b_sq, c, d, n, b;
t = Impulse(8, 0);
isequ = function(s) {  return mul(t, DmdOn(t, 0, Seq(inf, s))); };
c_sq = (isequ)([1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0]);
d_sq = (isequ)([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]);
n_sq = (isequ)([1.0, 0.1, 0.1, 1.0, 0.1, 1.0, 0.1, 0.1]);
b_sq = (isequ)([1, 0, 0.2, 0, 0.2, 0, 0.2, 0]);
c = mul(mul(Decay2(c_sq, 0.001, 0.3), SinOsc(1700, 0)), 0.1);
d = mul(mul(Decay2(d_sq, 0.001, 0.3), SinOsc(2400, 0)), 0.04);
n = mul(mul(Decay2(n_sq, 0.001, 0.25), BrownNoise()), 0.1);
b = mul(mul(Decay2(b_sq, 0.001, 0.5), SinOsc(100, 0)), 0.2);
add(add(add(c, d), n), b)
