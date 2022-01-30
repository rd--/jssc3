// feedback racket ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #12e
var p;
p = dup(function() {  return mul(Dust2(200), 0.2); }, 2);
add(p, CombC(p, 0.4, add(mul(LFNoise0(2), 0.4), 0.4), -10000))
