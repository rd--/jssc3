// zizle (jmcc) #SC3d1.5 ; graph rewrite
OverlapTexture(function(tr) {
    var a, o, s;
    a = function(f) {  return sum(mul(SinOsc(mul(f, [TRand(0.7, 1.3, tr), 1]), dup(function() {  return TRand(0, mul(2, pi), tr); }, 2)), 0.1)); };
    o = SinOsc(midiCps(TRand(24, 108, tr)), TRand(0, mul(2, pi), tr));
    s = mul(mul(o, max((a)(TExpRand(0.3, 8, tr)), 0)), abs((a)(TExpRand(6, 24, tr))));
    return Pan2(s, TRand(-1, 1, tr), 1);
}, 4, 4, 12)
