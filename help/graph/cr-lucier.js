// lucier (cr) ; http://www.listarc.bham.ac.uk/lists/sc-users/msg47539.html
var bus;
bus = 20;
mul(OverlapTexture(function(tr) {
	var freq, string_delay, pk1_pos, src_pos, pk2_pos, max_delay, mk_delay, mk_allpass, drv, pk1_R, pk1_L, pk2_L, stringL, pk2_R, stringR, source, l_out, outL, outR;
	freq = TRand(56, 64, tr);
	string_delay = fdiv(1, freq);
	pk1_pos = 0.1;
	src_pos = 0.3;
	pk2_pos = 0.9;
	max_delay = 1;
	mk_delay = function(p) {
		var i, r;
		i = first(p);
		r = second(p);
		return LPZ1(DelayC(i, max_delay, mul(r, string_delay)));
	};
	mk_allpass = function(p) {
		var i, r, dt;
		i = first(p);
		r = second(p);
		dt = third(p);
		return LPZ1(AllpassC(i, max_delay, mul(r, string_delay), dt));
	};
	drv = InFb(1, bus);
	pk1_R = (mk_delay)([drv, sub(src_pos, pk1_pos)]);
	pk1_L = (mk_allpass)([mul(pk1_R, -1), mul(pk1_pos, 2), TRand(0.001, 0.11, tr)]);
	pk2_L = mul((mk_delay)([pk1_L, sub(pk2_pos, pk1_pos)]), 0.99);
	stringL = (mk_delay)([pk2_L, sub(1, pk2_pos)]);
	pk2_R = mul((mk_allpass)([mul(stringL, -1), sub(1, pk2_pos), add(2, TRand(0.001, 0.11, tr))]), 0.99);
	stringR = (mk_delay)([pk2_R, sub(pk2_pos, src_pos)]);
	source = (function() {
		var s, a, p, f, e;
		s = mul(SinOsc(220, 0), 0.01);
		a = mul(Amplitude(drv, 0.01, 0.01), 11);
		p = mul(Pulse(add(60, a), 0.5), 0.1);
		f = RLPF(add(s, p), 320, 0.05);
		e = sub(1, min(Amplitude(drv, 0.01, 0.01), 1));
		return mul(Normalizer(f, 0.7, 0.01), e);
	})();
	l_out = ReplaceOut(bus, add(mul(source, 0.2), stringR));
	outL = add(pk1_L, pk1_R);
	outR = add(pk2_L, pk2_R);
	bus = add(bus, 1);
	return mrg(mrg([outL, outR], l_out), drv);
}, 1, 5, 3), 0.25)
