// Asr
var tr, gt, o, a;
tr = Impulse([1, 0.75], 0);
gt = Trig(tr, TRand(0.1, 0.2, tr));
o = Blip(midiCps(TRand(36, [48, 60], tr)), TRand(1, 7, tr));
a = Asr(gt, TRand(0.01, 0.2, tr), TRand(0.2, 2, tr), -4);
mul(mul(o, a), 0.1)
