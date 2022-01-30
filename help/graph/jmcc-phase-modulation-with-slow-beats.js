// phase modulation with slow beats ; jmcc #6 ; graph rewrite ; mouse control
var n, x, y;
n = 4;
x = MouseX(100, 6000, 1, 0.2);
y = MouseY(0, 2, 0, 0.2);
mul(OverlapTexture(function(tr) {
    var a, f1, u;
    a = 0;
    f1 = TRand(0, x, tr);
    u = timesRepeat(3, function() {
        var f2;
        f2 = TRand(0, x, tr);
        return a = add(mul(SinOsc([f2, add(f2, TRand(-1, 1, tr))], 0), y), a);
    });
    return mul(SinOsc([f1, add(f1, TRand(-1, 1, tr))], a), 0.1);
}, 4, 4, n), 0.25)
