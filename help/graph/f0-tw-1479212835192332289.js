// https://twitter.com/redFrik/status/1479212835192332289 (f0)
var q, q1, b, q2, e, q3, q4, q5, q6;
q = function(freq) {  return QuadC(freq, 1, -1, -0.75, 0); };
q1 = (q)(5);
b = [5, 2.5, 6];
q2 = mul((q)(fdiv(b, 15)), q1);
e = fdiv(1, 15);
q3 = fdiv(mul((q)(500), q1), 99);
q4 = mul(fdiv(mul((q)(mul(999, b)), max((q)(fdiv(b, 15)), 0)), 999), (q)(b));
q5 = fdiv(mul(mul((q)(mul([12, 16], 99)), max(QuadC(0.1, 1, -1, -0.75, [-0.5, -1]), 0)), max((q)(15), 0)), 15);
q6 = fdiv(sum(Pan2(tanh(QuadC(mul(99, b), 1, sub(mul(gt((q)(fdiv(fdiv(1, b), [15, 5, 15])), 0), 0.375), 1.25), -0.75, 0)), mul(0.5, q2), q2)), 2);
add(add(q3, Splay2(q4)), AllpassC(add(q5, q6), e, e, 15))

