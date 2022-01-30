// localOut ; resonator, must subtract blockSize for correct tuning
var p, i, d;
p = LocalIn(1, 0);
i = Impulse(1, 0);
d = DelayC(add(i, mul(p, 0.995)), 1, sub(reciprocal(440), ControlDur()));
[mrg(p, LocalOut(d)), mul(SinOsc(440, 0), 0.05)]
