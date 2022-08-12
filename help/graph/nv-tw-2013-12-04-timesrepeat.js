// https://twitter.com/headcube/status/408145586970324992 (nv)
var i, a, p, x, o;
i = 1;
s = 0;
timesRepeat(9, function() {
	a = Saw(fdiv(add(fdiv(1, i), 1), 6));
	p = Pluck(a, a, 1, fdiv(fdiv(fdiv(1, i), sub(3, LFPulse(fdiv(1, i), 0, 0.5))), 30), 9, fdiv(0.9, i));
	x = mul(pow(0.5, i), p);
	o = add(SinOsc(2, 0), [4, 9]);
	s = sub(add(s, CombC(x, 1, mul(o, 0.001), 0)), x);
	return i = add(i, 1);
});
fdiv(fdiv(s, 9), 9)
