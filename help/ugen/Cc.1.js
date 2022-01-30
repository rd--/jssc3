// Cc ; continuous controller
Pan2(mul(mul(Blip(add(mul(Lag(Cc(1), 0.1), 110), 110), add(mul(Lag(Cc(2), 0.2), 9), 1)), Lag(Cc(3), 0.3)), 0.1), sub(mul(Lag(Cc(4), 0.4), 2), 1), 1)