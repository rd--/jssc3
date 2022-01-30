// noise burst sweep (jmcc) #6 ; mouse control
var n, lfoRate, amp, cfreq, freq;
n = dup(function() {  return WhiteNoise();}, 2);
lfoRate = MouseX(10, 60, 1, 0.2);
amp = max(LFSaw(lfoRate, -1), 0);
cfreq = MouseY(400, 8000, 1, 0.2);
freq = add(mul(SinOsc(0.2, 0), cfreq), mul(1.05, cfreq));
Resonz(mul(n, amp), freq, 0.1)
