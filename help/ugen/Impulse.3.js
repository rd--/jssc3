// Impulse ; synchronised impulses ; https://github.com/cianoc/supercollider_fragments
var sync, freq, numer, f;
sync = 5;
freq = [1, 3, 5, 7, 9, 11, 13];
numer = [3, 7, 5, 2, 9, 6, 1];
f = function(i) {  return mul(SinOsc(mul(nth(freq, i), 100), 0), Decay2(Impulse(fdiv(nth(numer, i), sync), 0), 0.01, 1)); };
mul(Splay2(collect(to(1, size(freq)), f)), 0.1)
