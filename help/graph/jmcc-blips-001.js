// blips 001 (jmcc) #SC3d1.5 ; graph rewrite
var z;
z = OverlapTexture(function(tr) {
    var blips;
    blips = function() {
        var f, nh;
        f = TXLine(TExpRand(0.25, 400, tr), TExpRand(0.25, 400, tr), 4, tr);
        nh = TXLine(TExpRand(2, 100, tr), TExpRand(2, 100, tr), 4, tr);
        return Blip(f, nh);
    };
    return Pan2(mul((blips)(), (blips)()), TLine(TRand(-1, 1, tr), TRand(-1, 1, tr), 4, tr), 0.1);
}, 2, 1, 12);
z = distort(z);
timesRepeat(6, function() {  return z = AllpassC(z, 0.05, dup(function() {  return Rand(0, 0.05); }, 2), 4); });
z
