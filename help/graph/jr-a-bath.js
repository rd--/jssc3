// a bath (jr) ; mouse control
var above, aside, sources, u1, u2, u3, u4;
above = roundTo(MouseY(0, 2, 0, 0.2), 1);
aside = MouseX(1, 1.6, 0, 0.2);
sources = [mul(dup(function() {  return WhiteNoise(); }, 2), 0.3), dup(function() {  return PinkNoise(); }, 2), mul(LFDNoise3(10000), 0.1)];
u1 = mul(SelectX(LinLin(LFDNoise1(4), -1, 1, 0, size(sources)), sources), 0.1);
u2 = mul(add(u1, DelayC(u1, 0.1, [0.001, 0.0012])), 0.1);
u3 = dup(function() {  return sum(RLPF(u2, dup(function() {  return mul(Rand(100.0, 340), aside); }, 4), 0.2)); }, 2);
u4 = add(mul(mul(CombC(reverse(u3), 0.05, 0.05, 0.3), 0.3), max(LFNoise2(0.2), 0)), u3);
mul(SelectX(Lag(above, 0.4), [u2, u4]), 2)
