// Voicer
Splay2(Voicer(16, function(e) {
    return mul(mul(SinOsc(midiCps(add(mul(eventX(e), 24), 48)), 0), eventZ(e)), eventW(e));
}))
