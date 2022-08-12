// pulsing bottles (jmcc) #2
var n, f;
n = 6;
f = function() {
	var a, l;
	a = fdiv(mul(LFPulse(add(4, Rand(0, 10)), 0, Rand(0, 0.7)), 0.8), n);
	l = SinOsc(add(0.1, Rand(0, 0.4)), Rand(0, mul(2, pi)));
	return Pan2(Resonz(WhiteNoise(), add(400, LinRand(0, 7000, 0)), 0.01), l, a);
};
sum(dup(f, n))
