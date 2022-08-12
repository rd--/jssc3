// alien froggies (jmcc) #1
OverlapTexture(function(tr) {
	var rate, r;
	rate = 11;
	r = Fold(mul(rate, exp(TRand(-0.2, [0.1, 0.2], tr))), 1, 30);
	return mul(Formant(r, TExpRand([200, 300], 3000, tr), add(mul(TRand([0, 1], 9, tr), r), r)), 0.05);
}, 0.5, 0.25, 5)

