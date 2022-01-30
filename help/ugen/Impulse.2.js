// Impulse ; lovely bells ; https://github.com/cianoc/supercollider_fragments
var t, m, env;
t = Impulse(fdiv(1, 3), 0);
m = dup(function() {  return Rand(1, 3); }, 2);
env = fdiv(Decay2(t, mul(0.01, m), mul(1, m)), to(1, 6));
mul(Splay2(mul(SinOsc(midiCps([60, 64, 67, 71, 74, 78]), 0), env)), 0.1)
