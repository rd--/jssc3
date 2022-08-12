// police state (jmcc) #2
var node, e;
node = function() {
	var f;
	f = add(add(mul(SinOsc(Rand(0.02, 0.12), Rand(0, mul(2, pi))), Rand(0, 600)), 1000), Rand(-300, 300));
	return Pan2(mul(mul(SinOsc(f, 0), LFNoise2(add(100, Rand(-20, 20)))), 0.1), Rand(-1, 1), 1);
};
e = mul(LFNoise2(add(mul(LFNoise2([0.4, 0.4]), 90), 620)), add(mul(LFNoise2([0.3, 0.3]), 0.15), 0.18));
mul(CombL(add(sum(dup(node, 4)), e), 0.3, 0.3, 3), 0.2)
