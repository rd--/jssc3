// modal space (jmcc) #8 ; mouse control
var b, k, n, c;
b = asLocalBuf([0, 2, 3.2, 5, 7, 9, 10]);
k = DegreeToKey(b, MouseX(0, 15, 0, 0.1), 12);
n = LFNoise1([3, 3]);
c = function(r) {
	return CombN(
		add(
			mul(SinOsc(midiCps(add(add(r, k), mul(n, 0.04))), 0), 0.1),
			mul(RLPF(LFPulse(midiCps([48, 55]), 0, 0.15), midiCps(add(mul(SinOsc(0.1, 0), 10), r)), 0.1), 0.1)),
		0.31,
		0.31,
		2
	);
};
mul(sum(collect([48, 72], c)), 0.25)
