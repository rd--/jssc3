// ADSR
var tr, gt, o, a;
tr = Impulse([0.75, 0.5], 0);
gt = Trig(tr, TRand(0.1, 0.2, tr));
o = Blip(midiCps(TRand(36, [48, 72], tr)), TRand(1, 7, tr));
a = ADSR(gt, TRand(0.01, 0.2, tr), TRand(0.3, 0.6, tr), TRand(0.4, 0.6, tr), TRand(0.5, 2, tr), -4);
mul(mul(o, a), 0.1)
