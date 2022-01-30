// Ln ; https://composerprogrammer.com/teaching/supercollider/sctutorial/tutorial.html 2.5 ; am, fm, chorus
var src, amp;
src = Saw(add([440, 443, 437], mul(SinOsc(100, 0), 100)));
amp = mul(add(mul(LFSaw(Ln(3, 17, 3), 0), 0.5), 0.5), Ln(1, 0, 10));
mul(Splay2(Resonz(src, XLn(10000, 10, 10), Ln(1, 0.05, 10))), amp)
