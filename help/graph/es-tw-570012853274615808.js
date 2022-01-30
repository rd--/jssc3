// tw 570012853274615808 (es)
var t, o, a, s;
t = Dust2([9, 9]);
o = 0.1;
a = add(mul(LFNoise2(o), 9), 9);
s = mul(VarSaw(TExpRand(9, 5000, t), 0, 0.5), Decay(t, 1));
mul(GreyholeRaw(first(s), second(s), 0, a, LFNoise2(1), add(LFNoise2(1), 1), 2, a, o), 0.2)
