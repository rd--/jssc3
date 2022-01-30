// Voicer
fdiv(sum(Voicer(16, function(e) {
    return Pan2(
        SinOsc(midiCps(add(mul(eventX(e), 24), 48)), 0),
        sub(mul(eventO(e), 2), 1),
        mul(eventZ(e), eventW(e))
    );
})), 8)
