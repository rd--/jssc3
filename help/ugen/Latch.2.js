// Latch ; generating melodic runs ; https://github.com/cianoc/supercollider_fragments
mul(SinOsc(Latch(add(mul(LFSaw(MouseX(0.1, 22, 0, 0.2), 0), 500), 600), Impulse([10, 11], 0)), 0), 0.1)