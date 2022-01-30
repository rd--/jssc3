// combc ; event control
var lfo, osc;
lfo = SinOsc(0.5, 0);
osc = Voicer(16, function(e) {
    return mul(mul(mul(SinOsc(unitCps(eventP(e)), 0), lfo), eventW(e)), eventZ(e));
});
CombC(Splay2(osc), 0.5, 0.2, 3)
