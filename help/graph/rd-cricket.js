// cricket (rd) ; texture
OverlapTexture(function(tr) {
	var e, f, r4;
	e = Decay2(Impulse(dup(function() {  return TRand(10, 13, tr); }, 2), 0), TRand(0.001, 0.01, tr), TRand(0.005, 0.02, tr));
	f = mul(mul(SinOsc(dup(function() {  return TRand(10, 13, tr);}, 2), 0), e), dup(function() {  return TRand(4, 7, tr); }, 2));
	r4 = dup(function() {  return TRand(2220, 2227, Impulse(0.7, 0)); }, 2);
	return mul(mul(SinOsc(r4, 0), f), 0.15);
}, 2, 4, 2)
