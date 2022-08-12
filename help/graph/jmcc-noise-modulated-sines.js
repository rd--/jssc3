// noise modulated sines (jmcc) #6 ; graph rewrite
var z;
z = OverlapTexture(function(tr) {
	var f;
	f = midiCps(TRand(60, 100, tr));
	return mul(mul(SinOsc([f, add(f, 0.2)], 0), LFNoise2(mul(f, [0.15, 0.16]))), 0.05);
}, 4, 4, 4);
add(CombC(z, 0.3, 0.3, 4), reverse(z))
