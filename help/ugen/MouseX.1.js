// Mouse control ; jmcc #3
var x, y, f, a;
x = MouseX(200, 2000, 1, 0.2);
y = MouseY(0, 1, 0, 0);
f = [x, Lag(LinExp(y, 0, 1, 200, 2000), 0.2)];
a = dbAmp(Lag(LinLin(y, 0, 1, -90, -36), 0.2));
mul(SinOsc(f, 0), a)

