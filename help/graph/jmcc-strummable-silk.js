// strummable silk (jmcc) #11 ; mouse control
var x, str, s;
x = MouseX(0, 1, 0, 0.2);
str = function(ix) {
	var n, tr, env, pluck, freq, metal;
	n = 15;
	tr = abs(HPZ1(gt(x, add(0.25, mul(sub(ix, 1), 0.07)))));
	env = Decay(mul(mul(Impulse(14, 0), Lag(Trig(tr, 1), 0.2)), 0.01), 0.04);
	pluck = mul(PinkNoise(), env);
	freq = midiCps(add(nth([-2, 0, 3, 5, 7, 10, 12, 15], ix), 60));
	metal = RingzBank(pluck, collect(to(1, n), function(j) {  return mul(j, freq); }), [1], dup(function() {  return Rand(0.3, 1); }, n));
	return Pan2(metal, sub(mul(sub(ix, 1), 0.2), 0.5), 1);
};
s = LeakDC(LPF(sum(collect(to(1, 8), str)), 12000), 0.995);
timesRepeat(6, function() {  return s = AllpassC(s, 0.1, dup(function() {  return Rand(0, 0.05); }, 2), 4); });
s
