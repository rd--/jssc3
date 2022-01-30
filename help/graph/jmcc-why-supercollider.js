// why supercollider (jmcc) #0 ; Rand UGens
var s, x;
s = sum(dup(function() { return Resonz(mul(Dust(0.2), 50), Rand(200, 3200), 0.003); }, 10));
x = sum(dup(function() { return CombL(DelayC(s, 0.048, 0.048), 0.1, add(mul(LFNoise1(Rand(0, 0.1)), 0.04), 0.05), 15); }, 7));
timesRepeat(4, function() { return x = AllpassN(x, 0.05, dup(function() { return Rand(0, 0.05); }, 2), 1); });
MulAdd(x, 0.2, s)
