// https://twitter.com/redFrik/status/1454150378241548296 ; f0
var x, b, z, o;
x = 0.001;
b = fdiv([1, 2, 3, 4, 5, 6, 7, 8], 8);
z = [RLPF(Impulse(2, 0), midiCps(Select(mod(mul(LFSaw(x, 0), 88), 5), add([0, 3, 5, 7, 10], 51))), mul(x, 9)), RLPF(Impulse(1, b), midiCps(Select(mod(0, 5), add([0, 3, 5, 7, 10], 70))), mul(x, 5)), fdiv(RLPF(Impulse(add(LFSaw(fdiv(1, 9), 0), 1), mul(b, 3)), midiCps(Select(mod(pow(5, LFSaw(fdiv(b, 9), 0)), 5), add([0, 3, 5, 7, 10], 82))), mul(x, 3)), 8), fdiv(RLPF(Impulse(3, 0), midiCps(Select(mod(mul(LFSaw(mul(x, 2), 0.5), 88), 5), add([0, 3, 5, 7, 10], 63))), mul(x, 7)), 4)];
o = Splay2(sum(z));
add(o, GVerb(fdiv(sum(o), 9), 50, 3, 0.5, 0.5, 15, 1, 0.7, 0.5, 300))
