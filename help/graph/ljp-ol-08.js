// blizzard ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #8
var f;
f = dup(function() {  return 0.2; }, 8);
Pan2(BPF(mul(PinkNoise(), 0.2), add(mul(LFNoise1(f), 1000), 1040), add(mul(LFNoise1(f), 0.3), 0.31)), 0, 1)
