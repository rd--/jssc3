// tw 0045 (f0) - http://www.fredrikolofsson.com/f0blog/?q=node/537
var f, pf, p;
f = SinOsc(SinOsc(0.11, 0), 0);
pf = add(mul(SinOsc(mul(95, add(SinOsc(0.01, 0), 1)), 0), mul(SinOsc(0.005, 0), 50)), 100);
p = mul(SinOsc(pf, SinOsc([98, 97], 0)), add(pi, SinOsc(0.0005, 0)));
mul(tanh(SinOsc(f, p)), 0.1)
