// pentatonic pipes (jmcc)  ; mouse control, mousex on right half of screen causes pulsation
var n, mode, root, z;
n = 5;
mode = asLocalBuf([0, 3, 5, 7, 10]);
root = Rand(12, 48);
z = OverlapTexture(function(tr) {
	return Pan2(
		distort(mul(Resonz(mul(PinkNoise(), 20), midiCps(add(DegreeToKey(mode, TRand(0, 20, tr), 12), root)), 0.002), 4)),
		TRand(-1, 1, tr),
		0.2);
}, 10, 0.1, n);
z = mul(z, Select2(gt(MouseX(0, 1, 0, 0.2), 0.5), max(SinOsc(5, 0), 0), 1));
add(CombC(z, 0.3, 0.3, 8), reverse(z))
