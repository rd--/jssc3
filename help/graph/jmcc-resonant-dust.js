// resonant dust (jmcc) #2 ; graph rewrite
OverlapTexture(function(tr) {
	var rf1, rf2, d, s;
	rf1 = add(TRand(0, 2000, tr), 80);
	rf2 = add(rf1, mul(TRand(-0.5, 0.5, tr), rf1));
	d = Dust(add(50, TRand(0, 800, tr)));
	s = Resonz(d, TXLine(rf1, rf2, 9, tr), 0.1);
	return Pan2(s, Rand(-1, 1), 0.3);
}, 5, 2, 4)
