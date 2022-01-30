// https://twitter.com/redFrik/status/1319946903711338496 ; graph rewrite (rd)
var c;
c = [0, 0.804, 1.944, 3.084, 3.888, 5.028, 5.832, 6.972, 7.776, 8.916, 10.056, 10.86];
OverlapTexture(function(tr) {
    var i, z;
    i = PulseCount(tr, 0);
    z = sum(dup(function() {
        var f, y;
        f = add(mul(LFTri(fdiv(1, 99), 0), 9), midiCps(add(mul(12, TRand(3, 6, tr)), Select(TChoose(tr, [0, 2, 3, 5, 7, 8, 10]), c))));
        y = SinOscFB(f, fdiv(add(LFTri(fdiv(add(1, i), 50), 0), 1), 2));
        return Pan2(y, LFTri(fdiv(i, 70), 0), fdiv(gt(TRand(0, 1, tr), 0.5), 2)); }, 9));
    return mul(tanh(CombC(z, 0.2, 0.2, 1)), 0.1);
}, 3, 9, 2)
