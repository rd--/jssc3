// bowed string (jmcc)
OverlapTexture(function(tr) {
	var root, scale, oct, f0, freq, a0, amp, x, k;
	root = 5;
	scale = add([0, 2, 4, 5, 7, 9, 11], root);
	oct = [24, 36, 48, 60, 72, 84];
	f0 = midiCps(add(TChoose(tr, scale), TChoose(tr, oct)));
	freq = collect(to(1, 12), function(i) {  return mul(f0, i); });
	a0 = TRand(0.7, 0.9, tr);
	amp = dup(function() {  return a0 = mul(a0, a0); }, 12);
	x = mul(mul(dup(function() {  return BrownNoise(); }, 2), 0.007), max(add(mul(LFNoise1(TExpRand(0.125, 0.5, tr)), 0.6), 0.4), 0));
	k = RingzBank(x, freq, amp, dup(function() {  return TRand(1, 3, tr); }, 12));
	return softClip(mul(k, 0.1));
}, 5, 2, 12)
