// Blip ; nice use of blip ; https://github.com/cianoc/supercollider_fragments
var t, o, p;
t = Impulse(6, 0);
o = mul(Blip(midiCps(TRand(48, 72, t)), TRand(1, 12, t)), max(TRand(-0.5, 0.4, t), 0));
p = Pan2(o, TRand(-1.0, 1.0, t), mul(Decay2(t, 0.01, 3), 0.1));
add(p, CombC(p, 2.0, fdiv(4, 6), 6))

