// narrow band filtered crackle noise (jmcc) #2
var rf1, rf2, rf, c;
rf1 = add(Rand(0, 2000), 80);
rf2 = add(rf1, mul(Rand(-0.2, 0.2), rf1));
rf = XLn(rf1, rf2, 9);
c = Crackle(add(1.97, Rand(0, 0.03)));
Pan2(Resonz(c, rf, 0.2), Rand(-1, 1), 0.15)
