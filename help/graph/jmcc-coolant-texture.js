// coolant (jmcc) ; Ringz
var o, f;
o = OnePole(mul(BrownNoise(), 0.002), 0.95);
f = function(tr) {  return Splay2(dup(function() {  return mul(Ringz(o, TRand(40, 2040, tr), 1), 0.2); }, 10)); };
OverlapTexture(f, 6, 6, 3)
