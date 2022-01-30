// forest sounds (pj)
var insects;
insects = function() {  return mul(BPF(BrownNoise(), add(mul(SinOsc(add(mul(LFNoise2(50), 50), 50), 0), 100), 2000), 0.001), 10); };
dup(insects, 2)
