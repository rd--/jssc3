// tw 0220 (f0) - http://www.fredrikolofsson.com/f0blog/?q=node/617
var c, b, g, r;
c = InFb(1, 0);
b = clearBuf(BufAlloc(1, 90000));
g = TGrains(2, SinOsc(3, 0), b, add(c, 3), 2, 12, 0, 0.1, 4);
r = BufRec(b, 0, c);
mrg(HPF(add(fdiv(SinOsc(99, mul(c, 6)), 9), g), 9), r)
