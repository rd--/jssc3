// DegreeToKey
var b, m;
b = asLocalBuf([0, 2, 4, 5, 7, 9, 11]);
m = DegreeToKey(b, [MouseX(0, 15, 0, 0.2), MouseY(3, 10, 0, 0.2)], 12);
mul(CombC(Blip(Lag(midiCps(add([48, 36], m)), 0.01), [2, 3]), 0.2, 0.2, 2), [0.05, 0.1])

