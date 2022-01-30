// uplink (jmcc) #2 ; graph rewrite
OverlapTexture(function(tr) {
    var osc;
    osc = function() {
        var e;
        e = add(mul(LFPulse(TRand(0, 4, tr), 0, TRand(0, 1, tr)), TRand(0, 8000, tr)), TRand(0, 2000, tr));
        return mul(LFPulse(TRand(0, 20, tr), 0, TRand(0, 1, tr)), e);
    };
    return Pan2(mul(LFPulse(sum(dup(osc, 2)), 0, 0.5), 0.04), TRand(0, 0.8, tr), 1);
}, 4, 1, 5)
