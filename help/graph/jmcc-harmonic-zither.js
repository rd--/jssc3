// harmonic zither (jmcc) #11 ; mouse control
var pitch, triggerSpacing, panSpacing, stringFunc;
pitch = [50, 53.86, 57.02, 59.69, 62, 64.04, 65.86, 67.51, 69.02, 71.69, 72.88, 74];
triggerSpacing = fdiv(0.5, sub(size(pitch), 1));
panSpacing = fdiv(1.5, sub(size(pitch), 1));
stringFunc = function(i) {
    return Pan2(
        CombL(
            mul(PinkNoise(), Decay(abs(HPZ1(gt(MouseX(0, 1, 0, 0.2), mul(add(0.25, i), triggerSpacing)))), 0.05)),
            reciprocal(midiCps(nth(pitch, i))),
            reciprocal(midiCps(nth(pitch, i))),
            8
        ),
        sub(mul(sub(i, 1), panSpacing), 0.75),
        1
    );
};
LeakDC(LPF(sum(collect(to(1, size(pitch)), stringFunc)), 12000), 0.995)
