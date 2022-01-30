// LFNoise0 ; pretty ; nice, but inessential ; https://github.com/cianoc/supercollider_fragments ; Rand
var f;
f = function(i) {
    return Pan2(SinOsc(add(mul(SinOsc(MouseX(Rand(0.1, 5), Rand(3, 20), 0, 0.2), 0), MouseY(10, 50, 0, 0.2)), Rand(200, 5000)), 0), Rand(-1, 1), mul(max(LFNoise0(MouseX(Rand(1, 6), Rand(1, 6), 0, 0.2)), 0), 0.05));
};
sum(collect(to(1, 12), f))
