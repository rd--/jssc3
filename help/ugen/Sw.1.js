// Sw ; switch controller
splay2(collect(to(1, 8), function(i) {  return mul(mul(mul(SinOsc(mul(110, i), 0), Sw(i)), SinOsc(0.05, fdiv(mul(i, pi(Float)), 4))), 0.1); }))