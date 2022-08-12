// tremulate (jmcc) ; graph rewrite
var voiceFunc;
voiceFunc = function(tr) {
	return sum(Pan2(
		SinOsc(mul(TRand(400, 900, tr), [1.0, 1.2, 1.5, 1.8]), 0),
		dup(function() {  return Rand(-1, 1); }, 4),
		max(mul(LFNoise2(dup(function() {  return TRand(60, 90, tr); }, 4)), 0.1), 0)
	));
};
CombC(OverlapTexture(voiceFunc, 2, 0.5, 2), 0.1, 0.1, 1)
