// sc3-texture.ts

function OverlapTexture(graphFunc: (tr: Signal) => Signal, sustainTime: number, transitionTime: number, overlap: number): Signal {
    var voiceFunction = function(i: number): Signal {
        var trg = kr(Impulse(1 / (sustainTime + (transitionTime * 2)), i / overlap));
        var snd = graphFunc(trg);
        var env = Env([0, 1, 1, 0], [transitionTime,sustainTime,transitionTime], 'sin', null, null, 0);
        var sig = mul(snd, EnvGen(trg, 1, 0, 1, 0, envCoord(env)));
        consoleDebug('OverlapTexture', trg, snd, env, sig);
        return sig;
    };
    return sum(collect(to(0, overlap - 1), voiceFunction));
}
