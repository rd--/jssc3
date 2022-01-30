// repeating inharmonic klank ; jmcc #6 ; graph rewrite
var n, p;
n = 4;
p = 8;
OverlapTexture(function(tr) {
    var s;
    s = mul(Decay(mul(Dust(0.8), 0.004), 3.4), LFSaw(TRand(0, 40, tr), 0));
    return dup(function() {
        return RingzBank(s, dup(function() {  return TRand(80, 10000, tr); }, p), [1], dup(function() {  return TRand(0.4, 4.4, tr); }, p));
    }, 2);
}, 8, 8, n)
