// PMOsc ; ping pong ; https://github.com/cianoc/supercollider_fragments
var rate, trig, freq, ratio, env;
rate = 5;
trig = Impulse(5, 0);
freq = midiCps(TRand([36, 60], [72, 86], trig));
ratio = 2;
env = Decay2(trig, 0, fdiv(1.25, rate));
mul(mul(PMOsc(freq, mul(freq, ratio), mul(add(3, env), 4), 0), env), 0.25)
