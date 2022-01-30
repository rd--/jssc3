// SinOsc ; random sine waves ; https://github.com/cianoc/supercollider_fragments
var f;
f = function() {  return Pan2(SinOsc(add(mul(SinOsc(fdiv(1, 10), Rand(0, 6)), 200), 600), 0), Rand(0, 1), 0.05); };
Splay2(dup(f, 15))
