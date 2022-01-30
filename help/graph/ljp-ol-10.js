// sine slurps ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #10
mul(SinOsc(0, BPF(mul(dup(function() {  return Dust(10); }, 2), 20000), add(mul(dup(function() {  return LFNoise1(10); }, 2), 4000), 4000), 0.1)), 0.2)
