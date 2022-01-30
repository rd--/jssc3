// contamination zone ; jmcc #9 ; graph rewrite
var z;
z = OverlapTexture(function(tr) {
    var f, s, r;
    f = TExpRand(800, 8000, tr);
    s = mul(PinkNoise(), add(mul(LFNoise1(TRand(0, 3, tr)), 0.0008), 0.0022));
    r = abs(RingzBank(
        s,
        dup(function() {  return TRand(50, 2000, tr); }, 4),
        [1],
        dup(function() {  return TRand(0.2, 4, tr); }, 4)));
    return Pan2(
        RLPF(r, add(mul(mul(SinOsc(TRand(0, 1, tr), 0), 0.7), f), f), 0.1),
        LFNoise1(TRand(0, 1, tr)),
        LFPulse(TRand(0, 15, tr), 0, TRand(0.2, 0.4, tr)));
}, 8, 3, 4);
timesRepeat(6, function() {  return z = AllpassC(z, 0.04, dup(function() {  return Rand(0, 0.04); }, 2), 16); });
mul(z, 0.2)
