// modified from a patch by Landon Rose ; jmcc #8 ; graph rewrite
var m, f;
m = [[32, 43, 54, 89], [10, 34, 80, 120], [67, 88, 90, 100], [14, 23, 34, 45]];
f = function(i) {
    var s, e;
    s = dup(function() { return mul(PinkNoise(), 0.001); }, 2);
    e = LinSeg(Impulse(0.125, nth([0, 0.25, 0.5, 0.75], i)), [0, 2, 1, 2, 0]);
    return mul(RingzBank(s, midiCps(nth(m, i)), [1], [3]), e);
};
sum(collect(to(1, 4), f))
