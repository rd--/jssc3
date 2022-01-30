// demanding studies (jmcc) ; mouse control
var s1, s2, s3, x, tr, f, o1, o2, o3;
s1 = Choose(1000, [72, 75, 79, 82]);
s2 = Choose(1, [82, 84, 86]);
s3 = Seq(1000, [72, 75, 79, s2]);
x = MouseX(5, 13, 0, 0.2);
tr = Impulse(x, 0);
f = DmdOn(tr, 0, midiCps([sub(s1, 12), s3]));
o1 = SinOsc(add(f, [0, 0.7]), 0);
o2 = mul(Saw(add(f, [0, 0.7])), 0.3);
o3 = distort(add(o1, o2));
mul(o3, 0.1)
