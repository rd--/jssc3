// sc3-pseudo.ts ; requries: sc3-bindings sc3-envelope sc3-ugen

// wrapOut(0, mul(SinOsc(440, 0), 0.1))
function wrapOut(bus: Signal, ugen: Signal): Signal {
    return isOutUgen(ugen) ? ugen : Out(bus, ugen);
}

function ADSR(gate: Signal, attackTime: Signal, decayTime: Signal, sustainLevel: Signal, releaseTime: Signal, curve: Signal): Signal {
    var env = EnvADSR(attackTime, decayTime, sustainLevel, releaseTime, 1, curve);
    return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

function ASR(gate: Signal, attackTime: Signal, releaseTime: Signal, curve: Signal): Signal {
    var env = EnvASR(attackTime, 1, releaseTime, curve);
    return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

function Cutoff(sustainTime: Signal, releaseTime: Signal, curve: Signal): Signal {
    var env = EnvCutoff(sustainTime, releaseTime, curve);
    return EnvGen(1, 1, 0, 1, 0, envCoord(env));
}

function signalLength(aSignal: Signal): number {
    if(Array.isArray(aSignal)) {
        return (aSignal).length;
    } else {
        return 1;
    }
}

function Splay(inArray: Signal, spread: Signal, level: Signal, center: Signal, levelComp: Signal): Signal {
    var n = Math.max(2, signalLength(inArray));
    var pos = arrayFromTo(0, n - 1).map(item => add(mul(sub(mul(item, fdiv(2, sub(n, 1))), 1), spread), center));
    var lvl = mul(level, levelComp ? sqrt(1 / n) : 1);
    consoleDebug('Splay', n, pos, lvl);
    return sum(<Signal[]>Pan2(inArray, pos, lvl));
}

function Splay2(inArray: Signal): Signal {
    var n = Math.max(2, signalLength(inArray));
    var pos = arrayFromTo(0, n - 1).map(item => item * (2 / (n - 1)) - 1);
    var lvl = Math.sqrt(1 / n);
    consoleDebug('Splay2', n, pos, lvl);
    return sum(<Signal[]>Pan2(inArray, pos, lvl));
}

function LinLin(input: Signal, srclo: Signal, srchi: Signal, dstlo: Signal, dsthi: Signal): Signal {
    var scale  = fdiv(sub(dsthi, dstlo), sub(srchi, srclo));
    var offset = sub(dstlo, mul(scale, srclo));
    return add(mul(input, scale), offset);
}

function InFb(numChannels: number, bus: Signal): Signal {
    return InFeedback(numChannels, bus);
}

function Select2(predicate: Signal, ifTrue: Signal, ifFalse: Signal): Signal {
    return add(mul(predicate, sub(ifTrue, ifFalse)), ifFalse);
}

function TChoose(trig: Signal, array: Signal): Signal {
    return Select(TIRand(0, signalLength(array) - 1, trig), array);
}

function PMOsc(carfreq: Signal, modfreq: Signal, pmindex: Signal, modphase: Signal): Signal {
    return SinOsc(carfreq, mul(SinOsc(modfreq, modphase), pmindex));
}

function XLn(start: Signal, end: Signal, dur: Signal): Signal {
    return XLine(start, end, dur, 0);
}

function DmdFor(dur: Signal, reset: Signal, level: Signal): Signal {
    return Duty(dur, reset, 0, level);
}

function TDmdFor(dur: Signal, reset: Signal, level: Signal): Signal {
    return TDuty(dur, reset, 0, level, 0);
}

function DmdOn(trig: Signal, reset: Signal, demandUGens: Signal): Signal {
    return Demand(trig, reset, demandUGens);
}

var Seq = Dseq;
var Ser = Dseries;
var Shuf = Dshuf;
var Choose = Drand;

function Ln(start: Signal, end: Signal, dur: Signal): Signal {
        return Line(start, end, dur, 0);
}

function TLine(start: Signal, end: Signal, dur: Signal, trig: Signal): Signal {
    var env = Env([start, start, end], [0, dur], 'lin', null, null, 0);
    return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}

function TXLine(start: Signal, end: Signal, dur: Signal, trig: Signal): Signal {
    var env = Env([start, start, end], [0, dur], 'exp', null, null, 0);
    return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}

function bitShiftRight(a: Signal, b: Signal): Signal {
    return shiftRight(a, b);
}

function AudioIn(channels: Signal): Signal {
    return In(1, sub(add(NumOutputBuses(), channels), 1));
}

function AudioOut(channelsArray: Signal): Signal {
    return Out(0, channelsArray);
}

/*
note that mrg places q in p, and here q has a reference to p, so the traversal of the mrg node must not recurse

b = asLocalBuf([0, 2, 4, 5, 7, 9, 11]);
ugenTraverseCollecting(b, ...)
*/
function asLocalBuf(array: Signal): Signal {
    var k = signalLength(array);
    var p = LocalBuf(1, k);
    var q = SetBuf(p, 0, k, array);
    return mrg(p, q);
}

function clearBuf(buf: Signal): Signal {
    return mrg(buf, ClearBuf(buf));
}

function BufRec(bufnum: Signal, reset: Signal, inputArray: Signal): Signal {
    return RecordBuf(bufnum, 0, 1, 0, 1, 1, reset, 0, inputArray);
}

var BufAlloc = LocalBuf;

// Reshape input arrays, and allow amp and time to be null (defaulting to 1)
function asKlankSpec(freq: Signal, amp: Signal | null, time: Signal | null): Signal {
    var n = signalLength(freq);
    var a = [freq, amp || arrayReplicate(n, 1), time || arrayReplicate(n, 1)];
    consoleDebug('asKlankSpec', a);
    return arrayConcatenation(arrayTranspose(arrayExtendToBeOfEqualSize(a)));
}

function RingzBank(input: Signal, freq: Signal, amp: Signal, time: Signal): Signal {
    return Klank(input, 1, 0, 1, asKlankSpec(freq, amp, time));
}

function SinOscBank(freq: Signal, amp: Signal, time: Signal): Signal {
    return Klang(1, 0, asKlankSpec(freq, amp, time));
}

function LinSeg(gate: Signal, coordArray: Signal[]): Signal {
    var coord = arrayTranspose(arrayClump(coordArray, 2));
    var levels = first(coord);
    var times = second(coord);
    var env = Env(levels, times.slice(0, times.length - 1), 'lin', null, null, 0);
    return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

function SelectX(which: Signal, array: Signal): Signal {
    return XFade2(
        Select(roundTo(which, 2), array),
	Select(add(truncateTo(which, 2), 1), array),
	fold2(sub(mul(which, 2), 1), 1),
        1
    );
}

function unitCps(a: Signal): Signal {
    return midiCps(mul(a, 127));
}

// Read a signal from a control bus.
function ControlIn(numChan: number, bus: Signal): Signal {
    return kr(In(numChan, bus));
}

function SfFrames(sfBufferArray: Signal): Signal {
    return BufFrames(arrayFirst(arrayAsArray(sfBufferArray)));
}

function SfDur(sfBufferArray: Signal): Signal {
    return BufDur(arrayFirst(arrayAsArray(sfBufferArray)));
}

function SfSampleRate(sfBufferArray: Signal): Signal {
    return BufSampleRate(arrayFirst(arrayAsArray(sfBufferArray)));
}

function SfRateScale(sfBufferArray: Signal): Signal {
    return BufRateScale(arrayFirst(arrayAsArray(sfBufferArray)));
}

function SfRead(sfBufferArray: Signal, phase: Signal, loop: Signal, interpolation: Signal): Signal {
    return BufRd(1, sfBufferArray, phase, loop, interpolation);
}

function SfPlay(sfBufferArray: Signal, rate: Signal, trigger: Signal, startPos: Signal, loop: Signal): Signal {
    return PlayBuf(1, sfBufferArray, rate, trigger, startPos, loop, 0);
}

function DelayWrite(bufnum: Signal, input: Signal): Signal {
    return RecordBuf(bufnum, 0, 1, 0, 1, 1, 1, 0, [input]);
}

function DelayTap(bufnum: Signal, delayTime: Signal): Signal {
    return PlayBuf(1, bufnum, 1, 1, mul(sub(BufDur(bufnum), delayTime), SampleRate()), 1, 0);
}

function PingPongDelay(left: Signal, right: Signal, maxDelayTime: Signal, delayTime: Signal, feedback: Signal): Signal {
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

function MultiTapDelay(timesArray: number[], levelsArray: Signal[], input: Signal): Signal {
    var delayFrames = mul(arrayMaxItem(timesArray), SampleRate());
    var buf = clearBuf(BufAlloc(1, delayFrames));
    var writer = DelayWrite(buf, input);
    var numReaders = timesArray.length;
    var readers = arrayFromTo(0, numReaders - 1).map(item => mul(DelayTap(buf, timesArray[item]), levelsArray[item]));
    return mrg(sum(readers), writer);
}

function Osc1(buf: Signal, dur: Signal): Signal {
    var numChan = 1;
    var phase = Ln(0, sub(BufFrames(buf), 1), dur);
    var loop = 0;
    var interpolation = 2;
    return BufRd(numChan, buf, phase, loop, interpolation);
}
