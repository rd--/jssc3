// pkt 26 (f0) - http://www.fredrikolofsson.com/f0blog/?q=node/490
var n, x;
n = 8;
x = function(i) {
    var t, a, b, c, d, e, f, g, h, o, z;
    t = fdiv(i, n);
    a = mul(VarSaw(0.02, t, 0.5), 7.5);
    b = add(mul(VarSaw(0.16, t, fdiv(2, 3)), abs(a)), 300);
    c = add(mul(VarSaw(0.064, t, 0.5), 25), 50);
    d = add(mul(VarSaw(0.012, t, 0.75), c), 200);
    e = add(mul(VarSaw(0.024, t, 0.25), 0.475), 0.5);
    f = VarSaw(add(100, i), t, e);
    g = add(mul(VarSaw(0.048, 0, 0.5), 25), 150);
    h = mul(VarSaw(mul(add(i, 1), g), t, fdiv(1, 3)), 150);
    o = add(mul(SinOsc(h, mul(f, pi)), d), b);
    z = LeakDC(VarSaw(o, t, 0.5), 0.995);
    return Pan2(z, VarSaw(0.02, t, 0.5), fdiv(1, n));
};
mul(sum(collect(to(1, n), x)), 0.25)
