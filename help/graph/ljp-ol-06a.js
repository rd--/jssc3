// spectral harp ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #6 ; edit
var p;
p = mul(SinOsc(1760, 0), [0.01, 0.01]);
add(p, CombC(p, 0.1, add(mul(LFNoise1(0.5), 0.1), 0.1), [-10, 10]))
