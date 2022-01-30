// tw 0041 (f0) - http://www.fredrikolofsson.com/f0blog/?q=node/537
var s, i, o;
s = Sweep(LocalIn(6, 0), 1);
i = Impulse([1, 0.749, 6, 12, 3, 4], 0);
o = SinOsc(fdiv(1, RunningMax(s, i)), 0);
mrg(mul(fdiv(tanh(Splay2(o)), 2), 0.1), LocalOut(o))
