// vibraphone simulation ; Kevin Larke ; Real Time Vibraphone Pitch and Timbre Classification ; size=93,839
var voiceFunc;
voiceFunc = function(e) {
	var freq, detune, freqs, hifreqs, modfreq, modamp, mod, velocity, sound, decay, decays, zero, soundMain, soundHigh, pan;
	freq = unitCps(eventP(e));
	detune = mul(eventY(e), 15);
	freqs = mul(freq, [1, 4, 10, add(13.75, detune)]);
	hifreqs = mul(freq, [19.2, 20, 21.2]);
	modfreq = add(mul(eventRx(e), 4), 3);
	modamp = mul(eventRy(e), 2);
	mod = LinLin(SinOsc(modfreq, TRand(0, mul(2, pi), eventW(e))), -1, 1, sub(1, mul([0.5, 0.3, 0.3, 0.5], modamp)), 1);
	velocity = mul(Latch(eventZ(e), eventW(e)), 2);
	sound = mul(mul(0.3, [1, mul(1.1, velocity), mul(mul(0.6, velocity), velocity), mul(0.5, velocity)]), SinOsc(freqs, 0));
	decay = 0;
	decays = [1, mul(0.7, exp(mul(-1, decay))), mul(0.5, exp(mul(-1, decay))), mul(0.4, exp(mul(-1, decay)))];
	zero = 0.000001;
	soundMain = mul(mul(mul(TXLine(zero, 1, fdiv(1, freqs), eventW(e)), TXLine(1, zero, mul(decays, 4), eventW(e))), sound), mod);
	soundHigh = mul(TXLine(mul(0.3, add(velocity, zero)), zero, 0.02, eventW(e)), SinOsc(hifreqs, 0));
	pan = sub(mul(eventO(e), 2), 1);
	return Pan2(add(sum(soundMain), sum(soundHigh)), pan, LagUD(eventW(e), 0.01, 4));
};
mul(sum(Voicer(16, voiceFunc)), 0.1)
