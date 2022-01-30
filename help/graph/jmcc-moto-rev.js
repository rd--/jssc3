// moto rev (jmcc) #1
var f, s;
f = add(mul(SinOsc(0.2, 0), 10), 21);
s = LFPulse(f, [0, 0.1], 0.1);
clip2(RLPF(s, 100, 0.1), 0.4)
