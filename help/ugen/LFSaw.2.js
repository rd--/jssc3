// LFSaw ; as an lfo ; https://github.com/cianoc/supercollider_fragments
var lfo;
lfo = add(mul(LFSaw(2, 0), -100), 600);
mul(SinOsc(lfo, 0), 0.1)

