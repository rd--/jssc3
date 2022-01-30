// clipped inharmonic warbulence ; jmcc
var z;
z = OverlapTexture(function(tr) {
    var r, f, a, n;
    r = LinExp(LFNoise1(fdiv(1, 16)), -1, 1, 0.1, 20);
    f = midiCps(TRand(24, 96, tr));
    a = min(fdiv(500, f), 1);
    n = 12;
    return mul(a, sum(collect(to(1, n), function(i) {
        var g, o;
        g = add(TRand(0, n, tr), 1);
        o = max(mul(SinOsc(mul(f, g), 0), max(sub(mul(SinOsc(mul(r, TRand(0.9, 1.1, tr)), TRand(0, mul(2, pi), tr)), 0.08), 0.04), 0)), 0);
        return Pan2(o, TRand(-1, 1, tr), fdiv(2, g));
    })));
}, 12.8, 6.4, 6);
z = LeakDC(z, 0.995);
mul(sum(dup(function() {  return CombC(z, 0.3, dup(function() {  return Rand(0.1, 0.3); }, 2), 20); }, 8)), 0.2)

