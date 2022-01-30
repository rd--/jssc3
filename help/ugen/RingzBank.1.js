// RingzBank ; use of dust with rising sounds ; https://github.com/cianoc/supercollider_fragments
var f;
f = function() {
    var s = RingzBank(
        mul(Dust(fdiv(1, 3)), 0.1),
        dup(function() {  return ExpRand(1000, 10000); }, 3),
        [1],
        dup(function() {  return Rand(1, 4); }, 15));
    return Pan2(s, LFTri(Rand(3, 10), 0), 0.1);
};
sum(dup(f, 20))

