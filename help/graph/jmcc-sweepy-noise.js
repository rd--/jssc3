// sweepy noise (jmcc) #6 ; mouse control
var lfoDepth, lfoRate, freq, filtered;
lfoDepth = MouseY(200, 8000, 1, 0.1);
lfoRate = MouseX(4, 60, 1, 0.1);
freq = add(mul(LFSaw(lfoRate, 0), lfoDepth), mul(lfoDepth, 1.2));
filtered = RLPF(mul(dup(function() {  return WhiteNoise(); }, 2), 0.03), freq, 0.1);
add(CombC(filtered, 0.3, 0.3, 2), filtered)
