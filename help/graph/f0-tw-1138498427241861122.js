// https://twitter.com/redFrik/status/1138498427241861122 (f0)
var f, b, d, t1, t2, f1, s1, c, s2, s3;
f = sqrt(9);
b = [f, 9.999];
d = max(SinOscFB(fdiv(b, 99), 0), 0);
t1 = Select2(gt(SinOscFB(SinOscFB(fdiv(9, 999), 0), 0), SinOscFB(fdiv(9, 99), 0)), f, fdiv(9, b));
t2 = Select2(lt(SinOscFB(fdiv(9, 99), 0), SinOscFB(fdiv(99, 9999), 0)), fdiv(b, 9), f);
f1 = Lag(mul(mul(mul(9.9, b), t1), t2), 0.1);
s1 = mul(mul(SinOscFB(f1, d), SinOscFB(fdiv(b, 9), 0)), d);
c = PitchShift(s1, fdiv(9, b), fdiv(9, sqrt(b)), fdiv(b, 999), fdiv(b, 99));
s2 = GVerb(mul(mul(mul(c, d), d), d), 99, 9, fdiv(9, 999), 0.5, 15, 1, 0.7, 0.5, 300);
s3 = add(fdiv(s2, 9), PitchShift(c, fdiv(f, 9), fdiv(f, 9), 0, 0));
mul(HPF(Splay2(s3), 9), 0.5)
