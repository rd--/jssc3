// wind metals (jmcc) ; graph rewrite
mul(OverlapTexture(function(tr) {
	var n, exc, f, dt, s;
	n = 6;
	exc = mul(mul(dup(function() {  return BrownNoise(); }, 2), 0.007), max(add(mul(LFNoise1(TExpRand(0.125, 0.5, tr)), 0.75), 0.25), 0));
	f = dup(function() {  return add(TRand(0, TRand(500, 8000, tr), tr), TExpRand(60, 4000, tr)); }, n);
	dt = dup(function() {  return TRand(0.1, 2, tr); }, n);
	s = mul(RingzBank(exc, f, [1], dt), 0.1);
	return softClip(s);
}, 5, 2, 12), 0.1)
