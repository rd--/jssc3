import {
	arrayClump,
	arrayConcatenation,
	arrayExtendToBeOfEqualSize,
	arrayFirst,
	arrayFromTo,
	arrayMaxItem,
	arrayProduct,
	arrayReduce,
	arrayReplicate,
	arraySecond,
	arraySize,
	arrayTranspose,
	asArray,
} from '../kernel/array.ts';
import { throwError } from '../kernel/error.ts';

import { fromMaybe, Maybe } from '../stdlib/maybe.ts';
import { Forest, treeShape } from '../stdlib/tree.ts';

import {
	Abs,
	Add,
	BHiPass,
	BLowPass,
	BufDur,
	BufFrames,
	BufRateScale,
	BufRd,
	BufSampleRate,
	BufWr,
	ClearBuf,
	Compander,
	Dc,
	DelayN,
	Duty,
	EnvGen,
	Fdiv,
	Fold2,
	Gt,
	Hpz1,
	Impulse,
	In,
	InFeedback,
	Klang,
	Klank,
	Line,
	LocalBuf,
	MidiCps,
	Mul,
	NumOutputBuses,
	Out,
	Pan2,
	Phasor,
	PlayBuf,
	RecordBuf,
	Ringz,
	RoundTo,
	SampleRate,
	Select,
	SetBuf,
	SinOsc,
	Sqrt,
	Sub,
	TDuty,
	TiRand,
	Trunc,
	TwIndex,
	Wrap,
	XFade2,
	XLine,
} from './bindings.ts';
import {
	Env,
	EnvAdsr,
	EnvAsr,
	envCoord,
	EnvCurveSeq,
	EnvCutoff,
	EnvPerc,
	EnvRelease,
	EnvSine,
} from './envelope.ts';
import {
	isOutputSignal,
	isOutUgen,
	kr,
	multipleRootGraph,
	Signal,
	signalSize,
} from './ugen.ts';

// wrapOut(0, Mul(SinOsc(440, 0), 0.1))
export function wrapOut(bus: Signal, ugen: Signal): Signal {
	if (isOutUgen(ugen)) {
		return ugen;
	} else {
		if (isOutputSignal(ugen)) {
			return Out(bus, ugen);
		} else {
			console.error('wrapOut', bus, ugen);
			throwError('wrapOut: not output signal');
			return Out(bus, Dc(0));
		}
	}
}

export function Adsr(
	gate: Signal,
	attackTime: Signal,
	decayTime: Signal,
	sustainLevel: Signal,
	releaseTime: Signal,
	curve: EnvCurveSeq,
): Signal {
	const env = EnvAdsr(
		attackTime,
		decayTime,
		sustainLevel,
		releaseTime,
		1,
		curve,
	);
	return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

export function Asr(
	gate: Signal,
	attackTime: Signal,
	releaseTime: Signal,
	curve: EnvCurveSeq,
): Signal {
	const env = EnvAsr(attackTime, 1, releaseTime, curve);
	return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

export function Cutoff(
	sustainTime: Signal,
	releaseTime: Signal,
	curve: EnvCurveSeq,
): Signal {
	const env = EnvCutoff(sustainTime, releaseTime, curve);
	return EnvGen(1, 1, 0, 1, 0, envCoord(env));
}

/* Cf.<https://github.com/supercollider/supercollider/issues/5706>
Note: Deleting the sqrt in Splay can dramatically alter feedback paths. */
export function Splay(
	inArray: Signal,
	spread: Signal,
	level: Signal,
	center: Signal,
	levelComp: boolean,
): Signal {
	const n = Math.max(2, signalSize(inArray));
	const pos = arrayFromTo(0, n - 1).map(function (item) {
		return Add(Mul(Sub(Mul(item, Fdiv(2, Sub(n, 1))), 1), spread), center);
	});
	const lvl = Mul(level, levelComp ? Math.sqrt(1 / n) : 1);
	// console.debug(`Splay: ${[n, pos, lvl]}`);
	return arrayReduce(<Signal[]> Mul(Pan2(inArray, pos, 1), lvl), Add);
}

// Cf.<https://github.com/supercollider/supercollider/issues/5706>
export function Splay2(inArray: Signal): Signal {
	const spread = 1;
	const center = 0;
	const n = Math.max(2, signalSize(inArray));
	const pos = arrayFromTo(0, n - 1).map(function (item) {
		return (item * (2 / (n - 1)) - 1) * spread + center;
	});
	const lvl = Math.sqrt(1 / n);
	// console.debug(`Splay2: ${[n, pos, lvl]}`);
	return arrayReduce(<Signal[]> Pan2(inArray, pos, lvl), Add);
}

export function LinLin(
	input: Signal,
	srclo: Signal,
	srchi: Signal,
	dstlo: Signal,
	dsthi: Signal,
): Signal {
	const scale = Fdiv(Sub(dsthi, dstlo), Sub(srchi, srclo));
	const offset = Sub(dstlo, Mul(scale, srclo));
	return Add(Mul(input, scale), offset);
}

export function InFb(numChannels: number, bus: Signal): Signal {
	return InFeedback(numChannels, bus);
}

export function Select2(
	predicate: Signal,
	ifTrue: Signal,
	ifFalse: Signal,
): Signal {
	return Add(Mul(predicate, Sub(ifTrue, ifFalse)), ifFalse);
}

export function TChoose(trig: Signal, array: Signal): Signal {
	return Select(TiRand(0, signalSize(array) - 1, trig), array);
}

export function TwChoose(
	trig: Signal,
	array: Signal,
	weights: Signal,
	normalize: Signal,
): Signal {
	return Select(TwIndex(trig, normalize, weights), array);
}

export function PmOsc(
	carfreq: Signal,
	modfreq: Signal,
	pmindex: Signal,
	modphase: Signal,
): Signal {
	return SinOsc(carfreq, Mul(SinOsc(modfreq, modphase), pmindex));
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

export function Ln(start: Signal, end: Signal, dur: Signal): Signal {
	return Line(start, end, dur, 0);
}

export function TLine(
	start: Signal,
	end: Signal,
	dur: Signal,
	trig: Signal,
): Signal {
	const env = new Env([start, start, end], [0, dur], 'lin', null, null, 0);
	return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}

export function TxLine(
	start: Signal,
	end: Signal,
	dur: Signal,
	trig: Signal,
): Signal {
	const env = new Env([start, start, end], [0, dur], 'exp', null, null, 0);
	return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}

export function AudioIn(channels: Signal): Signal {
	return In(1, Sub(Add(NumOutputBuses(), channels), 1));
}

export function AudioOut(channelsArray: Signal): Signal {
	return Out(0, channelsArray);
}

/*
note that multipleRootGraph places q in p, and here q has a reference to p, so the traversal of the multipleRootGraph node must not recurse

b = asLocalBuf([0, 2, 4, 5, 7, 9, 11]);
ugenTraverseCollecting(b, ...)
*/
export function asLocalBuf(aSignal: Forest<number>): Signal {
	let shape = treeShape(aSignal);
	if (arraySize(shape) > 2) {
		throwError('LocalBuf: list has not the right shape');
		return 0;
	} else {
		let array = null;
		if (arraySize(shape) === 1) {
			shape = [1, arraySize(aSignal)];
			array = aSignal;
		} else {
			array = arrayConcatenation(arrayTranspose(<number[][]> aSignal));
		}
		const lhs = LocalBuf(shape[0], shape[1]);
		const rhs = SetBuf(lhs, 0, arrayProduct(shape), array);
		return multipleRootGraph(lhs, rhs);
	}
}

export function BufClear(buf: Signal): Signal {
	return multipleRootGraph(buf, ClearBuf(buf));
}

export function BufRec(
	bufnum: Signal,
	reset: Signal,
	inputArray: Signal,
): Signal {
	return RecordBuf(bufnum, 0, 1, 0, 1, 1, reset, 0, inputArray);
}

export const BufAlloc = LocalBuf;

export function BufWrite(
	inputArray: Signal,
	bufnum: Signal,
	phase: Signal,
	loop: Signal,
): Signal {
	return BufWr(bufnum, phase, loop, inputArray);
}

// Reshape input arrays, and allow amp and time to be null (defaulting to 1)
export function asKlankSpec(
	freq: Signal,
	amp: Maybe<Signal>,
	time: Maybe<Signal>,
): Signal {
	const n = signalSize(freq);
	const a = [
		freq,
		fromMaybe(amp, arrayReplicate(n, 1)),
		fromMaybe(time, arrayReplicate(n, 1)),
	];
	// console.debug(`asKlankSpec: ${a}`);
	return arrayConcatenation(arrayTranspose(arrayExtendToBeOfEqualSize(1, a)));
}

export function RingzBank(
	input: Signal,
	freq: Signal,
	amp: Signal,
	time: Signal,
): Signal {
	return Klank(input, 1, 0, 1, asKlankSpec(freq, amp, time));
}

export function SinOscBank(freq: Signal, amp: Signal, time: Signal): Signal {
	return Klang(1, 0, asKlankSpec(freq, amp, time));
}

export function LinSeg(gate: Signal, coordArray: Signal[]): Signal {
	const coord = arrayTranspose(arrayClump(coordArray, 2));
	const levels = arrayFirst(coord);
	const times = arraySecond(coord);
	const env = new Env(
		levels,
		times.slice(0, times.length - 1),
		'lin',
		null,
		null,
		0,
	);
	return EnvGen(gate, 1, 0, 1, 0, envCoord(env));
}

export function SelectX(which: Signal, array: Signal): Signal {
	return XFade2(
		Select(RoundTo(which, 2), array),
		Select(Add(Trunc(which, 2), 1), array),
		Fold2(Sub(Mul(which, 2), 1), 1),
		1,
	);
}

export function UnitCps(a: Signal): Signal {
	return MidiCps(Mul(a, 100));
}

// Read a signal from a control bus.
export function ControlIn(numChannels: number, bus: Signal): Signal {
	return kr(In(numChannels, bus));
}

// Write a signal to a control bus.
export function ControlOut(bus: Signal, channelsArray: Signal): Signal {
	return Out(bus, kr(channelsArray));
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

export function SfRead(
	sfBufferArray: Signal,
	phase: Signal,
	loop: Signal,
	interpolation: Signal,
): Signal {
	return BufRd(1, sfBufferArray, phase, loop, interpolation);
}

export function SfPlay(
	sfBufferArray: Signal,
	rate: Signal,
	trigger: Signal,
	startPos: Signal,
	loop: Signal,
): Signal {
	return PlayBuf(1, sfBufferArray, rate, trigger, startPos, loop, 0);
}

export function DelayWrite(bufnum: Signal, input: Signal): Signal {
	return RecordBuf(bufnum, 0, 1, 0, 1, 1, 1, 0, [input]);
}

export function DelayTap(bufnum: Signal, delayTime: Signal): Signal {
	return PlayBuf(
		1,
		bufnum,
		1,
		1,
		Mul(Sub(BufDur(bufnum), delayTime), SampleRate()),
		1,
		0,
	);
}

export function PingPongDelay(
	left: Signal,
	right: Signal,
	maxDelayTime: Signal,
	delayTime: Signal,
	feedback: Signal,
): Signal {
	const delaySize = Mul(maxDelayTime, SampleRate());
	const phase = Phasor(0, 1, 0, delaySize, 0);
	const leftBuffer = BufClear(BufAlloc(1, delaySize)); // allocate a buffer for the left delay line
	const rightBuffer = BufClear(BufAlloc(1, delaySize)); // allocate a buffer for the right delay line
	const leftDelayedSignal = BufRd(
		1,
		leftBuffer,
		Wrap(Sub(phase, Mul(delayTime, SampleRate())), 0, delaySize),
		1,
		2,
	); // tap the left delay line
	const rightDelayedSignal = BufRd(
		1,
		rightBuffer,
		Wrap(Sub(phase, Mul(delayTime, SampleRate())), 0, delaySize),
		1,
		2,
	); // tap the left delay line
	const output = [Add(leftDelayedSignal, left), Add(rightDelayedSignal, right)]; // mix the delayed signal with the input
	const writer = DelayWrite([rightBuffer, leftBuffer], Mul(output, feedback)); // feedback to buffers in reverse order
	return multipleRootGraph(output, writer); // output the mixed signal and force the DelayWr into the call graph
}

export function MultiTapDelay(
	timesArray: number[],
	levelsArray: Signal[],
	input: Signal,
): Signal {
	const delayFrames = Mul(arrayMaxItem(timesArray), SampleRate());
	const buf = BufClear(BufAlloc(1, delayFrames));
	const writer = DelayWrite(buf, input);
	const numReaders = timesArray.length;
	const readers = arrayFromTo(0, numReaders - 1).map((item) =>
		Mul(DelayTap(buf, timesArray[item]), levelsArray[item])
	);
	return multipleRootGraph(arrayReduce(readers, Add), writer);
}

export function Osc1(buf: Signal, dur: Signal): Signal {
	const numChannels = 1;
	const phase = Ln(0, Sub(BufFrames(buf), 1), dur);
	const loop = 0;
	const interpolation = 2;
	return BufRd(numChannels, buf, phase, loop, interpolation);
}

export function Release(
	input: Signal,
	attackTime: Signal,
	dur: Signal,
	releaseTime: Signal,
): Signal {
	const env = EnvRelease(attackTime, dur, releaseTime);
	return Mul(input, EnvGen(1, 1, 0, 1, 2, envCoord(env)));
}

export function Sine(trig: Signal, dur: Signal): Signal {
	return EnvGen(trig, 1, 0, 1, 0, envCoord(EnvSine(dur)));
}

export function Perc(
	trig: Signal,
	attackTime: Signal,
	releaseTime: Signal,
	curve: EnvCurveSeq,
): Signal {
	return EnvGen(
		trig,
		1,
		0,
		1,
		0,
		envCoord(EnvPerc(attackTime, releaseTime, 1, curve)),
	);
}

export function DynRingzBank(
	input: Signal,
	freq: Signal,
	amp: Signal,
	time: Signal,
): Signal {
	return arrayReduce(<Signal[]> Mul(Ringz(input, freq, time), amp), Add);
}

export function Changed(input: Signal, threshold: Signal): Signal {
	return Gt(Abs(Hpz1(input)), threshold);
}

export function BLowPass4(input: Signal, freq: Signal, rq: Signal): Signal {
	const sqrtRq = Sqrt(rq);
	return BLowPass(BLowPass(input, freq, sqrtRq), freq, sqrtRq);
}

export function BHiPass4(input: Signal, freq: Signal, rq: Signal): Signal {
	const sqrtRq = Sqrt(rq);
	return BHiPass(BHiPass(input, freq, sqrtRq), freq, sqrtRq);
}

export function EqPan2(input: Signal, pos: Signal): Signal {
	return Pan2(input, pos, 1);
}

export function VarLag(
	input: Signal,
	time: Signal,
	curve: EnvCurveSeq,
): Signal {
	const env = new Env([input, input], [time], curve, null, null, 0);
	const timeChanged = (typeof time === 'number') ? 0 : Changed(time, 0);
	const trig = Add(Add(Changed(input, 0), timeChanged), Impulse(0, 0));
	return EnvGen(trig, 1, 0, 1, 0, envCoord(env));
}

export function CompanderD(
	input: Signal,
	thresh: Signal,
	slopeBelow: Signal,
	slopeAbove: Signal,
	clampTime: Signal,
	relaxTime: Signal,
): Signal {
	return Compander(
		DelayN(input, clampTime, clampTime),
		input,
		thresh,
		slopeBelow,
		slopeAbove,
		clampTime,
		relaxTime,
	);
}
