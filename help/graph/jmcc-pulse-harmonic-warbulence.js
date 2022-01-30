// pulse harmonic warbulence (jmcc) #12
var z;
z = OverlapTexture(function(tr) {
    var f, r, n, p;
    f = midiCps(TRand(24, 96, tr));
    r = TXLine(TExpRand(0.1, 20, tr), TExpRand(0.1, 20, tr), 25.6, tr);
    n = 12;
    p = LFPulse(TExpRand(0.2, 1.2, tr), TRand(0.1, 0.2, tr), 0.5);
    return mul(sum(collect(to(1, n), function(i) {
        var m;
        m = max(sub(mul(SinOsc(mul(r, TRand(0.9, 1.1, tr)), TRand(0, mul(2, pi), tr)), 0.1), 0.05), 0);
        return Pan2(SinOsc(add(mul(f, i), f), 0), TRand(-1, 1, tr), mul(m, fdiv(1, add(i, 1))));
    })), p);
}, 12.8, 6.4, 6);
mul(sum(dup(function() {  return CombC(z, 0.3, dup(function() {  return Rand(0.1, 0.3); }, 2), 8); }, 5)), 0.25)
