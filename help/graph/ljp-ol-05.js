// hedge trimmer ; https://w2.mat.ucsb.edu/l.putnam/sc3one/index.html #5
Pan2(sum(BPF(PinkNoise(), mul(to(1, 64), add(mul(LFNoise2(4), 30), 100)), 0.01)), 0, 0.6)