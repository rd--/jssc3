// sturmian sequencer i (jr)
var rules, rewrite, strFunc;
rules = [[0, 1], [0]];
rewrite = function(n) {
    var r, u;
    r = [0];
    u = timesRepeat(n, function() {  return r = concatenation(collect(r, function(e) {  return nth(rules, add(e, 1)); })); });
    return r;
};
strFunc = function(i) {
    var str, dt, trig, freq;
    str = (rewrite)(add(i, 6));
    dt = mul(pow(2, negated(i)), 10);
    trig = TDmdFor(dt, 0, Seq(1, str));
    freq = ExpRand(200, mul(fdiv(add(i, 1), 7), 10100));
    return distort(sum(Ringz(trig, mul(freq, [1, 1.2, 1.5]), ExpRand(mul(pow(2, negated(i)), 0.1), 1.101))));
};
mul(Splay2(collect(to(0, 6), strFunc)), 0.3)
