// https://twitter.com/redFrik/status/1115745664523218944
var b, c, j, o, z;
b = add([1, 2, 6, 3], lt(SinOsc(0.0345, 0), 0));
c = pow(2, SinOsc(b, 0));
j = rounded(MulAdd(SinOsc(fdiv(1, b), 0), fdiv(b, 3), mul(b, add(lt(SinOsc(0.0234, 0), 0), 1))));
o = mul(SinOsc(DmdFor(c, 0, Seq(inf, mul(99, j))), b), max(SinOsc(fdiv(1.5, c), 0), sub(mul(SinOsc(0.0123, 0), 0.5), 0.5)));
z = CombC(o, 1, mul(fdiv(sub(7, b), 12), add(mod(SinOsc(lt(c, 0.6), 0), 1), 0.1)), pow(2, mul(SinOsc(mul(SinOsc(0.1, 0), 0.1), b), 9)));
mul(tanh(HPF(Splay2(z), 9)), 0.2)

