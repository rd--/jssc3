// dark sea horns (jl)
var x, a;
x = LocalIn(2, 0);
a = tanh(mul(mul(SinOsc(65, mul(mul(x, LFNoise1(0.1)), 3)), LFNoise1(3)), 6));
timesRepeat(9, function() {  return a = AllpassL(a, 0.3, dup(function() {  return add(Rand(0, 0.2), 0.1); }, 2), 5);
});
a = tanh(a);
mrg(mul(a, 0.1), LocalOut(a))
