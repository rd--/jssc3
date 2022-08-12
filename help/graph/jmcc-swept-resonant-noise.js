// swept resonant noise (jmcc) #2 ; graph rewrite
mul(OverlapTexture(function(tr) {
	var p, n, m, sweep;
	p = 10;
	n = mul(WhiteNoise(), 0.007);
	m = add(mul(SinOsc(add(0.1, TRand(0, 0.2, tr)), 0), add(12, TRand(0, 12, tr))), add(60, TRand(-24, 24, tr)));
	sweep = Resonz(n, midiCps(m), 0.1);
	return dup(function() {
		return RingzBank(
			sweep,
			dup(function() {  return add(80, TRand(0, 10000, tr)); }, p),
			[1],
			dup(function() {  return add(0.5, TRand(0, 2, tr)); }, p)
		);
	}, 2);
}, 4, 4, 5), 0.25)
