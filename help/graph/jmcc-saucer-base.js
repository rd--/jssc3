// saucer base (jmcc) #6 ; graph rewrite
OverlapTexture(function(tr) {
    var b, c, o1, o2, o3;
    b = TRand(0, 1000, tr);
    c = TRand(0, 5000, tr);
    o1 = add(mul(SinOsc(TRand(0, 20, tr), 0), b), mul(1.1, b));
    o2 = add(mul(SinOsc(o1, 0), c), mul(1.1, c));
    o3 = mul(SinOsc(o2, 0), 0.1);
    return Pan2(o3, TRand(-1, 1, tr), 0.25);
}, 6, 2, 4)
