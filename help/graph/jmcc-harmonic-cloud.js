// https://soundcloud.com/soundaspureform/harmonic-cloud-1 jmcc ; roughguess ; size=75,584
OverlapTexture(function(tr) {
	var vc;
	vc = function() {
		var f;
		f = roundTo(TExpRand(64, 4000, tr), 64);
		return mul(LPF(Saw(add(f, dup(function() {  return TRand(-1, 1, tr); }, 2))), mul(TRand(1, 6, tr), f)), 0.04);
	};
	return Splay2(dup(vc, 48));
}, 0.4, 1, 2)
