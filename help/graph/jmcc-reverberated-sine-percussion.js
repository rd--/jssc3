// reverberated sine percussion (jmcc) #3
var d, s, z, y, x;
d = 5;
s = sum(dup(function() {  return Resonz(mul(Dust(fdiv(2, d)), 50), add(200, Rand(0, 3000)), 0.003); }, d));
z = DelayC(s, 0.048, 0.048);
y = CombC(z, 0.1, add(mul(LFNoise1(dup(function() {  return Rand(0, 0.1); }, 5)), 0.04), 0.05), 15);
x = sum(y);
timesRepeat(4, function() {  return x = AllpassC(x, 0.05, dup(function() {  return Rand(0, 0.05); }, 2), 1); });
add(s, mul(0.2, x))
