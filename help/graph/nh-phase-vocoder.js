// phase vocoder (nh) ; https://scsynth.org/t/old-school-vocoders/5198/6 ; warning: AudioIn ; mouse control
var src, userTr, freq, numBands, bandFreqs, voicedCarrier, isVoiced, carrier, filterQ, srcAmp, snd;
src = AudioIn([1]);
userTr = MouseButton(0, 1, 0.2);
freq = midiCps(dup(function() {  return TChoose(add(userTr, kr(Dust(0.5))), add(60, [-9, -7, -5, -3, -2, 0, 2, 3, 5, 7, 9, 10])); }, 3));
numBands = 32;
bandFreqs = LinExp(to(0, sub(numBands, 1)), 0, sub(numBands, 1), 100, 8000);
voicedCarrier = Saw(freq);
isVoiced = Lag(gt(Lag(cpsMidi(ZeroCrossing(src)), 0.05), cpsMidi(5000)), 0.05);
carrier = SelectX(isVoiced, [voicedCarrier, PinkNoise()]);
filterQ = TRand(10, 100, Dust(0.5));
srcAmp = Amplitude(BPF(src, bandFreqs, fdiv(1, filterQ)), 0.01, 0.05);
snd = mul(BPF(carrier, bandFreqs, 0.05), srcAmp);
Pan2(sum(snd), 0, fdiv(numBands, 8))
