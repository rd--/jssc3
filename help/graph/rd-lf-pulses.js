// lf pulses (rd) ; mouse control
var x, f, o;
x = add(MouseX(0.012, 0.19, 1, 0.1), add(mul(LFNoise2(0.2), 0.1), 0.05));
f = Formlet(Blip(10, 12), add(mul(LFNoise0([20, 40]), 43), 700), 0.005, max(x, 0));
o = mul(SinOsc(40, 0), LFNoise0([5, 10]));
mul(clip2(LeakDC(add(f, o), 0.995), 0.75), 0.5)
