// aleatoric quartet (jmcc) #7 ; mouse control
var amp, density, dmul, dadd, mkSig, g;
amp = 0.07;
density = MouseX(0.01, 1, 0, 0.1);
dmul = mul(mul(reciprocal(density), 0.5), amp);
dadd = sub(amp, dmul);
mkSig = function(ix) {
	var x, n0, freq;
	x = mul(PinkNoise(), max(add(mul(LFNoise1(8), dmul), dadd), 0));
	n0 = LFNoise0(Select(IRand(0, 2), [1, 0.5, 0.25]));
	freq = midiCps(Lag(rounded(add(add(mul(n0, 7), 66), Rand(-30, 30))), 0.2));
	return Pan2(CombC(x, 0.02, reciprocal(freq), 3), Rand(-1, 1), 1);
};
g = sum(collect(to(1, 4), mkSig));
timesRepeat(5, function() {  return g = AllpassC(g, 0.05, dup(function() {  return Rand(0, 0.05); }, 2), 1); });
LeakDC(g, 0.995)
