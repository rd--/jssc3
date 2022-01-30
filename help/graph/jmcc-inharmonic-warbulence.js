// jmcc - inharmonic warbulence ; graph rewrite
var z;
z = OverlapTexture(function(tr) {
    var f, a, r, n;
    f = midiCps(TRand(24, 96, tr));
    a = min(fdiv(500, f), 1);
    r = TXLine(TExpRand(0.1, 20, tr), TExpRand(0.1, 20, tr), 25.6, tr);
    n = 12;
    return mul(sum(collect(to(1, n), function(i) {
        var g, m;
        g = add(TRand(0, n, tr), 1);
        m = max(sub(mul(SinOsc(mul(r, TRand(0.9, 1.1, tr)), TRand(0, mul(2, pi), tr)), 0.08), 0.04), 0);
        return Pan2(SinOsc(mul(f, g), 0), TRand(-1, 1, tr), mul(m, fdiv(2, g)));
    })), 0.1);
}, 12.8, 6.4, 6);
mul(sum(dup(function() {  return CombC(z, 0.3, dup(function() {  return Rand(0.1, 0.3); }, 2), 8); }, 5)), 0.3)
