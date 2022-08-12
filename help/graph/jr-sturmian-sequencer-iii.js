// sturmian sequencer iii (jrhb) ; mouse control
var rules, rewrite, n, strFunc;
rules = [[0, 1], [0]];
rewrite = function(n) {
	var r, u;
	r = [0];
	u = timesRepeat(n, function() {  return r = concatenation(collect(r, function(e) {  return nth(rules, add(e, 1)); })); });
	return r;
};
n = 9;
strFunc = function(i) {
	var str, dt;
	str = (rewrite)(add(i, 6));
	dt = mul(fdiv(fdiv(1, SampleRate()), add(sub(n, i), 2)), MouseX(1, SampleRate(), 2, 0.2));
	return TDmdFor(dt, 0, Seq(inf, sub(str, 0.5)));
};
mul(Splay2(collect(to(0, sub(n, 1)), strFunc)), 0.3)
