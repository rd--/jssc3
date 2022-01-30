// LFSaw ; interesting rising sounds ; https://github.com/cianoc/supercollider_fragments
var f;
f = function(c) {  return Pan2(SinOsc(add(mul(LFSaw(fdiv(add(mul(c, 0.2), 1), 3), 0), 500), 700), 0), LFNoise0(1), 0.05); };
sum(collect(to(1, 5), f))
