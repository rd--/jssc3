// SinOsc ; random sine waves ; https://github.com/cianoc/supercollider_fragments
var f;
f = function() {  return sc.Pan2(sc.SinOsc(sc.add(sc.mul(sc.SinOsc(sc.fdiv(1, 10), sc.Rand(0, 6)), 200), 600), 0), sc.Rand(0, 1), 0.05); };
sc.Splay2(sc.dup(f, 15))
