// hard sync sawtooth with lfo (jmcc) #6 ; graph-rewrite
var txt;
txt = OverlapTexture(function(tr) {
	var f;
	f = midiCps(add(30, TRand(0, 50, tr)));
	return mul(SyncSaw([f, add(f, 0.2)], add(mul(mul(SinOsc(0.2, dup(function() {  return TRand(0, mul(2, pi), tr); }, 2)), 2), f), mul(3, f))), 0.05);
}, 4, 4, 4);
add(CombC(txt, 0.3, 0.3, 4), reverse(txt))
