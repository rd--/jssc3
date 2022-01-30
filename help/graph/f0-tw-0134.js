// tw 0134 (f0)
var n, z;
n = 50;
z = function(i) {
    return Ringz(mul(Blip(add(mul(gt(LFSaw(fdiv(add(i, 1), [3, 4]), 0), add(LFSaw(fdiv(add(i, 1), 8), 0), 1)), fdiv(n, 2)), n), add(i, [2, 3])), LFSaw(fdiv(add(i, 1), n), fdiv(i, fdiv(n, 2)))), mul(add(i, 1), sub(mul(n, 2), 1)), 0.1);
};
fdiv(mean(collect(to(1, n), z)), 5)
