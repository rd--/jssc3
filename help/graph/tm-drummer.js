// drummer (tm)
var tempo, n, tr1, tr2, tr4, snare, bass, hihat;
tempo = 4;
n = WhiteNoise();
tr1 = Impulse(tempo, 0);
tr2 = PulseDivider(tr1, 4, 2);
tr4 = PulseDivider(tr1, 4, 0);
snare = mul(n, Decay2(tr2, 0.005, 0.5));
bass = mul(SinOsc(60, 0), Decay2(tr4, 0.005, 0.5));
hihat = mul(HPF(n, 10000), Decay2(tr1, 0.005, 0.5));
Pan2(add(add(snare, bass), hihat), 0, 0.1)
