// <https://swiki.hfbk-hamburg.de/MusicTechnology/899> (tw ; tim walters)
var z, f, s;
z = 0;
f = function(i) {  return SinOsc(i, fdiv(SinOsc(pow(add(i, z), i), 0), mul(Decay(Impulse(fdiv(pow(0.5, i), z), 0), [i, add(i, 1)]), z))); };
s = function(k) {  z = k; return sum(collect(to(1, 6), f)); };
sum(transpose(fdiv(GVerb(sum(collect(to(0, 15), s)), 1, 3, 0.5, 0.5, 15, 1, 0.7, 0.5, 300), 512)))
