// pkt 28 (f0) - http://www.fredrikolofsson.com/f0blog/?q=node/490;
var n, x, y;
n = 28;
x = function(i) {
    var a, b, c, d, e, f, g, h, j, k, z, l;
    a = mul(mul(LFSaw(mul(add(i, 1), 5), 0), 0.5), pi);
    b = mul(SinOsc(mul(add(i, 1), 0.001), 0), 0.5);
    c = mul(LFSaw(add(0.2, b), fdiv(i, n)), 0.4);
    d = add(mul(SinOsc(0.03, add(i, 1)), 0.5), 1);
    e = mul(SinOsc(add(200, i), 0), d);
    f = add(mul(SinOsc(0.04, add(i, 2)), 0.5), 1);
    g = mul(SinOsc(add(400, i), 0), f);
    h = add(mul(SinOsc(0.05, add(i, 3)), 0.5), 1);
    j = mul(SinOsc(add(800, i), 0), h);
    k = LinExp(i, 0, sub(n, 1), 70, 1500);
    z = mul(mul(mul(mul(SinOsc(k, a), max(c, 0)), e), g), j);
    l = LinLin(i, 0, sub(n, 1), -0.925, 0.925);
    return Pan2(z, l, fdiv(1, n));
};
y = Limiter(LeakDC(sum(collect(to(1, n), x)), 0.995), 1, 0.01);
mul(GVerb(y, 3, 5, 0.2, 0.8, 20, 0.1, 0.7, 0.5, 300), 0.25)
