// fey emissions ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #9
var d;
d = dup(function() {  return Dust(2); }, 2);
CombC(mul(BPF(d, add(mul(LFNoise0(10), 3000), 3040), 0.001), 200), 0.2, 0.2, 5)
