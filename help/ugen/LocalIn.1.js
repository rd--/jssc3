// LocalIn ; stereo cross channel feedback modulation
var index, fb, pan, amp, freq, mratio, input, mod, car;
index = 5;
fb = [10, 5];
pan = 0;
amp = 0.1;
freq = MouseY(20, 4000, 1, 0.2);
mratio = MouseX(fdiv(1, 8), 8, 1, 0.2);
input = LocalIn(2, 0);
mod = mul(mul(mul(SinOsc(mul(freq, mratio), 0), freq), mratio), index);
car = SinOsc([mul(mul(freq, mod), second(input)), add(add(freq, mod), first(input))], 0);
mrg(Pan2(LeakDC(sum(car), 0.995), pan, amp), LocalOut(mul(car, fb)))
