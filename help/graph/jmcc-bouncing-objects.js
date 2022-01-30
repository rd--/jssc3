// bouncing objects ; jmcc #2 ; lightbulbs, pencils, cans, and other assorted objects ; graph rewrite
OverlapTexture(function(tr) {
    var i, s, r;
    i = Impulse(TXLine(TRand(3, 7, tr), 600, 4, tr), 0);
    s = Decay(mul(i, TXLine(0.09, 0.000009, 4, tr)), 0.001);
    r = sum(dup(function() {  return mul(Ringz(s, TRand(400, 8400, tr), TRand(0.01, 0.1, tr)), TRand(0, 1, tr)); }, 4));
    return Pan2(r, TRand(-1, 1, tr), 1);
}, 6, 0.01, 4)

