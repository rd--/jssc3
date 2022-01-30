// TRand
var t, e;
t = mul(Impulse(7, 0), SinOsc(331, 0));
e = Decay2(t, dup(function() {  return TRand(0.01, 0.05, t); }, 2), dup(function() {  return TRand(0.05, 0.15, t); }, 2));
mul(RLPF(LFSaw(TRand(321, 333, t), 0), midiCps(add(mul(LFNoise1(2), 4), 100)), 1), e)
