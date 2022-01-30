// berlin 1977 (jmcc) #4 ; mouse control
var clockRate, clockTime, clock, patternList, note, clock16, noteTrs, freq, env, amp, filt, pw, s;
clockRate = MouseX(5, 20, 1, 0.2);
clockTime = fdiv(1, clockRate);
clock = Impulse(clockRate, 0);
patternList = [55, 60, 63, 62, 60, 67, 63, 58];
note = DmdOn(clock, 0, Seq(99, patternList));
clock16 = PulseDivider(clock, 16, 0);
noteTrs = add(DmdOn(clock16, 0, Shuf(inf, [-12, -7, -5, 0, 2, 5])), note);
freq = midiCps(noteTrs);
env = Decay2(clock, mul(0.05, clockTime), mul(2, clockTime));
amp = add(mul(env, 0.1), 0.02);
filt = add(mul(env, mul(SinOsc(0.17, 0), 800)), 1400);
pw = add(mul(SinOsc(0.08, [0, mul(0.5, pi)]), 0.45), 0.5);
s = mul(Pulse(freq, pw), amp);
CombC(RLPF(s, filt, 0.15), 0.2, [0.2, 0.17], 1.5)
