// Gendy1 ; texture
var f;
f = function() {
    return Pan2(SinOsc(add(mul(Gendy1(Rand(0, 6), Rand(0, 6), add(mul(SinOsc(0.1, 0), 0.49), 0.51), add(mul(SinOsc(0.13, 0), 0.49), 0.51), Rand(130, 160.3), Rand(130, 160.3), add(mul(SinOsc(0.17, 0), 0.49), 0.51), add(mul(SinOsc(0.19, 0), 0.49), 0.51), 12, 12), 200), 400), 0), Rand(-1, 1), 0.1);
};
sum(dup(f, 10))
