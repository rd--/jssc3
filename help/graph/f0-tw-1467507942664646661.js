// https://twitter.com/redFrik/status/1467507942664646661
var b, fb1, d, c, p, q;
b = [3, 4, 5, 6, 7, 8, 1, 2];
fb1 = function(freq) {  return FBSineC(freq, 1, 0.1, 1.1, 0.5, 0.1, 0.1); };
d = add(fdiv(gt((fb1)(fdiv(b, 12)), 0), 80), 1.051);
c = add((fb1)(fdiv(1, b)), 1);
p = FBSineC(mul(999, b), sub(mul(pow(2, (fb1)(fdiv(b, 9))), 4), 1), add(add(fdiv((fb1)(fdiv(b, 8)), 2), 1), fdiv(pow(99, (fb1)(fdiv(1, 4))), 99)), d, add(fdiv((fb1)(fdiv(1, b)), 40), 0.1), 0.1, 0.1);
q = FBSineC(mul(mul(add(add(gt((fb1)(add(27, b)), 0), 2), b), d), 1400), 2, c, fdiv(c, 2), 2, 2, 0.1);
fdiv(Splay2(add(add(mul(fdiv(pow(3, (fb1)(fdiv(1, b))), 5), p), fdiv(q, 12)), mul(mul(HPF(lt((fb1)(32), 0), 3), (fb1)(fdiv(mul(b, 70), d))), (fb1)(fdiv(1, 2))))), 2)
