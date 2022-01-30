// Latch ; https://composerprogrammer.com/teaching/supercollider/sctutorial/tutorial.html 3.4
mul(SinOsc(add(300, mul(200, Latch(SinOsc(13.3, 0), Impulse([10, 11], 0)))), 0), 0.1)