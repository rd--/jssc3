// tremulate (jmcc) ;  event control
var voiceFunc;
voiceFunc = function(e) {
    return sum(Pan2(
        SinOsc(mul(add(mul(eventX(e), 400), 500), [1.0, 1.2, 1.5, 1.8]), 0),
        add(dup(function() {  return Rand(-1, 1); }, 4), sub(mul(eventO(e), 2), 1)),
        mul(mul(max(LFNoise2(mul(dup(function() {  return Rand(30, 90); }, 4), add(0.75, eventRx(e)))), 0), eventZ(e)), LagUD(eventW(e), 0, mul(eventRy(e), 2))
           )
    ));
};
CombC(mul(sum(Voicer(16, voiceFunc)), 0.5), 0.1, 0.1, 1)
