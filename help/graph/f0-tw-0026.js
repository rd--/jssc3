// http://www.fredrikolofsson.com/f0blog/?q=node/537 ; graph rewrite (rd)
var n1, n2, n, b, t, m, e;
n1 = [0, 0, 0, 0, 0, 0, 0, 3, 4, 6, 4, 0, 3, 2, 0, 0, 0, 0, 1, 6, 0, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 3];
n2 = [1, 1, 2, 0, 0, 3, 3, 0, 0, 3, 4, 0, 1, 3, 0, 0, 0, 0, 1, 0, 1, 7, 0, 0, 5, 6, 3, 0, 4, 0, 9, 0];
n = append(n1, n2);
b = asLocalBuf([0, 2, 4, 5, 7, 9, 11]);
t = Impulse(4, 0);
m = DegreeToKey(b, DmdOn(t, 0, Seq(inf, n)), 12);
e = Decay2(t, TRand(0.05, 0.15, t), TRand(0.15, 0.5, t));
dup(function() {
	return mul(CombC(fdiv(tanh(mul(mul(Blip(midiCps(add(add(48, m), TRand(0, 0.05, t))), TRand(1, 7, t)), e), 8)), 8), 1, 1, 8), TRand(0.05, 0.15, t));
}, 2)
