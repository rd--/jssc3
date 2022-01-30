// feedback racket ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #12c
var p;
p = dup(function() {  return mul(PinkNoise(), 0.03); }, 2);
add(p, CombC(p, 0.2, add(mul(LFNoise0(1), 0.2), 0.2), -10000))
