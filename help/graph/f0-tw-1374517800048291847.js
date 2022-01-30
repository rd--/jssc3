// f0 ; https://twitter.com/redFrik/status/1374517800048291847
var b, f0, w0, f1, f2, w1, m1, o2;
b = to(1, 9);
f0 = add(mul(Lag(roundTo(VarSaw(0.003, fdiv(b, 9), 0.5), fdiv(1, 3)), 1.9), 91), 252);
w0 = mod(VarSaw(fdiv(fdiv(b, 9), 99), 0, 0.5), 1);
f1 = add(mul(63, b), VarSaw(0.49, fdiv(b, 9), 0.5));
f2 = mul(add(fdiv(VarSaw(fdiv(fdiv(b, 9), 9), 0, fdiv(b, 10)), 99), f0), b);
w1 = fdiv(add(VarSaw(f2, 0, fdiv(b, 9)), 1), 2);
m1 = max(VarSaw(6, fdiv(fdiv(b, 9), 3), 0), add(fdiv(VarSaw(0.2, fdiv(b, 9), 0.5), 9), add(mul(VarSaw(0.009, 0, 0.5), 0.3), 0.4)));
o2 = add(mul(VarSaw(f1, 0, w1), m1), pow(mul(VarSaw(60, 0, 0.5), max(VarSaw(3, 0, 0), 0)), 3));
Splay2(fdiv(add(fdiv(VarSaw(f0, fdiv(b, 9), w0), 3), o2), 5))
