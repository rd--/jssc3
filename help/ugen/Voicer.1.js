// Voicer ; error if LFNoise2 is audio rate
mul(sum(Voicer(16, function(e) {
    var freq;
    freq = midiCps(add(mul(eventX(e), [25, add(mul(kr(LFNoise2(0.25)), 0.25), 25)]), 48));
    return Pan2(sum(RLPF(Saw(freq), mul(add(eventY(e), 0.75), freq), mul(eventY(e), 0.5))), sub(mul(eventO(e), 2), 1), mul(eventW(e), eventZ(e)));
})), 0.25)

/*
mul(sum(Voicer(1, function(e) {
    var freq;
    freq = midiCps(MulAdd(eventX(e), [25, MulAdd(LFNoise2(0.25), 0.25, 25)], 48));
    return Pan2(sum(RLPF(Saw(freq), mul(add(eventY(e), 0.75), freq), mul(eventY(e), 0.5))), sub(mul(eventO(e), 2), 1), mul(eventW(e), eventZ(e)));
})), 0.25)

0_MaxLocalBufs ir [0]
1_In kr [13000]
2_LFNoise2 ar [0.25]
3_MulAdd ar [2_LFNoise2,0.25,25]
4_MulAdd kr [1_In[1],25,48]
5_MulAdd ar [1_In[1],3_MulAdd,48]
6_midiCps kr [4_MulAdd]
7_midiCps ar [5_MulAdd]
8_Saw ar [6_midiCps]
9_Saw ar [7_midiCps]
10_add kr [1_In[2],0.75]
11_mul kr [10_add,6_midiCps]
12_mul ar [10_add,7_midiCps]
13_mul kr [1_In[2],0.5]
14_RLPF ar [8_Saw,11_mul,13_mul]
15_RLPF ar [9_Saw,12_mul,13_mul]
16_add ar [14_RLPF,15_RLPF]
17_mul kr [1_In[4],2]
18_sub kr [17_mul,1]
19_mul kr [1_In[0],1_In[3]]
20_Pan2 ar [16_add,18_sub,19_mul]
21_mul ar [20_Pan2[0],0.25]
22_mul ar [20_Pan2[1],0.25]
23_Out ar [0,21_mul,22_mul]
﻿*/
