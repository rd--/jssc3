// data space (jmcc) #2 ; graph rewrite
OverlapTexture(function(tr) {
    var dt, osc, freq;
    dt = add(TRand(0, 0.25, tr), 0.1);
    osc = function(p) {
        var n, m, e;
        n = first(p);
        m = second(p);
        e = add(mul(LFPulse(TRand(0, m, tr), 0, TRand(0, 1, tr)), TRand(0, 8000, tr)), TRand(0, 2000, tr));
        return mul(LFPulse(TRand(0, n, tr), 0, TRand(0, 1, tr)), e);
    };
    freq = add(add((osc)([200, 40]), (osc)([20, 4])), (osc)([20, 4]));
    return CombL(Pan2(LFPulse(freq, 0, 0.5), mul(LFNoise0(TRand(0, 3, tr)), 0.8), 0.04), dt, dt, 3);
}, 6, 1, 4)
