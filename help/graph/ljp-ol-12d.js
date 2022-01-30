// feedback racket ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #12d
var p;
p = dup(function() {  return mul(WhiteNoise(), 0.02); }, 2);
add(p, CombC(p, 0.1, add(mul(LFNoise1(10), 0.08), 0.08), -10000))
