// narrow band filtered crackle noise (jmcc) #2
OverlapTexture(function(tr) {
    var rf1, rf2, rf, c;
    rf1 = add(TRand(0, 2000, tr), 80);
    rf2 = add(rf1, mul(TRand(-0.2, 0.2, tr), rf1));
    rf = TXLine(rf1, rf2, 9, tr);
    c = Crackle(add(1.97, TRand(0, 0.03, tr)));
    return Pan2(Resonz(c, rf, 0.2), TRand(-1, 1, tr), 0.15);
}, 2, 5, 4)
