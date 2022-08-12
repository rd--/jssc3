// sidereal time (jmcc) #9
var z;
z = OverlapTexture(function(tr) {
	var p, f, t, z;
	p = 15;
	f = TXLine(TExpRand(40, 300, tr), TExpRand(40, 300, tr), 12, tr);
	t = mul(mul(LFPulse(f, TRand(0.1, 0.9, tr), 0), 0.002), max(LFNoise2(TRand(0, 8, tr)), 0));
	z = function() {  return sum(dup(function() {  return Ringz(t, TExpRand(100, 6000, tr), TRand(2, 6, tr));}, p)); };
	return mul(dup(z, 2), 0.1);
}, 4, 4, 6);
add(CombC(z, 0.6, Rand(0.1, 0.6), 8), reverse(z))
