import { isArray, asArray, arrayClump, arrayConcatenation, arrayExtendToBeOfEqualSize, arrayFirst, arrayFromTo, arrayMaxItem, arrayReduce, arrayReplicate, arraySecond, arrayTranspose } from '../kernel/array.ts'
import { consoleDebug } from '../kernel/error.ts'

import { Maybe, fromMaybe } from '../stdlib/maybe.ts'

import { BufDur, BufFrames, BufRateScale, BufRd, BufSampleRate, BufWr, ClearBuf, Demand, Dseq, Dseries, Drand, Dshuf, Duty, EnvGen, In, InFeedback, Klang, Klank, Line, LocalBuf, NumOutputBuses, Out, Phasor, Pan2, PlayBuf, RecordBuf, SampleRate, Select, SetBuf, SinOsc, TDuty, TIRand, Wrap, XFade2, XLine, add, fdiv, fold2, midiCps, mul, roundTo, shiftRight, sqrt, sub, trunc } from './bindings.ts'
import { Env, EnvAdsr, EnvAsr, EnvCutoff, EnvRelease, envCoord } from './envelope.ts'
import { Signal, isOutUgen, kr, mrg } from './ugen.ts'

// wrapOut(0, mul(SinOsc(440, 0), 0.1))
export function wrapOut(bus: Signal, ugen: Signal): Signal {
	return isOutUgen(ugen) ? ugen : Out(bus, ugen);
}

export function Adsr(gate: Signal, attackTime: Signal, decayTime: Signal, sustainLevel: Signal, releaseTime: Signal, curve: Signal): Signal {
	const env = EnvAdsr(attackTime, decayTime, sustainLevel, releaseTime, 1, curve);
	return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

export function Asr(gate: Signal, attackTime: Signal, releaseTime: Signal, curve: Signal): Signal {
	const env = EnvAsr(attackTime, 1, releaseTime, curve);
	return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

export function Cutoff(sustainTime: Signal, releaseTime: Signal, curve: Signal): Signal {
	const env = EnvCutoff(sustainTime, releaseTime, curve);
	return EnvGen(1, 1, 0, 1, 0, envCoord(env));
}

export function signalLength(aSignal: Signal): number {
	if(isArray(aSignal)) {
		return (aSignal).length;
	} else {
		return 1;
	}
}

export function Splay(inArray: Signal, spread: Signal, level: Signal, center: Signal, levelComp: Signal): Signal {
	const n = Math.max(2, signalLength(inArray));
	const pos = arrayFromTo(0, n - 1).map(item => add(mul(sub(mul(item, fdiv(2, sub(n, 1))), 1), spread), center));
	const lvl = mul(level, levelComp ? sqrt(1 / n) : 1);
	consoleDebug(`Splay: ${[n, pos, lvl]}`);
	return arrayReduce(<Signal[]>Pan2(inArray, pos, lvl), add);
}

export function Splay2(inArray: Signal): Signal {
	const n = Math.max(2, signalLength(inArray));
	const pos = arrayFromTo(0, n - 1).map(item => item * (2 / (n - 1)) - 1);
	const lvl = Math.sqrt(1 / n);
	consoleDebug(`Splay2: ${[n, pos, lvl]}`);
	return arrayReduce(<Signal[]>Pan2(inArray, pos, lvl), add);
}

export function LinLin(input: Signal, srclo: Signal, srchi: Signal, dstlo: Signal, dsthi: Signal): Signal {
	const scale  = fdiv(sub(dsthi, dstlo), sub(srchi, srclo));
	const offset = sub(dstlo, mul(scale, srclo));
	return add(mul(input, scale), offset);
}

export function InFb(numChannels: number, bus: Signal): Signal {
	return InFeedback(numChannels, bus);
}

export function Select2(predicate: Signal, ifTrue: Signal, ifFalse: Signal): Signal {
	return add(mul(predicate, sub(ifTrue, ifFalse)), ifFalse);
}

export function TChoose(trig: Signal, array: Signal): Signal {
	return Select(TIRand(0, signalLength(array) - 1, trig), array);
}

export function PMOsc(carfreq: Signal, modfreq: Signal, pmindex: Signal, modphase: Signal): Signal {
	return SinOsc(carfreq, mul(SinOsc(modfreq, modphase), pmindex));
}

export function XLn(start: Signal, end: Signal, dur: Signal): Signal {
	return XLine(start, end, dur, 0);
}

export function DmdFor(dur: Signal, reset: Signal, level: Signal): Signal {
	return Duty(dur, reset, 0, level);
}

export function TDmdFor(dur: Signal, reset: Signal, level: Signal): Signal {
	return TDuty(dur, reset, 0, level, 0);
}

export function DmdOn(trig: Signal, reset: Signal, demandUgens: Signal): Signal {
	return Demand(trig, reset, demandUgens);
}

export const Seq = Dseq;
export const Ser = Dseries;
export const Shuf = Dshuf;
export const Choose = Drand;

export function Ln(start: Signal, end: Signal, dur: Signal): Signal {
		return Line(start, end, dur, 0);
}

export function TLine(start: Signal, end: Signal, dur: Signal, trig: Signal): Signal {
	const env = Env([start, start, end], [0, dur], 'lin', null, null, 0);
	return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}

export function TXLine(start: Signal, end: Signal, dur: Signal, trig: Signal): Signal {
	const env = Env([start, start, end], [0, dur], 'exp', null, null, 0);
	return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}

export function bitShiftRight(a: Signal, b: Signal): Signal {
	return shiftRight(a, b);
}

export function AudioIn(channels: Signal): Signal {
	return In(1, sub(add(NumOutputBuses(), channels), 1));
}

export function AudioOut(channelsArray: Signal): Signal {
	return Out(0, channelsArray);
}

/*
note that mrg places q in p, and here q has a reference to p, so the traversal of the mrg node must not recurse

b = asLocalBuf([0, 2, 4, 5, 7, 9, 11]);
ugenTraverseCollecting(b, ...)
*/
export function asLocalBuf(array: Signal): Signal {
	const k = signalLength(array);
	const p = LocalBuf(1, k);
	const q = SetBuf(p, 0, k, array);
	return mrg(p, q);
}

export function clearBuf(buf: Signal): Signal {
	return mrg(buf, ClearBuf(buf));
}

export function BufRec(bufnum: Signal, reset: Signal, inputArray: Signal): Signal {
	return RecordBuf(bufnum, 0, 1, 0, 1, 1, reset, 0, inputArray);
}

export const BufAlloc = LocalBuf;

export function BufWrite(bufnum: Signal, phase: Signal, loop: Signal, inputArray: Signal): Signal {
	return BufWr(inputArray, bufnum, phase, loop);
}

// Reshape input arrays, and allow amp and time to be null (defaulting to 1)
export function asKlankSpec(freq: Signal, amp: Maybe<Signal>, time: Maybe<Signal>): Signal {
	const n = signalLength(freq);
	const a = [freq, fromMaybe(amp, arrayReplicate(n, 1)), fromMaybe(time, arrayReplicate(n, 1))];
	consoleDebug(`asKlankSpec: ${a}`);
	return arrayConcatenation(arrayTranspose(arrayExtendToBeOfEqualSize(a)));
}

export function RingzBank(input: Signal, freq: Signal, amp: Signal, time: Signal): Signal {
	return Klank(input, 1, 0, 1, asKlankSpec(freq, amp, time));
}

export function SinOscBank(freq: Signal, amp: Signal, time: Signal): Signal {
	return Klang(1, 0, asKlankSpec(freq, amp, time));
}

export function LinSeg(gate: Signal, coordArray: Signal[]): Signal {
	const coord = arrayTranspose(arrayClump(coordArray, 2));
	const levels = arrayFirst(coord);
	const times = arraySecond(coord);
	const env = Env(levels, times.slice(0, times.length - 1), 'lin', null, null, 0);
	return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

export function SelectX(which: Signal, array: Signal): Signal {
	return XFade2(
		Select(roundTo(which, 2), array),
		Select(add(trunc(which, 2), 1), array),
		fold2(sub(mul(which, 2), 1), 1),
		1
	);
}

export function unitCps(a: Signal): Signal {
	return midiCps(mul(a, 127));
}

// Read a signal from a control bus.
export function ControlIn(numChan: number, bus: Signal): Signal {
	return kr(In(numChan, bus));
}

export function SfFrames(sfBufferArray: Signal): Signal {
	return BufFrames(arrayFirst(asArray(sfBufferArray)));
}

export function SfDur(sfBufferArray: Signal): Signal {
	return BufDur(arrayFirst(asArray(sfBufferArray)));
}

export function SfSampleRate(sfBufferArray: Signal): Signal {
	return BufSampleRate(arrayFirst(asArray(sfBufferArray)));
}

export function SfRateScale(sfBufferArray: Signal): Signal {
	return BufRateScale(arrayFirst(asArray(sfBufferArray)));
}

export function SfRead(sfBufferArray: Signal, phase: Signal, loop: Signal, interpolation: Signal): Signal {
	return BufRd(1, sfBufferArray, phase, loop, interpolation);
}

export function SfPlay(sfBufferArray: Signal, rate: Signal, trigger: Signal, startPos: Signal, loop: Signal): Signal {
	return PlayBuf(1, sfBufferArray, rate, trigger, startPos, loop, 0);
}

export function DelayWrite(bufnum: Signal, input: Signal): Signal {
	return RecordBuf(bufnum, 0, 1, 0, 1, 1, 1, 0, [input]);
}

export function DelayTap(bufnum: Signal, delayTime: Signal): Signal {
	return PlayBuf(1, bufnum, 1, 1, mul(sub(BufDur(bufnum), delayTime), SampleRate()), 1, 0);
}

export function PingPongDelay(left: Signal, right: Signal, maxDelayTime: Signal, delayTime: Signal, feedback: Signal): Signal {
	const delaySize = mul(maxDelayTime, SampleRate());
	const phase = Phasor(0, 1, 0, delaySize, 0);
	const leftBuffer = clearBuf(BufAlloc(1, delaySize)); // allocate a buffer for the left delay line
	const rightBuffer = clearBuf(BufAlloc(1, delaySize)); // allocate a buffer for the right delay line
	const leftDelayedSignal = BufRd(1, leftBuffer, Wrap(sub(phase, mul(delayTime, SampleRate())), 0, delaySize), 1, 2); // tap the left delay line
	const rightDelayedSignal = BufRd(1, rightBuffer, Wrap(sub(phase, mul(delayTime, SampleRate())), 0, delaySize), 1, 2); // tap the left delay line
	const output = [add(leftDelayedSignal, left), add(rightDelayedSignal, right)]; // mix the delayed signal with the input
	const writer = DelayWrite([rightBuffer, leftBuffer], mul(output, feedback)); // feedback to buffers in reverse order
	return mrg(output, writer);  // output the mixed signal and force the DelayWr into the call graph
}

export function MultiTapDelay(timesArray: number[], levelsArray: Signal[], input: Signal): Signal {
	const delayFrames = mul(arrayMaxItem(timesArray), SampleRate());
	const buf = clearBuf(BufAlloc(1, delayFrames));
	const writer = DelayWrite(buf, input);
	const numReaders = timesArray.length;
	const readers = arrayFromTo(0, numReaders - 1).map(item => mul(DelayTap(buf, timesArray[item]), levelsArray[item]));
	return mrg(arrayReduce(readers, add), writer);
}

export function Osc1(buf: Signal, dur: Signal): Signal {
	const numChan = 1;
	const phase = Ln(0, sub(BufFrames(buf), 1), dur);
	const loop = 0;
	const interpolation = 2;
	return BufRd(numChan, buf, phase, loop, interpolation);
}

export function Release(input: Signal, attackTime: Signal, dur: Signal, releaseTime: Signal): Signal {
	const env = EnvRelease(attackTime, dur, releaseTime)
	return mul(input, EnvGen(1, 1, 0, 1, 2, envCoord(env)));
}
