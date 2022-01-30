// noise slurps ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #11
mul(SinOsc(0, BPF(mul(dup(function() {  return WhiteNoise(); }, 2), 1000), add(mul(dup(function() {  return LFNoise1(0.1); }, 2), 2000), 4000), 0.001)), 0.1)
