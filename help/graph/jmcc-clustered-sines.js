// clustered sines ; jmcc #2 ; graph rewrite
var n;
n = 80;
OverlapTexture(function(tr) {
	var f1, f2, fn;
	f1 = TRand(100, 1100, tr);
	f2 = mul(4.0, f1);
	fn = sum(dup(function() {
		var y;
		y = add(f1, TRand(0, f2, tr));
		return fdiv(mul(SinOsc(y, 0), f1), y);
	}, n));
	return fdiv(mul(dup(function() {  return fn; }, 2), 0.1), n);
}, 4, 4, 3)
