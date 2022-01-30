// tw 0225 (f0) - http://www.fredrikolofsson.com/f0blog/?q=node/617
var b, o;
b = mul(to(1, 8), 99);
o = Blip(add(fdiv(b, 2), mul(LFSaw(fdiv(-8, b), 1), 99)), add(fdiv(b, 4), mul(LFSaw(fdiv(1, b), 1), 99)));
mul(sin(Splay2(CombC(mul(o, SinOsc(fdiv(8, b), LFSaw(fdiv(99, b), 0))), 0.2, 0.2, 1))), 0.5)
