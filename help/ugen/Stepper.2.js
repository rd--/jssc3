// Stepper ; https://composerprogrammer.com/teaching/supercollider/sctutorial/tutorial.html 3.4 ; kr
mul(Saw(Select(kr(Stepper(Impulse(MouseX(1, 40, 0, 0.2), 0.1), 0, 0, 7, 1, 0)), midiCps([72, 63, 67, 72, 55, 62, 63, 60]))), 0.1)
