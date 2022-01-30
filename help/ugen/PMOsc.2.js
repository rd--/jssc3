// PMOsc ; envelope used also for the index ; https://github.com/cianoc/supercollider_fragments
var f, e;
f = Latch(sum(add(mul(SinOsc([100, 200, 300, 550], 0), 100), 110)), Impulse(7, 0));
e = Decay2(Impulse(7, 0), 0.02, 0.2);
mul(mul(PMOsc(f, mul(f, [1.25, MouseX(1, 3, 0, 0.2)]), mul(e, [5, MouseY(3, 9, 0, 0.2)]), 0), e), 0.1)
