// tw 0030 (f0) - http://www.fredrikolofsson.com/f0blog/?q=node/537
var f, w, o;
f = add(mul(LFPar(1, 0), 5), roundTo(add(mul(LFPar([0.05, 0.04], 0), 50), 160), 50));
w = add(mul(LFPar(0.2, 0), 0.5), add(mul(LFPar(3, 0), 0.2), 0.5));
o = fdiv(VarSaw(f, 0, w), 8);
mul(GVerb(o, 80, 3, 0.5, 0.5, 15, 1, 0.7, 0.5, 300), 0.1)

