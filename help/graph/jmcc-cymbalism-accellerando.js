// cymbalism accellerando ; jmcc #2 ; graph rewrite
var p;
p = 15;
mul(OverlapTexture(function(tr) {
    var i, s, f1, f2;
    i = Impulse(TXLine(add(TRand(0, 4, tr), 0.5), add(TRand(0, 35, tr), 0.5), 12, tr), 0);
    s = mul(mul(Decay(i, 0.004), WhiteNoise()), 0.03);
    f1 = TRand(500, 2500, tr);
    f2 = TRand(0, 8000, tr);
    return dup(function() {  return sum(dup(function() {  return Ringz(s, add(f1, TRand(0, f2, tr)), TRand(1, 5, tr)); }, p)); }, 2);
}, 4, 4, 3), 0.1)
