// tw 02 (tw) tim walters
var nd;
nd = function(k) {
	var x, y, i, u;
	x = function(p) {
		var f, m, j;
		f = nth(p, 1);
		m = nth(p, 2);
		j = nth(p, 3);
		return fdiv(mul(SinOsc(add(f, mul(mul(m, 4), j)), m), LFNoise1(mul(fdiv(add(j, 1), f), 4))), 2);
	};
	y = (x)([0.1, 0, 8]);
	i = 1;
	u = timesRepeat(9, function() {  y = (x)([mul(mul(i, k), [4, 8]), y, i]); return i = add(i, 1); });
	return y;
};
fdiv(sum(collect(to(1, 8), nd)), 4)
