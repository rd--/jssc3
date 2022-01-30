// f0 ; https://twitter.com/redFrik/status/1395519538008141835
var c, d, p, o;
c = DmdFor(0.004, 0, mod(Ser(inf, 1, [1, 2]), DmdFor(8.192, 0, Seq(inf, mul(to(1, 6), 75)))));
d = HPF(MantissaMask(c, 3), 5);
p = mul([250, 200], Lag(DmdFor(4.096, 0, Seq(inf, fdiv([4, 6, 5, 5, 5, 5, 3], 4))), 0.1));
o = fdiv(mul(SinOscFB(p, max(SinOscFB(0.08, 0), 0)), max(SinOscFB(fdiv(1, [99, 60]), 0), 0)), 3);
mul(LPF(fdiv(tanh(add(fdiv(add(sin(d), mul(SinOscFB(63, max(SinOscFB(0.8, 0), 0)), d)), 9), o)), 2), 10000), 0.1)
