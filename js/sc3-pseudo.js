'use strict';

function Splay(inArray, spread, level, center, levelComp) {
    var n = Math.max(2, inArray.length);
    var pos = arrayFromTo(0, n - 1).map(item => add(mul(sub(mul(item, fdiv(2, sub(n, 1))), 1), spread), center));
    var lvl = mul(level, levelComp ? Math.sqrt(1 / n) : 1);
    console.debug('Splay', n, pos, lvl);
    return sum(Pan2(inArray, pos, lvl));
}

function Splay2(inArray) {
    var n = Math.max(2, inArray.length);
    var pos = arrayFromTo(0, n - 1).map(item => item * (2 / (n - 1)) - 1);
    var lvl = Math.sqrt(1 / n);
    console.debug('Splay2', n, pos, lvl);
    return sum(Pan2(inArray, pos, lvl));
}

function LinLin(input, srclo, srchi, dstlo, dsthi) {
    var scale  = fdiv(sub(dsthi, dstlo), sub(srchi, srclo));
    var offset = sub(dstlo, mul(scale, srclo));
    return add(mul(input, scale), offset);
}

function InFb(numChannels, bus) {
    return InFeedback(numChannels, bus);
}

function Select2(predicate, ifTrue, ifFalse) {
    return add(mul(predicate, sub(ifTrue, ifFalse)), ifFalse);
}

function TChoose(trig, array) {
    return Select(TIRand(0, array.length - 1, trig), array);
}

function PMOsc(carfreq, modfreq, pmindex, modphase) {
    return SinOsc(carfreq, SinOsc(modfreq, modphase, pmindex));
}

function XLn(start, end, dur) {
    return XLine(start, end, dur, 0);
}

function DmdFor(dur, reset, level) {
    return Duty(dur, reset, 0, level);
}

function TDmdFor(dur, reset, level) {
    return TDuty(dur, reset, 0, level, 0);
}

function DmdOn(trig, reset, demandUGens) {
    return Demand(trig, reset, demandUGens);
}

var Seq = Dseq;
var Ser = Dseries;
var Shuf = Dshuf;
var Choose = Drand;

function Ln(start, end, dur) {
        return Line(start, end, dur, 0);
}

function TLine(start, end, dur, trig) {
    var env = Env([start, start, end], [0, dur], 'lin', null, null, 0);
    return EnvGen(trig, 1, 0, 1, 0, env.coord());
}

function TXLine(start, end, dur, trig) {
    var env = Env([start, start, end], [0, dur], 'exp', null, null, 0);
    return EnvGen(trig, 1, 0, 1, 0, env.coord());
}

function bitShiftRight(a, b) {
    return shiftRight(a, b);
}

function AudioIn(channels) {
    return In(1, sub(add(NumOutputBuses(), channels), 1));
}

function AudioOut(channelsArray) {
    return Out(0, channelsArray);
}

/*
note that mrg places q in p, and here q has a reference to p, so the traversal of the mrg node must not recurse

b = asLocalBuf([0, 2, 4, 5, 7, 9, 11]);
ugenTraverseCollecting(b, ...)
*/
function asLocalBuf(array) {
    var k = array.length;
    var p = LocalBuf(1, k);
    var q = SetBuf(p, 0, k, array);
    return mrg(p, q);
}

function clearBuf(buf) {
    return mrg(buf, ClearBuf(buf));
}

function BufRec(bufnum, reset, inputArray) {
    return RecordBuf(bufnum, 0, 1, 0, 1, 1, reset, 0, inputArray);
}

var BufAlloc = LocalBuf;

// Reshape input arrays, and allow amp and time to be null (defaulting to 1)
function asKlankSpec(freq, amp, time) {
    var n = freq.length;
    var a = [freq, amp || arrayReplicate(n, 1), time || arrayReplicate(n, 1)];
    console.debug('asKlankSpec', a);
    return arrayConcatenation(arrayTranspose(arrayExtendToBeOfEqualSize(a)));
}

function RingzBank(input, freq, amp, time) {
    return Klank(input, 1, 0, 1, asKlankSpec(freq, amp, time));
}

function SinOscBank(freq, amp, time) {
    return Klang(1, 0, asKlankSpec(freq, amp, time));
}

function LinSeg(gate, coordArray) {
    var coord = arrayTranspose(arrayClump(coordArray, 2));
    var levels = first(coord);
    var times = second(coord);
    var env = Env(levels, times.slice(0, times.length - 1), 'lin', null, null, 0);
    return EnvGen(gate, 1, 0, 1, 0, env.coord());
}

function SelectX(which, array) {
    return XFade2(
        Select(roundTo(which, 2), array),
	Select(add(truncateTo(which, 2), 1), array),
	fold2(sub(mul(which, 2), 1), 1),
        1
    );
}

function unitCps(a) {
    return midiCps(mul(a, 127));
}

// Read a signal from a control bus.
function ControlIn(numChan, bus) {
    return kr(In(numChan, bus));
}

function SfFrames(sfBufferArray) {
    return BufFrames(arrayFirst(arrayAsArray(sfBufferArray)));
}

function SfDur(sfBufferArray) {
    return BufDur(arrayFirst(arrayAsArray(sfBufferArray)));
}

function SfSampleRate(sfBufferArray) {
    return BufSampleRate(arrayFirst(arrayAsArray(sfBufferArray)));
}

function SfRateScale(sfBufferArray) {
    return BufRateScale(arrayFirst(arrayAsArray(sfBufferArray)));
}

function SfRead(sfBufferArray, phase, loop, interpolation) {
    return BufRd(1, sfBufferArray, phase, loop, interpolation);
}

function SfPlay(sfBufferArray, rate, trigger, startPos, loop) {
    return PlayBuf(1, sfBufferArray, rate, trigger, startPos, loop, 0);
}

function DelayWrite(bufnum, input) {
    return RecordBuf(bufnum, 0, 1, 0, 1, 1, 1, 0, [input]);
}

function DelayTap(bufnum, delayTime) {
    return PlayBuf(1, bufnum, 1, 1, mul(sub(BufDur(bufnum), delayTime), SampleRate()), 1, 0);
}

function PingPongDelay(left, right, maxDelayTime, delayTime, feedback) {
    var delaySize = mul(maxDelayTime, SampleRate());
    var phase = Phasor(0, 1, 0, delaySize, 0);
    var leftBuffer = clearBuf(BufAlloc(1, delaySize)); // allocate a buffer for the left delay line
    var rightBuffer = clearBuf(BufAlloc(1, delaySize)); // allocate a buffer for the right delay line
    var leftDelayedSignal = BufRd(1, leftBuffer, Wrap(sub(phase, mul(delayTime, SampleRate())), 0, delaySize), 1, 2); // tap the left delay line
    var rightDelayedSignal = BufRd(1, rightBuffer, Wrap(sub(phase, mul(delayTime, SampleRate())), 0, delaySize), 1, 2); // tap the left delay line
    var output = [add(leftDelayedSignal, left), add(rightDelayedSignal, right)]; // mix the delayed signal with the input
    var writer = DelayWrite([rightBuffer, leftBuffer], mul(output, 0.8)); // feedback to buffers in reverse order
    return mrg(output, writer);  // output the mixed signal and force the DelayWr into the call graph
}

function MultiTapDelay(timesArray, levelsArray, input) {
    var delayFrames = mul(arrayMaxItem(timesArray), SampleRate());
    var buf = clearBuf(BufAlloc(1, delayFrames));
    var writer = DelayWrite(buf, input);
    var numReaders = timesArray.length;
    var readers = arrayFromTo(0, numReaders - 1).map(item => mul(DelayTap(buf, timesArray[item]), levelsArray[item]));
    return mrg(sum(readers), writer);
}

function Osc1(buf, dur) {
    var numChan = 1;
    var phase = Ln(0, sub(BufFrames(buf), 1), dur);
    var loop = 0;
    var interpolation = 2;
    return BufRd(numChan, buf, phase, loop, interpolation);
}
