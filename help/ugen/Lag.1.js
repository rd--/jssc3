// Lag ; https://composerprogrammer.com/teaching/supercollider/sctutorial/tutorial.html 3.4
mul(Ringz(mul(Saw(LinExp(Lag(LFNoise0(5), 0.1), -1, 1, 100, 2000)), 0.2), 1000, 0.01), 0.1)