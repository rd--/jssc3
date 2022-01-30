// harmonic tumbling (jmcc) #1
var t, o;
t = TXLine([10, 11], 0.1, 60, 1);
o = function(h) {
    var e;
    e = Decay2(mul(Dust(t), 0.02), 0.005, Rand(0, 0.5));
    return mul(SinOsc(mul(80, add(h, 1)), 0), e);
};
sum(collect(to(0, 10), o))
