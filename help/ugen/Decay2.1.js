// Decay2 ; random impulses ; https://github.com/cianoc/supercollider_fragments
var f;
f = function() {
    return Pan2(SinOsc(mul(ExpRand(100, 3000), add(mul(LFNoise1(fdiv(1, 6)), 0.4), 1)), 0), LFNoise1(fdiv(1, 8)), Decay2(Dust(fdiv(1, 5)), 0.01, 4));
};
mul(sum(dup(f, 15)), 0.1)
