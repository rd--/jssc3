// jmcc - ostinoodles
var z;
z = OverlapTexture(function(tr) {
	var root, major, offset, sequence, f, trig, freq, sig;
	root = add(81, TRand(-6, 6, tr));
	major = asLocalBuf([0, 2, 4, 5, 7, 9, 11]);
	offset = TRand(-16, 16, tr);
	sequence = add(DegreeToKey(major, TScramble(tr, add([0, 1, 2, 3], offset)), 12), root);
	f = TXLine(TExpRand(4.0, 24.0, tr), TExpRand(4.0, 24.0, tr), 12, tr);
	trig = Impulse(f, 0);
	freq = DmdOn(trig, 0, Seq(inf, midiCps(sequence)));
	sig = mul(mul(LFTri(kr(freq), 0), kr(Decay2(trig, 0.004, 0.3))), 0.1);
	return Pan2(sig, TRand(-1, 1, tr), 1);
}, 6, 3, 6);
timesRepeat(6, function() {  return z = AllpassN(z, 0.04, dup(function() {  return Rand(0, 0.04); }, 2), 16); });
z
