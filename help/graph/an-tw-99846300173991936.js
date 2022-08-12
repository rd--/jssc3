// https://twitter.com/alln4tural/status/99846300173991936 ; graph rewrite ; size=156,028
OverlapTexture(function(tr) {
	var h;
	h = mul(midiCps(TChoose(tr, [33, 38, 40])), pow(2, TChoose(tr, to(0, 4))));
	return Splay2(dup(function() {
		return mul(SinOsc(TExpRand(sub(h, fdiv(h, 64)), add(h, fdiv(h, 64)), tr), 0), 0.025);
	}, 8));
}, 1, 9, 40)
