// SinOsc ; multiple sines ; https://github.com/cianoc/supercollider_fragments
var speeds, f0, f, harmonics;
speeds = fdiv([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20);
f0 = midiCps(add(roundTo(MouseX(0, 36, 0, 0.2), 7), 24));
f = function(partial) {
    return Pan2(SinOsc(mul(f0, partial), 0), Rand(-1, 1), max(SinOsc(choose(speeds), 0), 0));
};
harmonics = 16;
mul(fdiv(sum(collect(to(1, harmonics), f)), harmonics), 0.5)

