// sc-140 ; 03 ; Tim Walters ; sc140_sourcecode.txt ; size=101517
var f;
f = function(k) {
    return product(collect(to(0, 7), function(i) {
        var e, ph;
        e = mul(mul(Decay(Dust(pow(fdiv(1, 4), i)), add(mul(add(SinOsc(0.1, 0), 1), k), i)), k), 999);
        ph = mul(SinOsc(fdiv(pow(mul(i, k), i), [4, 5]), 0), e);
        return SinOsc(mul(mul(i, k), k), ph);
    }));
};
sum(collect(to(0, 15), f))
