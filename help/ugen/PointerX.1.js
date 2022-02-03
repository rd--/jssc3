// PointerX
var freq = MulAdd(Lag(PointerX(0), 0.2), 110, 110);
var ampl = MulAdd(Lag(PointerY(0), 0.2), 0.1, 0.05);
mul(SinOsc(freq, 0), ampl)
