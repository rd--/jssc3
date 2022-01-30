// analog bubbles (jmcc) #1
var o, f, s;
o = add(mul(LFSaw([8, 7.23], 0), 3), 80);
f = add(mul(LFSaw(0.4, 0), 24), o);
s = mul(SinOsc(midiCps(f), 0), 0.04);
mul(CombC(s, 0.2, 0.2, 4), 0.1)
