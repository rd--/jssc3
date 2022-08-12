// tarmac ; jmcc #10 ; graph rewrite
var a;
a = [
	[1, 0, 0],
	 [1, 1, 0],
	[1, 1, 0, 0],
	[1, 1, 1, 0, 0, 0],
	[1, 1, 1, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
mul(OverlapTexture(function(tr) {
	var t, i, d, z, s, f, e;
	t = Impulse(8, 0);
	i = mul(DmdOn(t, 0, Seq(inf, TScramble(tr, TChoose(tr, a)))), t);
	d = TRand(0.05, 0.5, tr);
	z = mul(PinkNoise(), add(mul(LFNoise1(TRand(0, 3, tr)), 0.0008), 0.0022));
	s = mul(max(sum(dup(function() {  return Ringz(z, TRand(50, 4000, tr), TRand(0.2, 12, tr));}, 4)), 0), TChoose(tr, [-1, 1]));
	f = RLPF(s, add(add(mul(Decay2(t, 0.004, d), TRand(0, 5000, tr)), TRand(0, 100, tr)), 100), 0.2);
	e = Decay2(i, 0.004, d);
	return Pan2(f, LFNoise1(TRand(0, 1, tr)), e);
}, 12, 3, 6), 0.1)
