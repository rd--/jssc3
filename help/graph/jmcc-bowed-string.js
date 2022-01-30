// bowed string (jmcc)
var root, scale, oct, f0, freq, a0, amp, x, k;
root = 5;
scale = add([0, 2, 4, 5, 7, 9, 11], root);
oct = [24, 36, 48, 60, 72, 84];
f0 = midiCps(add(choose(scale), choose(oct)));
freq = collect(to(1, 12), function(i) {  return mul(f0, i); });
a0 = Rand(0.7, 0.9);
amp = dup(function() {  return a0 = mul(a0, a0); }, 12);
x = mul(mul(dup(function() {  return BrownNoise(); }, 2), 0.007), max(add(mul(LFNoise1(ExpRand(0.125, 0.5)), 0.6), 0.4), 0));
k = RingzBank(x, freq, amp, dup(function() {  return Rand(1, 3); }, 12));
softClip(mul(k, 0.1))
