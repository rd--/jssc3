// scratchy (jmcc) #1
var n, f;
n = sub(mul(BrownNoise(), 0.5), 0.49);
f = mul(max(n, 0), 20);
RHPF(f, 5000, 1)

