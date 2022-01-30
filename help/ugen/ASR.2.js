// ASR ; event control
var f;
f = function(e) {
    return mul(Blip(unitCps(eventP(e)), mul(eventO(e), 5)), ASR(eventW(e), mul(0.5, eventY(e)), mul(eventY(e), 4), -4));
};
mul(Splay2(Voicer(16, f)), 0.1)

