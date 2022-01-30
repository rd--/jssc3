// http://sccode.org/1-V (nv) L1
var a, o;
a = dup(function() {  return PinkNoise();}, 2);
o = function() {
    var f;
    f = LinExp(LFNoise1(Rand(0, 0.05)), -1, 1, 40, 15000);
    return a = BBandStop(a, f, ExpRand(0.1, 2));
};
timesRepeat(50, o);
LPF(a, 100000)
