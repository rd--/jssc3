// https://composerprogrammer.com/teaching/supercollider/sctutorial/tutorial.html 1.1 ; mouse control
var n, mk, x, y;
n = 11;
mk = function() {
	var freq, numcps, knum, gen;
	freq = Rand(50, 560.3);
	numcps = Rand(2, 20);
	knum = add(mul(SinOsc(ExpRand(0.02, 0.2), 0), fdiv(numcps, 2)), fdiv(numcps, 2));
	gen = Gendy1(IRand(0, 6), IRand(0, 6), Rand(0, 1), Rand(0, 1), freq, freq, Rand(0, 1), Rand(0, 1), numcps, knum);
	return Pan2(gen, Rand(-1, 1), fdiv(0.5, sqrt(n)));
};
x = MouseX(100, 2000, 0, 0.2);
y = MouseY(0.01, 1.0, 0, 0.2);
mul(Resonz(sum(dup(mk, n)), x, y), 0.5)
