// trills ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #13c
var p;
p = [0.5, 1, 2];
Pan2(SinOsc(mul(1000, sum(Lag(roundTo(fdiv(LFSaw(mul(p, 0.4), 0), p), fdiv(1, 8)), 0.002))), 0), 0, 0.2)
