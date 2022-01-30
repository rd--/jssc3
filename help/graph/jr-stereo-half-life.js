// stereo half-life (jrhb)
var tHalf, nAtoms, n, activity;
tHalf = 3.92;
nAtoms = 100000;
n = max(sub(nAtoms, PulseCount(LocalIn(2, 0), 0)), 0);
activity = Dust(fdiv(mul(n, log(2)), tHalf));
mul(mrg(activity, LocalOut(activity)), 0.1)

