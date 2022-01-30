// pm-crotale (dmc) #1.7 ; graph rewrite
OverlapTexture(function(tr) {
    var midi, tone, art, pan, freq, env, mod, amp1, amp2, sig;
    midi = TIRand(48, 72, tr);
    tone = TRand(1, 6, tr);
    art = mul(TRand(2, 6, tr), 3);
    pan = TRand(-1, 1, tr);
    freq = midiCps(midi);
    env = Decay2(tr, 0, art);
    mod = add(5, fdiv(1, TIRand(2, 6, tr)));
    amp1 = mul(Decay2(tr, 0, art), TRand(0.1, 0.3, tr));
    amp2 = mul(Decay2(tr, 0, mul(art, 1.3)), TRand(0.1, 0.5, tr));
    sig = PMOsc(freq, mul(mod, freq), mul(Decay2(tr, 0, art), tone), 0);
    return Pan2(sig, pan, mul(amp1, amp2));
}, 12, 0, 8)
