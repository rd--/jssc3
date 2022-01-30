// deep trip (jmcc) #9 ; graph rewrite
OverlapTexture(function(tr) {
    var f, a, s, c;
    f = midiCps(add(mul(LFNoise1(TRand(0, 0.3, tr)), 60), 70));
    a = mul(LFNoise2(mul(f, TRand(0, 0.5, tr))), max(mul(mul(LFNoise1(TRand(0, 8, tr)), SinOsc(TRand(0, 40, tr), 0)), 0.1), 0));
    s = Pan2(mul(SinOsc(f, 0), a), LFNoise1(TRand(0, 5, tr)), 1);
    c = function() {  return CombC(s, 0.5, dup(function() {  return add(TRand(0, 0.2, tr), 0.3); }, 2), 20); };
    return add(s, sum(dup(c, 2)));
}, 12, 4, 4)
