// deep trip (jmcc) #9 ; texture=overlap,12,4,4,inf
var f, a, s, c;
f = midiCps(add(mul(LFNoise1(Rand(0, 0.3)), 60), 70));
a = mul(LFNoise2(mul(f, Rand(0, 0.5))), max(mul(mul(LFNoise1(Rand(0, 8)), SinOsc(Rand(0, 40), 0)), 0.1), 0));
s = Pan2(mul(SinOsc(f, 0), a), LFNoise1(Rand(0, 5)), 1);
c = function() {  return CombC(s, 0.5, dup(function() {  return add(Rand(0, 0.2), 0.3); }, 2), 20); };
add(s, sum(dup(c, 2)))
