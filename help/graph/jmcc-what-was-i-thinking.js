// what was i thinking? (jmcc) #2
var i, f, p, z, c, y;
i = mul(mul(LFPulse(0.1, 0, 0.05), Impulse(8, 0)), 500);
f = max(add(SinOsc(4, 0), 80), Decay(i, 2));
p = mul(Pulse(f, add(mul(LFNoise1(0.157), 0.4), 0.5)), 0.04);
z = mul(RLPF(p, add(mul(LFNoise1(0.2), 2000), 2400), 0.2), 0.25);
c = function(i) {  return CombL(i, 0.06, add(mul(LFNoise1(Rand(0, 0.3)), 0.025), 0.035), 1); };
y = mul(z, 0.6);
add(z, dup(function() {  return sum(collect([y, y], c));}, 2))
