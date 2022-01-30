// theremin (jmcc) ; mouse control
var mod, detune, x, y, f;
mod = 7;
detune = 0;
x = MouseX(0, 0.9, 0, 0.2);
y = add(MouseY(4000, 200, 1, 0.8), detune);
f = add(y, mul(mul(y, SinOsc(mod, 0)), 0.02));
Pan2(SinOsc(f, 0), 0, mul(x, 0.1))

