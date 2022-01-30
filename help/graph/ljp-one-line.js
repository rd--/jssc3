// one line (ljp)
var lfs, sft;
lfs = add(mul(LFSaw([1, 0.99], [0, 0.6]), 2000), 2000);
sft = mul(truncateTo(lfs, [400, 600]), [1, -1]);
Pan2(SinOsc(OnePole(sum(sft), 0.98), 0), 0, 0.05)
