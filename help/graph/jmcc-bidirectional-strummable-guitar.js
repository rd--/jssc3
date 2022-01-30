// bidirectional strummable guitar (jmcc) #11 ; mouse control
var pitch1, pitch2, mousex, strFunc, out;
pitch1 = [52, 57, 62, 67, 71, 76];
pitch2 = add(pitch1, 7);
mousex = MouseX(0, 1, 0, 0.2);
strFunc = function(i) {
    var trigger, pluck1, period1, string1, pluck2, period2, string2;
    trigger = HPZ1(gt(mousex, add(0.25, mul(i, 0.1))));
    pluck1 = mul(PinkNoise(), Decay(max(trigger, 0), 0.05));
    period1 = reciprocal(midiCps(nth(pitch1, i)));
    string1 = CombL(pluck1, period1, period1, 4);
    pluck2 = mul(BrownNoise(), Decay(max(negated(trigger), 0), 0.05));
    period2 = reciprocal(midiCps(nth(pitch2, i)));
    string2 = CombL(pluck2, period2, period2, -4);
    return Pan2(add(string1, string2), sub(mul(i, 0.2), 0.5), 1);
};
out = sum(collect(to(1, size(pitch1)), strFunc));
LeakDC(LPF(out, 12000), 0.995)
