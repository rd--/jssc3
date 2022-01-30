// sturmian sequencer ii (jrhb)
var rules, rewrite, n, strFunc;
rules = [[0, 1], [0]];
rewrite = function(m) {
    var r, u;
    r = [0];
    u = timesRepeat(m, function() {  return r = concatenation(collect(r, function(e) {  return nth(rules, add(e, 1)); })); });
    return r;
};
n = 7;
strFunc = function(i) {
    var str, dt, trig, freq, trigFlt;
    str = (rewrite)(add(i, 6));
    dt = mul(pow(2, negated(sub(n, i))), 20);
    trig = TDmdFor(dt, 0, Seq(1, str));
    freq = TExpRand(200, mul(fdiv(sub(n, i), n), 10100), trig);
    trigFlt = BPF(trig, mul(add(mul(LFNoise2(0.1), 0.02), 1), freq), 0.2);
    return distort(sum(Ringz(trigFlt, mul(freq, [1, 1.1, 1.2]), ExpRand(mul(pow(2, negated(i)), 0.1), 0.5))));
};
mul(Splay2(collect(to(0, sub(n, 1)), strFunc)), 0.3)
