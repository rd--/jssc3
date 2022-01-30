// f0 <https://twitter.com/redFrik/status/1343283697840226307>
var b, f, z, t, d, c, p;
b = fdiv(to(2, 12), 12);
f = [136.1, 163.3, 181.4, 204.1, 244.9, 272.1, 326.5, 362.8, 408.2, 489.8, 544.2];
z = add(mul(dup(function() {  return WhiteNoise(); }, 11), fdiv(add(LFTri(b, 0), 1), 2)), BrownNoise());
t = LFTri(pow(121, LFTri(mul(fdiv(2, 121), b), 0)), 0);
d = fdiv(add(mul(fdiv(Lag2(le(LFTri(fdiv(1, 212.1), 0), fdiv(1, 212)), fdiv(2, b)), 12), 1.2), 1.2), f);
c = fdiv(add(LFTri(fdiv(b, 12), 0), 1), 2);
p = Pluck(z, t, fdiv(2, 121), d, fdiv(mul(fdiv(1, 2), 12), 1.2), c);
fdiv(fdiv(Splay2(HPF(p, 12)), 2.1), 2)
