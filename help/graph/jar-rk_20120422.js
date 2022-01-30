// rukano; apr 22, 2012; re: epic pads ; mouse control
var freq, gen, fmod, rqmod, snd;
freq = dup(function() {  return mul(midiCps(choose([60, 64, 65, 67])), add(mul(LFNoise2(1), 0.01), 1)); }, 24);
gen = mul(LFSaw(freq, 0), 0.1);
fmod = LinLin(LFCub(fdiv(1, 12), 0), -1, 1, 1, MouseX(2, 16, 0, 0.2));
rqmod = LinLin(LFNoise2(fdiv(1, 8)), -1, 1, 0.1, 1.0);
snd = RLPF(gen, mul(freq, fmod), rqmod);
Splay2(snd)
