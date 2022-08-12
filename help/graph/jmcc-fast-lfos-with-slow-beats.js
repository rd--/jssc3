// fast lfos with slow beats (jmcc)
mul(OverlapTexture(function(tr) {
	var a0, a1, a, b, c;
	a0 = TRand(40, 240, tr);
	a1 = add(a0, TRand(-1, 1, tr));
	a = [a0, a1];
	b = TRand(0, 2000, tr);
	c = add(a, dup(function() {  return TRand(-1, 1, tr); }, 2));
	return mul(SinOsc(add(mul(mul(SinOsc(a, 0), TRand(0, 1, tr)), b), b), 0), add(mul(SinOsc(c, 0), 0.05), 0.05));
}, 8, 4, 4), 0.25)
