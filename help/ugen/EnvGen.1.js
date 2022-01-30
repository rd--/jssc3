// EnvGen
var trg = Impulse(1 / 9, 0);
var env = Env([0, 0.1, 0.1, 0], [3, 2, 3], 'sin', null, null, 0);
mul(SinOsc(440, 0), EnvGen(trg, 1, 0, 1, 0, env.coord()));
