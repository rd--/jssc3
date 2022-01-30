// bitwise (jl) - a0f253ff89f6b244ea29a1e431dd9e5df5571a8b (jonatan liljedahl)
var t, b1, b2, b3, b4, s;
t = PulseCount(Impulse(8000, 0), 0);
b1 = bitAnd(mul(t, 15), bitShiftRight(t, 5));
b2 = bitAnd(mul(t, 5), bitShiftRight(t, [3, 4]));
b3 = bitAnd(mul(t, 2), bitShiftRight(t, 9));
b4 = bitAnd(mul(t, 8), bitShiftRight(t, 11));
s = mod(sub(bitOr(bitOr(bitOr(b1, b2), b3), b4), 3), 256);
mul(tanh(HPF(mul(sub(fdiv(s, 127), 1), 3), 20)), 0.02)
