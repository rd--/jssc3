'use strict';

function OverlapTexture(graphFunc, sustainTime, transitionTime, overlap) {
        return sum(to(0, overlap - 1).map(function(i) {
            var trg = kr(Impulse(1 / (sustainTime + (transitionTime * 2)), i / overlap));
            var snd = graphFunc(trg);
            var env = Env([0, 1, 1, 0], [transitionTime,sustainTime,transitionTime], 'sin', null, null, 0);
            var sig = mul(snd, EnvGen(trg, 1, 0, 1, 0, env.coord()));
            console.debug('OverlapTexture', trg, snd, env, sig);
            return sig;
        }));
}
