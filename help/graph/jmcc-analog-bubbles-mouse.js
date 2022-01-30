// analog bubbles (jmcc) #3 ; mouse control
var o1, o2, o3;
o1 = add(mul(LFSaw(MouseX(2, 40, 1, 0.2), 0), -3), 80);
o2 = add(mul(LFSaw(MouseY(0.1, 10, 1, 0.2), 0), 24), o1);
o3 = mul(SinOsc(midiCps(o2), 0), 0.04);
Pan2(CombC(o3, 0.2, 0.2, 2), 0, 1)
