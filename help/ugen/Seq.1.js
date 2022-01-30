// Seq
var tr, n0, n1;
tr = Impulse(6, 0);
n0 = DmdOn(tr, 0, Seq(inf, [60, 62, 63, 58, 48, 55]));
n1 = DmdOn(tr, 0, Seq(inf, [63, 60, 48, 62, 55, 58]));
mul(LFSaw(midiCps([n0, n1]), 0), 0.05)
