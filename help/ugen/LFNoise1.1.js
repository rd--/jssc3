// LFNoise1 ; wandering sines ; https://github.com/cianoc/supercollider_fragments
var o, d;
o = mul(SinOsc(abs(add(mul(LFNoise1(0.5), 600), add(mul(LFSaw(1.5, 0), 50), 500))), 0), 0.1);
d = CombC(o, 3.0, [1.35, 0.7], 6);
add(Pan2(o, 0, 1), d)

