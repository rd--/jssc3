// strummable metals ; use mouse to strum strings ; jmcc ; mouse control
var x, strFunc;
x = MouseX(0, 1, 0, 0.2);
strFunc = function(i) {
	var trigger, pluck, n;
	trigger = abs(HPZ1(gt(x, add(0.25, mul(i, 0.07)))));
	pluck = mul(mul(PinkNoise(), Decay(trigger, 0.05)), 0.04);
	n = 15;
	return Pan2(
		RingzBank(
			pluck,
			dup(function() {  return add(mul(300, i), LinRand(0, 8000, 0)); }, n),
			[1],
			dup(function() {  return Rand(1, 4); }, n)),
		sub(mul(i, 0.2), 0.5),
		1);
};
LeakDC(LPF(sum(collect(to(1, 8), strFunc)), 12000), 0.995)
