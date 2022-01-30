// birdies (jmcc) #6 ; graph rewrite
OverlapTexture(function(tr) {
    var p1, p2, sw, freq, amp;
    p1 = mul(LFPulse(TRand(0.4, 1.4, tr), 0, TRand(0.1, 0.9, tr)), TRand(4, 7, tr));
    p2 = mul(LFPulse(TRand(0.2, 0.7, tr), 0, 0.4), 0.02);
    sw = add(add(mul(LFSaw(add(p1, 2), 0), negated(TRand(1000, 1800, tr))), 4000), TRand(-1200, 1200, tr));
    freq = Lag(sw, 0.05);
    amp = Lag(p2, 0.3);
    return Pan2(SinOsc(freq, 0), TRand(-1, 1, tr), amp)
}, 7, 4, 4)
