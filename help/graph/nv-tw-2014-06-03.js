// https://twitter.com/headcube/status/474064500564324352 (nv) ; size=102,069
var o, z;
o = function(ix) {  return add(fdiv(product(dup(function() {  return LFPulse(pow(2, IRand(-9, 1)), fdiv(IRand(0, 2), 2), 0.5); }, add(ix, 1))), ix), 1); };
z = function() {
    var f;
    f = mul(product(collect(to(1, 8), o)), 86);
    return Pluck(sin(BPF(f, f, 1)), Saw(440), 1, fdiv(1, f), 9, 0.5);
};
mul(Splay2(dup(z, 9)), 0.2)
