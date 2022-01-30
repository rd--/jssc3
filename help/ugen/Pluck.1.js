// Pluck ; event control
sum(Voicer(16, function(e) {
    var dm, dl, sig;
    dm = fdiv(1, 220);
    dl = mul(add(mul(negated(eventX(e)), 0.9), 1), dm);
    sig = Pluck(mul(WhiteNoise(), eventZ(e)), eventW(e), dm, dl, 10, fdiv(eventY(e), 3));
    return Pan2(sig, sub(mul(eventO(e), 2), 1), 1);
}))
