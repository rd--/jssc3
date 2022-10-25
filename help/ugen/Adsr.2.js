// Adsr ; event control
var f;
f = function(e) {
    return mul(
        Blip(unitCps(eventP(e)), mul(eventO(e), 5)),
        Adsr(eventW(e), mul(0.5, eventY(e)), mul(eventY(e), 0.75), 0.65, mul(eventY(e), 4), -4)
    );
};
mul(Splay2(Voicer(16, f)), 0.1)
