// trills ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #13d
var p;
p = add([1, 2], 0.04);
Pan2(SinOsc(mul(1400, sum(Lag(roundTo(fdiv(LFTri(mul(p, 0.2), 0), p), fdiv(1, 8)), 0.002))), 0), 0, 0.2)
