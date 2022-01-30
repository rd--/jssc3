// VarSaw ; per-note width modulation
var d, t, w0, w1, w, o;
d = LinLin(LFNoise2(0.1), -1, 1, 0.05, 0.5);
t = Impulse(fdiv(1, d), 0);
w0 = TRand(0, 0.35, t);
w1 = TRand(0.65, 1, t);
w = Phasor(t, fdiv(sub(w1, w0), SampleRate()), w0, w1, 0);
o = mul(VarSaw(midiCps(TRand(36, 72, t)), 0, w), Decay2(t, 0.1, d));
Pan2(o, TRand(-1, 1, t), 0.1)

