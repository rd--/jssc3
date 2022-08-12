// https://swiki.hfbk-hamburg.de/MusicTechnology/899 (nv) [Line 40]
var f, x;
f = function(i) {
	return sin(RLPF(
		mul(mul(pow(0.6, i), 40), Impulse(fdiv(pow(2, i), 32), fdiv(1, 2))),
		mul(pow(4, LFNoise0(fdiv(1, 16))), 300),
		0.005
	));
};
x = Splay2(collect(to(0, 8), f));
timesRepeat(2, function() {  return x = FreeVerb2(first(x), second(x), 0.1, 1, 1); });
x
