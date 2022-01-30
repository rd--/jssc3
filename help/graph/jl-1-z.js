// http://sccode.org/1-Z (jl) ; edits (rd)
var t, a, b, c, d, e, f;
t = 0.0025;
a = Lag(Trig(Impulse(8, 0), mul(t, 2)), 0.1);
b = Crackle(mul(Lag(abs(LFSaw(3, 0)), 0.1), 1.8));
c = mul(a, b);
d = Lag(Trig(add(Impulse(2, 0), Impulse(4, 0.5)), t), 0.1);
e = mul(Blip(4.9, 7), 0.4);
f = mul(d, e);
mul(tanh(mul(add(c, GVerb(f, 1, 1, 0.5, 0.5, 15, 1, 0.7, 0.5, 300)), 5)), 0.25)
