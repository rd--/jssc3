// synthetic piano (jmcc) #3;
var p;
p = function() {
    var n, e, c;
    n = Rand(36, 90);
    e = Decay2(mul(Impulse(Rand(0.1, 0.5), Rand(0, 1)), 0.1), 0.008, 0.04);
    c = function(i) {
        var dt;
        dt = fdiv(1, midiCps(add(n, nth([-0.05, 0, 0.04], i))));
        return CombL(mul(LFNoise2(3000), e), dt, dt, 6);
    };
    return Pan2(sum(collect(to(1, 3), c)), sub(fdiv(sub(n, 36), 27), 1), 1);
};
sum(dup(p, 3))
