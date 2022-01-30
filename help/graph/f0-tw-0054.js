// https://fredrikolofsson.com/f0blog/more-sc-twitter/
var sy, sq, sw;
sy = add(mul(Saw([3, 4]), 32), 64);
sq = mul(Seq(99, [2, 2, 2, 2, 2, 2, 4, 3]), pow(4, to(0, 4)));
sw = add(mul(Saw([4, 3]), 99), transpose(DmdOn(Impulse(1, 0), 0, sq)));
mul(sum(transpose(CombN(fdiv(SyncSaw(sy, sw), 9), 1, fdiv(1, 6), 2))), 0.1)
