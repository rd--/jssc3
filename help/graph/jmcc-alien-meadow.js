// alien meadow (jmcc) #6
OverlapTexture(function(tr) {
    var z, f, a;
    z = TRand(0, 5000, tr);
    f = add(mul(SinOsc(TRand(0, 20, tr), 0), mul(0.1, z)), z);
    a = add(mul(SinOsc(TRand(0, 20, tr), 0), 0.05), 0.05);
    return Pan2(SinOsc(f, 0), TRand(-1, 1, tr), a);
}, 6, 2, 6)
