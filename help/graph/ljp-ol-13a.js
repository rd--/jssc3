// trills ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #13a
var p;
p = [1, 3, 5];
Pan2(SinOsc(mul(800, sum(roundTo(fdiv(SinOsc(mul(p, 0.1), 0), p), fdiv(1, 6)))), 0), 0, 0.2)
