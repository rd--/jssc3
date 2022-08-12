// https://twitter.com/headcube/status/528187147543511041 (nv)
var x;
x = function(j) {
	var y, f;
	y = function(i) {
		return mul(pow(fdiv(1, 4), sub(i, 1)), abs(sub(gt(LFNoise0(fdiv(pow(0.25, sub(j, 1)), 8)), 0), LFPulse(fdiv(pow(2, sub(i, 1)), 8), 0, 0.5))));
	};
	f = mul(pow(32, sum(collect(to(1, 10), y))), 30);
	return Pan2(RLPF(Pulse(f, 0.3), mul(Lag(sqrt(f), 2), 30), 0.5), 0, 0.2);
};
mul(sum(collect(to(1, 4), x)), 0.25)
