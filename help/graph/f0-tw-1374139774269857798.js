// https://twitter.com/redFrik/status/1374139774269857798 ; f0
var b, c, x, f0, y, z;
b = [1, 0.5, 1.25];
c = gt(SinOscFB(3, 0), 0);
x = mul(mul(SinOscFB(add(mul(lt(SinOscFB(fdiv(1, 64), 0), 0), 9), 50), fdiv(add(SinOscFB(fdiv(1, 8), 0), 1), 2)), HPF(c, 4)), 5);
f0 = Lag3UD(DmdOn(SinOscFB(fdiv(1, 12), 0), 0, mul(Seq(inf, mul([1, 1, 2, 3, 4, 1], add(mul(lt(SinOscFB(fdiv(1, 96), 0), 0.5), 19), 99))), b)), 1, 3);
y = Splay2(SinOscFB(f0, fdiv(add(SinOscFB(fdiv(b, 16), 0), 1), 3)));
z = fdiv(mul(HPF(gt(c, 0.1), add(pow(9, SinOscFB(fdiv(1, 19), 0)), 3)), SinOscFB(mul([12, 9], 99), 0)), 6);
mul(tanh(add(add([x, x], y), z)), 0.1)
