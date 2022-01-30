// f0 ; https://twitter.com/redFrik/status/1395878538297892865 ; demand
var t, g, e, m, o, c;
t = Impulse(5, 0);
g = [3, 2];
e = LagUD(t, 0.001, add(SinOscFB(fdiv(g, 99), 0), 1.08));
m = concatenation(collect([24, 0, 3, 5, 7, 10, 36], function(i) {  return add(i, [36, 48, 36, 33, 60, 72]); }));
o = mul(SinOscFB(DmdOn(t, 0, fdiv(Seq(inf, midiCps(m)), g)), SinOscFB(0.02, 0)), e);
c = mul(RLPF(o, mul(add(pow(3, SinOscFB(0.04, 0)), e), 2000), fdiv(pow(3, SinOscFB(fdiv(g, 9), 0)), 3)), 4);
mul(tanh(add(fdiv(add(CombC(tanh(c), 1, fdiv(1, 2), 4), CombC(c, 1, fdiv(1, 3), 5)), 8), c)), 0.1)
