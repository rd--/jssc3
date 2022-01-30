// TScramble ; sequences of different lengths, scrambled
var a, t1, t2, m, c;
a = [[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7]];
t1 = Impulse(fdiv(1, 5), 0);
t2 = Impulse(5, 0);
m = TChoose(t1, collect(a, function(x) {  return DmdOn(t2, 0, Seq(inf, TScramble(t1, x))); }));
c = mul(mul(SinOsc(1200, 0), Decay(t1, 1)), 0.1);
add(mul(SinOsc(mul(m, 110), 0), 0.1), c)
