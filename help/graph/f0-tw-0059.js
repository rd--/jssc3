// https://fredrikolofsson.com/f0blog/more-sc-twitter/ f0
var o;
o = fdiv(SinOsc(add(mul(Saw(3), 128), 128), sin(mul(Saw([3, 4]), add(mul(LFTri(add(mul(LFTri(0.1, 0), 8), 12), 0), 32), 128)))), 4);
CombC(o, 1, fdiv(1, 6), add(LFTri(fdiv(1, 32), 0), 1))
