// oscillator cluster (rd) ; size=70,234
sum(dup(function() {
    var np, tr, prt, fp;
    np = 12;
    tr = Dust(0.075);
    prt = function(p) {
        var d, a;
        d = first(p);
        a = second(p);
        return function(cf) {
            var o, e, f;
            o = SinOsc(TLine(add(5, TRand(0, 1, tr)), 0.01, d, tr), 0);
            e = TLine(add(20, TRand(0, 10, tr)), 0, d, tr);
            f = add([cf, TRand(cf, add(cf, 2), tr)], mul(o, e));
            return mul(mul(SinOsc(f, 0), Decay2(tr, TRand(0.1, 0.2, tr), d)), a);
        };
    };
    fp = dup(function() {  return TRand(220, 660, tr); }, np);
    return sum(collect(fp, (prt)([TRand(4, 7, tr), TRand(0.01, 0.05, tr)])));
}, 5))
