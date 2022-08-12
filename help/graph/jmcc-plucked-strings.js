// plucked strings (jmcc)
var strFunc;
strFunc = function() {
	var l = [
		mul(Impulse(Rand(2, 2.2), 0), 0.3),
		mul(Dust(0.5), 0.3),
		mul(Impulse(add(mul(SinOsc(Rand(0.05, 0.15), Rand(0, mul(pi, 2))), 5), 5.2), 0), 0.3)
	];
	var s = mul(mul(Decay(choose(l), 0.1), PinkNoise()), 0.1);
	return Pan2(CombC(s, 0.01, fdiv(1, midiCps(floor(Rand(60, 90)))), 4), Rand(-1, 1), 1);
};
sum(dup(strFunc, 5))
