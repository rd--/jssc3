// jmcc ; choip choip choip
var dur, z;
dur = 12;
z = OverlapTexture(function(tr) {
    var i, f, o, l, s;
    i = Impulse(TXLine(TExpRand(1, 30, tr), TExpRand(1, 30, tr), dur, tr), 0);
    f = TXLine(TExpRand(600.0, 8000.0, tr), TExpRand(600.0, 8000.0, tr), dur, tr);
    o = SinOsc(add(mul(mul(Decay2(i, 0.05, 0.5), -0.9), f), f), 0);
    l = TXLine(TExpRand(0.01, 0.5, tr), TExpRand(0.01, 0.5, tr), dur, tr);
    s = mul(Decay2(mul(i, l), 0.01, 0.2), o);
    return Pan2(s, TLine(TRand(-1, 1, tr), TRand(-1, 1, tr), dur, tr), 1);
}, sub(dur, 2), 1, 8);
timesRepeat(4, function() {  return z = AllpassC(z, 0.1, dup(function() {  return Rand(0, 0.05); }, 2), 4); });
z
