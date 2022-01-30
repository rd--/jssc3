// CombC ; glissandi
var lwr, tr, fn;
lwr = 48;
tr = dup(function() {  return Dust(0.65); }, 2);
fn = function() {
    var n, e, x, m, f;
    n = LinLin(LFNoise2(0.1), -1, 1, lwr, 72);
    e = Decay2(tr, 0.05, TRand(0.05, 0.75, tr));
    x = mul(mul(PinkNoise(), e), 0.1);
    m = LFNoise2(0.1);
    f = Lag(midiCps(n), 0.25);
    return CombC(x, reciprocal(midiCps(lwr)), reciprocal(f), LinLin(m, -1, 1, 1, 8));
};
mul(sum(dup(fn, 12)), 0.1)
