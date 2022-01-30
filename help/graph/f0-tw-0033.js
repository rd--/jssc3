// tw 0033 (f0) - http://www.fredrikolofsson.com/f0blog/?q=node/537
var f, a, n, z, o;
f = add(mul(rounded(LFPar(fdiv(1, 14), 0)), 20), 80);
a = Pulse([1, 2, 3, 4], 0.35);
n = mul(BrownNoise(), a);
z = function(i) {
    return [mul(add(i, 1), f), add(add(mul(i, f), i), 0.333)];
};
o = LFPar(collect(to(1, 4), z), 0);
mul(sum(Splay2(fdiv(gt(o, n), 3))), 0.1)
