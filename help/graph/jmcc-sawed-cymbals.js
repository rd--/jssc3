// sawed cymbals (jmcc) ; #9 ; graph rewrite
var p;
p = 15;
OverlapTexture(function(tr) {
    var f1, f2, s;
    f1 = TRand(500, 2500, tr);
    f2 = TRand(0, 8000, tr);
    s = mul(LFSaw(TXLine(TRand(0, 600, tr), TRand(0, 600, tr), 12, tr), 0), 0.0005);
    return mul(dup(function() {
        return RingzBank(s, dup(function() {
            return add(f1, TRand(0, f2, tr));
        }, p), null, dup(function() {  return TRand(2, 6, tr); }, p));
    }, 2), 0.1);
}, 4, 4, 6)
