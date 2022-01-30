// spe (jmcc)
var t, s, f, e, z;
t = Impulse(9, 0);
s = [0, 3, 2, 7, 8, 32, 16, 18, 0, 12, 24, 32];
f = midiCps(add(DmdOn(t, 0, Seq(inf, s)), 32));
e = mul(Decay2(t, 0.05, 1), 0.1);
z = RLPF(mul(LFSaw(f, 0), e), midiCps(add(mul(LFNoise1(1), 36), 110)), 0.1);
timesRepeat(4, function() {  return z = AllpassC(z, 0.05, dup(function() {  return Rand(0, 0.05); }, 2), 4); });
mul(z, 0.25)
