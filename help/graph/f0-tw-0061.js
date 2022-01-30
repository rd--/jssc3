// https://fredrikolofsson.com/f0blog/more-sc-twitter/, f0
var t, f, m, p;
t = Saw([9, 9.01]);
f = DmdOn(t, 0, Seq(inf, [0, 0, 0, 0, 0, 0, 500]));
m = Lag(DmdOn(t, 0, Shuf(inf, mul(to(0, 7), 99))), 0.04);
p = SinOsc(m, 0);
fdiv(SinOsc(f, p), 2)
