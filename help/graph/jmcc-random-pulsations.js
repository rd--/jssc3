// random pulsations (jmcc) #1 ; graph rewrite
OverlapTexture(function(tr) {
	return Pan2(
		amClip(SinOsc(TRand(0, 2000, tr), 0), SinOsc(add(8, TRand(0, 80, tr)), 0)),
		mul(SinOsc(add(0.3, TRand(0, 0.5, tr)), TRand(0, mul(2, pi), tr)), 0.7),
		0.05);
}, 5, 2, 6)
