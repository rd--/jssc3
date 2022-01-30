// f0 ; tw 0164
var cm, fr, ph, o;
cm = CombC(InFb(1, [1, 0]), 5, [4.8, 4.7], 1);
fr = sub(first(transpose(Pitch(cm, 440, 60, 4000, 100, 16, 1, 0.01, 0.5, 1, 0))), 4);
ph = mul(mul(mul(SinOsc(fr, 0), 2), pi), SinOsc(fdiv(1, 16), 0));
o = SinOsc([1, 2], ph);
fdiv(fdiv(fdiv(fdiv(LeakDC(o, 0.995), 2), 2), 2), 2)
