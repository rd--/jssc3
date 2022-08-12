// https://twitter.com/thormagnusson/status/463992770596577280 (tm)
var k, f;
k = choose(to(9, 28));
f = function(x) {
	var e;
	e = fdiv(mul(LFNoise2(0.5), Ln(0, 0.1, Rand(0, 99))), mul(x, 0.2));
	return mul(SinOsc(add(mul(30, x), LinLin(LFNoise2(0.1), -1, 1, -2, 2)), 0), e);
};
dup(function() {  return sum(collect(to(1, k), f));}, 2)
