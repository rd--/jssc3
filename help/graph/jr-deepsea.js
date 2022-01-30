// deepsea (jr)
var amp, variation, tr, pan, n, dt1, dt2, freq, t, count, m, u1, u2, o, f1, f2, f3;
amp = 0.1;
variation = 0.9;
tr = Dust(0.25);
pan = TRand(-1, 1, tr);
n = TRand(7, 46, tr);
dt1 = add(25.0, TRand(-1.7, 1.7, tr));
dt2 = mul(mul(add(dt1, LFNoise2(2)), variation), 0.001);
freq = add(901, TRand(0, 65, tr));
t = mul(Impulse(reciprocal(dt2), 0), 100);
count = PulseCount(t, tr);
m = lt(count, n);
u1 = BPF(mul(m, t), freq, 0.1);
u2 = BPF(u1, mul(freq, add(mod(count, LinLin(LFNoise1(1), -1, 1, 2, 20)), 1)), 0.2);
o = Pan2(u2, pan, mul(amp, 10));
f1 = BPF(mul(o, 5), 700, 0.1);
f2 = add(CombL(LPF(mul(f1, max(LFNoise1(0.1), 0)), 800), 0.5, 0.5, 1), reverse(f1));
f3 = f2;
timesRepeat(5, function() {  return f3 = AllpassC(f3, 0.18, add(dup(function() {  return Rand(0, 0.06); }, 2), 0.06), 8); });
add(LPF(add(f2, f3), 400), mul(LFNoise1(0.2), f2))
