// analogue daze (jmcc) #3
var pattern, f, a, x, g;
pattern = [55, 63, 60, 63, 57, 65, 62, 65];
f = function(param) {
    var octave, clockRate, pwmrate, fltrate, tr, patternCps, sq, pwm, cf;
    octave = nth(param, 1);
    clockRate = nth(param, 2);
    pwmrate = nth(param, 3);
    fltrate = nth(param, 4);
    tr = Impulse(clockRate, 0);
    patternCps = midiCps(add(pattern, mul(12, octave)));
    sq = DmdOn(tr, 0, Seq(inf, patternCps));
    pwm = add(mul(SinOsc(pwmrate, Rand(0, mul(2, pi))), 0.4), 0.5);
    cf = add(mul(SinOsc(fltrate, Rand(0, mul(2, pi))), 1400), 2000);
    return RLPF(mul(LFPulse(Lag(sq, 0.05), 0, pwm), 0.1), cf, fdiv(1, 15));
};
a = mul(dup(function() {  return LFNoise0(add(mul(LFNoise1(0.3), 6000), 8000)); }, 2), 0.07);
x = mul(Decay(Impulse(2, 0), 0.15), a);
g = add(x, [(f)([1, 8, 0.31, 0.2]), (f)([0, 2, 0.13, 0.11])]);
mul(add(CombC(g, 0.375, 0.375, 5), reverse(g)), 0.4)
