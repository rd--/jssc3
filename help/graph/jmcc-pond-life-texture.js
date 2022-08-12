// pond life (jmcc) #1 ; graph rewrite
OverlapTexture(function(tr) {
	return Pan2(
		SinOsc(add(mul(SinOsc(TRand(20, 50, tr), 0), TRand(100, 400, tr)), TRand(500, 2500, tr)), 0),
		TRand(-1, 1, tr),
		mul(LFPulse(fdiv(3, TRand(1, 9, tr)), 0, TRand(0.2, 0.5, tr)), 0.04)
	);
}, 8, 8, 4)
