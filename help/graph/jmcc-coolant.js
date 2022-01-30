// coolant (jmcc) ; Ringz
var o, f;
o = OnePole(mul(BrownNoise(), 0.002), 0.95);
f = function() {  return mul(Ringz(o, Rand(40, 2040), 1), 0.2); };
Splay2(dup(f, 10))
