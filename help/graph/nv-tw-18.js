// sc-140 ; 18 ; Nathaniel Virgo
var p, a, l, b;
p = dup(function() {  return PinkNoise(); }, 2);
a = mul(BRF(add(p, Blip(add(p, 2), 400)), 150, 2), 0.1);
l = LPF(mul(add(p, 0.2), Dust(0.1)), 60);
b = LPF(tanh(mul(FreeVerb2(first(l), second(l), 1, 1, 0.2), 10000)), 2000);
add(a, b)
