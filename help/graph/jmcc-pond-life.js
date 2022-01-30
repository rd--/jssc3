// pond life (jmcc) #1 ; texture=overlap,8,8,4,inf
var f, o;
f = add(mul(SinOsc(Rand(20, 50), 0), Rand(100, 400)), LinRand(500, 2500, 0));
o = mul(mul(SinOsc(f, 0), LFPulse(fdiv(3, Rand(1, 9)), 0, Rand(0.2, 0.5))), 0.04);
Pan2(o, Rand(-1, 1), 1)

