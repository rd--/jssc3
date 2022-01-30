// https://twitter.com/redFrik/status/1084601286488a674304
var b, x, y, z, d;
b = [2, 5, 1, 6, 3];
x = PitchShift(LocalIn(2, 0), 1.5, 0.5, 0, 0);
y = VarSaw(mul(pow(add(fdiv(gt(LFSaw(fdiv(1, b), 0), 0), 4), 1.25), b), 99), 0, mod(LFSaw(fdiv(b, 9), 0), 1));
z = HPF(gt(LFSaw(fdiv(add(rounded(LFSaw(fdiv(1, b), 0)), 1), 2), 0), 0), add(mul(LFSaw(fdiv(b, 33), 0), 4), 8));
d = MoogFF(Splay2(mul(y, z)), mul(add(LFSaw(fdiv(1, 9), 0), 2), 4000), 2, 0);
mrg(d, LocalOut(d))
