// tank (jmcc)
var p, z, l1, l2, l3, l4, l5, l6;
p = function() {
	return Pan2(mul(mul(Decay2(Dust(0.2), 0.1, 0.5), 0.1), cubed(SinOsc(ExpRand(300, 2200), 0))), Rand(-1, 1), 1);
};
z = add(sum(dup(p, 12)), Pan2(mul(Decay2(Dust(0.01), 0.04, 0.3), BrownNoise()), 0, 1));
l1 = OnePole(mul(LocalIn(2, 0), 0.98), 0.33);
l2 = Rotate2(first(l1), second(l1), 0.23);
l3 = AllpassC(l2, 0.05, dup(function() {  return Rand(0.01, 0.05); }, 2), 2);
l4 = DelayC(l3, 0.3, [0.17, 0.23]);
l5 = AllpassC(l4, 0.05, dup(function() {  return Rand(0.03, 0.15); }, 2), 2);
l6 = 0;
timesRepeat(4, function() {  return z = AllpassC(z, 0.03, dup(function() {  return Rand(0.005, 0.02); }, 2), 1); });
l6 = add(LeakDC(l5, 0.995), z);
mrg(l6, LocalOut(l6))
