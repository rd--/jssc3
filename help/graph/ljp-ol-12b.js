// feedback racket ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #12b
var p;
p = mul(Saw(add(440, [0, 0.2])), 0.02);
add(p, CombC(p, 0.1, add(mul(LFNoise1(10), 0.08), 0.08), -10000))
