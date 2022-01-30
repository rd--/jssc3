// ExpRand ; shimmering harmonics ; https://github.com/cianoc/supercollider_fragments
var harmonics, f;
harmonics = 16;
f = function() {  return Pan2(SinOsc(ExpRand(100, 2000), 0), Rand(-1, 1), mul(SinOsc(fdiv(1, Rand(3, 6)), 0), Rand(0.1, 0.9))); };
fdiv(sum(dup(f, harmonics)), mul(2, harmonics))
