// LFNoise1 ; angry birds ; https://github.com/cianoc/supercollider_fragments
var lfo;
lfo = add(mul(LFNoise1([28, 27]), 400), 2000);
mul(SinOsc(lfo, 0), 0.1)
