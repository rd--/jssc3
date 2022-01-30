// https://swiki.hfbk-hamburg.de/MusicTechnology/899 (nv) [Line 41]
var n;
n = function(i) {  return mul(BPF(dup(function() {  return PinkNoise(); }, 2), mul(pow(4, LFNoise2(fdiv(pow(1.2, i), 16))), 300), 0.15), mul(fdiv(pow(5, LFNoise2(fdiv(pow(1.9, i), 128))), add(i, 8)), 20)); };
Splay2(collect(to(1, 15), n))
