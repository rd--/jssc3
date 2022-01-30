// Seq
var m;
m = function(f) {
    var tr;
    tr = Impulse(f, 0);
    sq = Seq(inf, [60, 63, 67, 69]);
    return midiCps(DmdOn(tr, 0, sq));
};
mul(Splay2(SinOsc(collect([2, 3, 5], m), 0)), 0.1)
