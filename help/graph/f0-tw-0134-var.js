// tw 0134 (f0)
var n, z;
n = 50;
z = function(i) {
    var o1, o2, f0, m, o3;
    o1 = LFSaw(fdiv(add(i, 1), [3, 4]), 0);
    o2 = add(LFSaw(fdiv(add(i, 1), 8), 0), 1);
    f0 = add(mul(gt(o1, o2), fdiv(n, 2)), n);
    m = LFSaw(fdiv(add(i, 1), n), fdiv(i, fdiv(n, 2)));
    o3 = mul(Blip(f0, add(i, [2, 3])), m);
    return Ringz(o3, mul(add(i, 1), sub(mul(n, 2), 1)), 0.1);
};
fdiv(mean(collect(to(1, n), z)), 5)
