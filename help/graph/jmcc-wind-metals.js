// wind metals (jmcc) ; graph rewrite
var n;
n = 6;
mul(OverlapTexture(function(tr) {
    return softClip(mul(RingzBank(
        mul(mul(dup(function() {  return BrownNoise(); }, 2), 0.007), max(add(mul(LFNoise1(TExpRand(0.125, 0.5, tr)), 0.75), 0.25), 0)),
        dup(function() {  return add(TRand(0, TRand(500, 8000, tr), tr), TExpRand(60, 4000, tr)); }, n),
        [1],
        dup(function() {  return TRand(0.1, 2, tr); }, n)), 0.1));
}, 5, 2, 12), 0.1)
