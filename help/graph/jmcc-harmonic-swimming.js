// harmonic swimming (jmcc) #1
var a, l, o;
a = 0.02;
l = Ln(0, sub(0, a), 60);
o = function(h) {
	var n;
	n = add(mul(LFNoise1(add(6, dup(function() {  return Rand(-4, 4); }, 2))), a), l);
	return mul(SinOsc(mul(50, add(h, 1)), 0), max(n, 0));
};
sum(collect(to(0, 20), o))
