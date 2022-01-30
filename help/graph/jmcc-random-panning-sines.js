// random panning sines (jmcc) #4
var n, f;
n = 8;
f = function(tr) {
    return fdiv(mul(sum(dup(function() {
        return Pan2(
            SinOsc(add(80, TRand(0, 2000, tr)), 0),
            LFNoise1(add(0.4, TRand(0, 0.8, tr))),
            add(mul(LFNoise1(add(0.4, TRand(0, 0.8, tr))), 0.4), 0.5)
        );
    }, n)), 0.1), n);
};
OverlapTexture(f, 8, 8, 2)
