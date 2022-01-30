// Balance2 ; modulate position
var b;
b = SinOsc(MouseX(0.25, 0.7, 0, 0.2), 0);
dup(function() {  return Balance2(Saw(TRand(33, 55, b)), Pulse(TRand(33, 55, b), 0.5), b, 0.05); }, 2)
