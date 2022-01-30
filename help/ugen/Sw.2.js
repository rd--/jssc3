// Sw ; switch
splay2(collect(to(1, 8), function(i) {  return mul(mul(SinOsc(mul(110, i), 0), ASR(Sw(i), 0.01, 0.25)), 0.1); }))