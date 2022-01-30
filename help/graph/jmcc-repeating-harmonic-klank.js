// repeating harmonic klank (jmcc)
var p, f;
p = 8;
f = [400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1500, 1600];
OverlapTexture(function(tr) {
    return dup(function() {
        return RingzBank(
            mul(Decay(mul(Dust(0.8), 0.01), 3.4), LFSaw(TRand(0, 40, tr), 0)),
            dup(function() {  return mul(TChoose(tr, f), TRand(1, 13, tr)); }, p),
            [1],
            dup(function() {  return TRand(0.4, 3.4, tr); }, p)
        );
    }, 2);
}, 8, 2, 4)
