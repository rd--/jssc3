import {
	arrayConcat,
	arrayLength,
	asArray,
	ScalarOrArray,
} from '../kernel/array.ts';

import { rateAr, rateDr, rateIr, rateKr } from './rate.ts';
import { BinaryOp, makeUgen, Signal, UnaryOp } from './ugen.ts';

// Audio to control rate converter.
export function A2K(input: Signal): Signal {
	return makeUgen('A2K', 1, rateKr, 0, [input]);
}
// Schroeder allpass delay line with cubic interpolation.
export function AllpassC(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
	decaytime: Signal,
): Signal {
	return makeUgen('AllpassC', 1, [0], 0, [
		input,
		maxdelaytime,
		delaytime,
		decaytime,
	]);
}
// Schroeder allpass delay line with linear interpolation.
export function AllpassL(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
	decaytime: Signal,
): Signal {
	return makeUgen('AllpassL', 1, [0], 0, [
		input,
		maxdelaytime,
		delaytime,
		decaytime,
	]);
}
// Schroeder allpass delay line with no interpolation.
export function AllpassN(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
	decaytime: Signal,
): Signal {
	return makeUgen('AllpassN', 1, [0], 0, [
		input,
		maxdelaytime,
		delaytime,
		decaytime,
	]);
}
// Basic psychoacoustic amplitude compensation.
export function AmpComp(freq: Signal, root: Signal, exp: Signal): Signal {
	return makeUgen('AmpComp', 1, rateAr, 0, [freq, root, exp]);
}
// Basic psychoacoustic amplitude compensation (ANSI A-weighting curve).
export function AmpCompA(
	freq: Signal,
	root: Signal,
	minAmp: Signal,
	rootAmp: Signal,
): Signal {
	return makeUgen('AmpCompA', 1, rateAr, 0, [freq, root, minAmp, rootAmp]);
}
// Amplitude follower
export function Amplitude(
	input: Signal,
	attackTime: Signal,
	releaseTime: Signal,
): Signal {
	return makeUgen('Amplitude', 1, rateAr, 0, [input, attackTime, releaseTime]);
}
// Stereo signal balancer
export function Balance2(
	left: Signal,
	right: Signal,
	pos: Signal,
	level: Signal,
): Signal {
	return makeUgen('Balance2', 2, [0, 1], 0, [left, right, pos, level]);
}
// Band Pass Filter
export function BBandPass(input: Signal, freq: Signal, bw: Signal): Signal {
	return makeUgen('BBandPass', 1, [0], 0, [input, freq, bw]);
}
// Band reject filter
export function BBandStop(input: Signal, freq: Signal, bw: Signal): Signal {
	return makeUgen('BBandStop', 1, [0], 0, [input, freq, bw]);
}
// 3D Ambisonic decoder
export function BfDecode1(
	w: Signal,
	x: Signal,
	y: Signal,
	z: Signal,
	azimuth: Signal,
	elevation: Signal,
	wComp: Signal,
): Signal {
	return makeUgen('BFDecode1', 1, rateAr, 0, [
		w,
		x,
		y,
		z,
		azimuth,
		elevation,
		wComp,
	]);
}
// Ambisonic B format encoder
export function BfEncode1(
	input: Signal,
	azimuth: Signal,
	elevation: Signal,
	rho: Signal,
	gain: Signal,
	wComp: Signal,
): Signal {
	return makeUgen('BFEncode1', 4, rateAr, 0, [
		input,
		azimuth,
		elevation,
		rho,
		gain,
		wComp,
	]);
}
// 12db/oct rolloff - 2nd order resonant  Hi Pass Filter
export function BHiPass(input: Signal, freq: Signal, rq: Signal): Signal {
	return makeUgen('BHiPass', 1, [0], 0, [input, freq, rq]);
}
export function BHiShelf(input: Signal, freq: Signal, rs: Signal, db: Signal): Signal {
	return makeUgen('BHiShelf', 1, [0], 0, [input, freq, rs, db]);
}
// Band limited impulse oscillator.
export function Blip(freq: Signal, numharm: Signal): Signal {
	return makeUgen('Blip', 1, rateAr, 0, [freq, numharm]);
}
// (Undocumented class)
export function BlockSize(): Signal {
	return makeUgen('BlockSize', 1, rateIr, 0, []);
}
// 12db/oct rolloff - 2nd order resonant Low Pass Filter
export function BLowPass(input: Signal, freq: Signal, rq: Signal): Signal {
	return makeUgen('BLowPass', 1, [0], 0, [input, freq, rq]);
}
export function BLowShelf(input: Signal, freq: Signal, rs: Signal, db: Signal): Signal {
	return makeUgen('BLowShelf', 1, [0], 0, [input, freq, rs, db]);
}
// 24db/oct rolloff - 4nd order resonant Low/High/Band Pass Filter
export function BMoog(
	input: Signal,
	freq: Signal,
	q: Signal,
	mode: Signal,
	saturation: Signal,
): Signal {
	return makeUgen('BMoog', 1, [0], 0, [input, freq, q, mode, saturation]);
}
// Parametric equalizer
export function BPeakEq(
	input: Signal,
	freq: Signal,
	rq: Signal,
	db: Signal,
): Signal {
	return makeUgen('BPeakEQ', 1, [0], 0, [input, freq, rq, db]);
}
// 2nd order Butterworth bandpass filter.
export function Bpf(input: Signal, freq: Signal, rq: Signal): Signal {
	return makeUgen('BPF', 1, [0], 0, [input, freq, rq]);
}
// Two zero fixed midpass.
export function Bpz2(input: Signal): Signal {
	return makeUgen('BPZ2', 1, [0], 0, [input]);
}
// 2nd order Butterworth band reject filter.
export function Brf(input: Signal, freq: Signal, rq: Signal): Signal {
	return makeUgen('BRF', 1, [0], 0, [input, freq, rq]);
}
// Brown Noise.
export function BrownNoise(): Signal {
	return makeUgen('BrownNoise', 1, rateAr, 0, []);
}
// Two zero fixed midcut.
export function Brz2(input: Signal): Signal {
	return makeUgen('BRZ2', 1, [0], 0, [input]);
}
// Current duration of soundfile in buffer.
export function BufDur(bufnum: Signal): Signal {
	return makeUgen('BufDur', 1, rateKr, 0, [bufnum]);
}
// Current number of frames allocated in the buffer.
export function BufFrames(bufnum: Signal): Signal {
	return makeUgen('BufFrames', 1, rateKr, 0, [bufnum]);
}
// Buffer rate scaling in respect to server samplerate.
export function BufRateScale(bufnum: Signal): Signal {
	return makeUgen('BufRateScale', 1, rateKr, 0, [bufnum]);
}
// Buffer reading oscillator.
export function BufRd(
	numChan: number,
	bufnum: Signal,
	phase: Signal,
	loop: Signal,
	interpolation: Signal,
): Signal {
	return makeUgen('BufRd', numChan, [1], 0, [
		bufnum,
		phase,
		loop,
		interpolation,
	]);
}
// Buffer sample rate.
export function BufSampleRate(bufnum: Signal): Signal {
	return makeUgen('BufSampleRate', 1, rateKr, 0, [bufnum]);
}
// Buffer writing oscillator.
export function BufWr(
	bufnum: Signal,
	phase: Signal,
	loop: Signal,
	inputArray: Signal,
): Signal {
	return makeUgen(
		'BufWr',
		1,
		[3],
		0,
		arrayConcat([bufnum, phase, loop], asArray(inputArray)),
	);
}
// (Undocumented class)
export function ClearBuf(buf: Signal): Signal {
	return makeUgen('ClearBuf', 1, rateIr, 0, [buf]);
}
// Clip a signal outside given thresholds.
export function Clip(input: Signal, lo: Signal, hi: Signal): Signal {
	return makeUgen('Clip', 1, [0], 0, [input, lo, hi]);
}
// Clip Noise.
export function ClipNoise(): Signal {
	return makeUgen('ClipNoise', 1, rateAr, 0, []);
}
// Statistical gate.
export function CoinGate(prob: Signal, input: Signal): Signal {
	return makeUgen('CoinGate', 1, [1], 0, [prob, input]);
}
// Comb delay line with cubic interpolation.
export function CombC(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
	decaytime: Signal,
): Signal {
	return makeUgen('CombC', 1, [0], 0, [
		input,
		maxdelaytime,
		delaytime,
		decaytime,
	]);
}
// Comb delay line with linear interpolation.
export function CombL(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
	decaytime: Signal,
): Signal {
	return makeUgen('CombL', 1, [0], 0, [
		input,
		maxdelaytime,
		delaytime,
		decaytime,
	]);
}
// Comb delay line with no interpolation.
export function CombN(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
	decaytime: Signal,
): Signal {
	return makeUgen('CombN', 1, [0], 0, [
		input,
		maxdelaytime,
		delaytime,
		decaytime,
	]);
}
// Compressor, expander, limiter, gate, ducker
export function Compander(
	input: Signal,
	control: Signal,
	thresh: Signal,
	slopeBelow: Signal,
	slopeAbove: Signal,
	clampTime: Signal,
	relaxTime: Signal,
): Signal {
	return makeUgen('Compander', 1, [0], 0, [
		input,
		control,
		thresh,
		slopeBelow,
		slopeAbove,
		clampTime,
		relaxTime,
	]);
}
// Duration of one block
export function ControlDur(): Signal {
	return makeUgen('ControlDur', 1, rateIr, 0, []);
}
// Server control rate.
export function ControlRate(): Signal {
	return makeUgen('ControlRate', 1, rateIr, 0, []);
}
// Real-time convolver.
export function Convolution(
	input: Signal,
	kernel: Signal,
	framesize: Signal,
): Signal {
	return makeUgen('Convolution', 1, rateAr, 0, [input, kernel, framesize]);
}
// Chaotic noise function.
export function Crackle(chaosParam: Signal): Signal {
	return makeUgen('Crackle', 1, rateAr, 0, [chaosParam]);
}
// Cusp map chaotic generator
export function CuspL(freq: Signal, a: Signal, b: Signal, xi: Signal): Signal {
	return makeUgen('CuspL', 1, rateAr, 0, [freq, a, b, xi]);
}
// Cusp map chaotic generator
export function CuspN(freq: Signal, a: Signal, b: Signal, xi: Signal): Signal {
	return makeUgen('CuspN', 1, rateAr, 0, [freq, a, b, xi]);
}
// Demand rate brownian movement generator.
export function Dbrown(
	length: Signal,
	lo: Signal,
	hi: Signal,
	step: Signal,
): Signal {
	return makeUgen('Dbrown', 1, rateDr, 0, [length, lo, hi, step]);
}
// Buffer read demand ugen
export function Dbufrd(bufnum: Signal, phase: Signal, loop: Signal): Signal {
	return makeUgen('Dbufrd', 1, rateDr, 0, [bufnum, phase, loop]);
}
// Buffer write demand ugen
export function Dbufwr(
	bufnum: Signal,
	phase: Signal,
	input: Signal,
	loop: Signal,
): Signal {
	return makeUgen('Dbufwr', 1, rateDr, 0, [bufnum, phase, input, loop]);
}
// Create a constant amplitude signal
export function Dc(input: Signal): Signal {
	return makeUgen('DC', 1, rateAr, 0, [input]);
}
// Exponential decay
export function Decay(input: Signal, decayTime: Signal): Signal {
	return makeUgen('Decay', 1, [0], 0, [input, decayTime]);
}
// Exponential decay
export function Decay2(
	input: Signal,
	attackTime: Signal,
	decayTime: Signal,
): Signal {
	return makeUgen('Decay2', 1, [0], 0, [input, attackTime, decayTime]);
}
// 2D Ambisonic B-format decoder.
export function DecodeB2(
	numChan: number,
	w: Signal,
	x: Signal,
	y: Signal,
	orientation: Signal,
): Signal {
	return makeUgen('DecodeB2', numChan, [0, 1, 2], 0, [w, x, y, orientation]);
}
// Convert signal to modal pitch.
export function DegreeToKey(
	bufnum: Signal,
	input: Signal,
	octave: Signal,
): Signal {
	return makeUgen('DegreeToKey', 1, [1], 0, [bufnum, input, octave]);
}
// Single sample delay.
export function Delay1(input: Signal): Signal {
	return makeUgen('Delay1', 1, [0], 0, [input]);
}
// Two sample delay.
export function Delay2(input: Signal): Signal {
	return makeUgen('Delay2', 1, [0], 0, [input]);
}
// Simple delay line with cubic interpolation.
export function DelayC(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
): Signal {
	return makeUgen('DelayC', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
// Simple delay line with linear interpolation.
export function DelayL(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
): Signal {
	return makeUgen('DelayL', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
export function DelayMap(bufNum: Signal, input: Signal, dynamic: Signal, spec: Signal[]): Signal {
	return makeUgen('DelayMap', 1, [1], 0, arrayConcat([bufNum, input, dynamic], spec));
}
// Simple delay line with no interpolation.
export function DelayN(
	input: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
): Signal {
	return makeUgen('DelayN', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
// Demand results from demand rate UGens.
export function Demand(
	trig: Signal,
	reset: Signal,
	demandUGens: Signal,
): Signal {
	return makeUgen(
		'Demand',
		arrayLength(asArray(demandUGens)),
		[0],
		0,
		arrayConcat([trig, reset], asArray(demandUGens)),
	);
}
// Search a buffer for a value
export function DetectIndex(bufnum: Signal, input: Signal): Signal {
	return makeUgen('DetectIndex', 1, [1], 0, [bufnum, input]);
}
// Detect when input falls below an amplitude threshold
export function DetectSilence(
	input: Signal,
	amp: Signal,
	time: Signal,
	doneAction: Signal,
): Signal {
	return makeUgen('DetectSilence', 1, [0], 0, [input, amp, time, doneAction]);
}
// Demand rate input replicator
export function Ddup(n: Signal, input: Signal): Signal {
	return makeUgen('Ddup', 1, rateDr, 0, [n, input]);
}
export function Demultiplexer(numChannels: number, input: Signal, selector: Signal): Signal {
	return makeUgen('Demultiplexer', numChannels, [0], 0, [input, selector]);
}
// Demand rate geometric series UGen
export function Dgeom(start: Signal, grow: Signal, length: Signal): Signal {
	return makeUgen('Dgeom', 1, rateDr, 0, [start, grow, length]);
}
// Demand rate brownian movement generator.
export function Dibrown(
	length: Signal,
	lo: Signal,
	hi: Signal,
	step: Signal,
): Signal {
	return makeUgen('Dibrown', 1, rateDr, 0, [length, lo, hi, step]);
}
// Demand rate white noise random generator.
export function Diwhite(length: Signal, lo: Signal, hi: Signal): Signal {
	return makeUgen('Diwhite', 1, rateDr, 0, [length, lo, hi]);
}
// Demand rate random sequence generator.
export function Drand(repeats: Signal, list: Signal): Signal {
	return makeUgen('Drand', 1, rateDr, 0, arrayConcat([repeats], asArray(list)));
}
// Demand rate sequence generator.
export function Dseq(repeats: Signal, list: Signal): Signal {
	return makeUgen('Dseq', 1, rateDr, 0, arrayConcat([repeats], asArray(list)));
}
// Demand rate sequence generator.
export function Dser(repeats: Signal, list: Signal): Signal {
	return makeUgen('Dser', 1, rateDr, 0, arrayConcat([repeats], asArray(list)));
}
// Demand rate arithmetic series UGen.
export function Dseries(length: Signal, start: Signal, step: Signal): Signal {
	return makeUgen('Dseries', 1, rateDr, 0, [length, start, step]);
}
// Demand rate random sequence generator
export function Dshuf(repeats: Signal, list: Signal): Signal {
	return makeUgen('Dshuf', 1, rateDr, 0, arrayConcat([repeats], asArray(list)));
}
// Demand rate generator for embedding different inputs
export function Dswitch(index: Signal, list: Signal): Signal {
	return makeUgen('Dswitch', 1, rateDr, 0, arrayConcat([index], asArray(list)));
}
// Demand rate generator for switching between inputs.
export function Dswitch1(index: Signal, list: Signal): Signal {
	return makeUgen(
		'Dswitch1',
		1,
		rateDr,
		0,
		arrayConcat([index], asArray(list)),
	);
}
export function DurationGate(dur: Signal): Signal {
	return makeUgen('DurationGate', 1, rateAr, 0, [dur]);
}
// Random impulses.
export function Dust(density: Signal): Signal {
	return makeUgen('Dust', 1, rateAr, 0, [density]);
}
// Random impulses.
export function Dust2(density: Signal): Signal {
	return makeUgen('Dust2', 1, rateAr, 0, [density]);
}
// Demand results from demand rate UGens.
export function Duty(
	dur: Signal,
	reset: Signal,
	doneAction: Signal,
	level: Signal,
): Signal {
	return makeUgen('Duty', 1, rateAr, 0, [dur, reset, doneAction, level]);
}
// Demand rate white noise random generator.
export function Dwhite(length: Signal, lo: Signal, hi: Signal): Signal {
	return makeUgen('Dwhite', 1, rateDr, 0, [length, lo, hi]);
}
// Demand rate weighted random sequence generator
export function Dwrand(repeats: Signal, weights: Signal, list: Signal): Signal {
	return makeUgen(
		'Dwrand',
		1,
		rateDr,
		0,
		arrayConcat([repeats, weights], asArray(list)),
	);
}
// Demand rate random sequence generator.
export function Dxrand(repeats: Signal, list: Signal): Signal {
	return makeUgen(
		'Dxrand',
		1,
		rateDr,
		0,
		arrayConcat([repeats], asArray(list)),
	);
}
// Envelope generator
export function EnvGen(
	gate: Signal,
	levelScale: Signal,
	levelBias: Signal,
	timeScale: Signal,
	doneAction: Signal,
	envelope: Signal,
): Signal {
	return makeUgen(
		'EnvGen',
		1,
		rateAr,
		0,
		arrayConcat(
			[gate, levelScale, levelBias, timeScale, doneAction],
			asArray(envelope),
		),
	);
}
// Undocumented
export function EnvTrapezoid(
	trig: Signal,
	dur: Signal,
	shape: Signal,
	skew: Signal,
): Signal {
	return makeUgen('EnvTrapezoid', 1, [0], 0, [trig, dur, shape, skew]);
}
// Exponential single random number generator.
export function ExpRand(lo: Signal, hi: Signal): Signal {
	return makeUgen('ExpRand', 1, rateIr, 0, [lo, hi]);
}
// Feedback sine with chaotic phase indexing
export function FbSineC(
	freq: Signal,
	im: Signal,
	fb: Signal,
	a: Signal,
	c: Signal,
	xi: Signal,
	yi: Signal,
): Signal {
	return makeUgen('FBSineC', 1, rateAr, 0, [freq, im, fb, a, c, xi, yi]);
}
// Feedback sine with chaotic phase indexing
export function FbSineL(
	freq: Signal,
	im: Signal,
	fb: Signal,
	a: Signal,
	c: Signal,
	xi: Signal,
	yi: Signal,
): Signal {
	return makeUgen('FBSineL', 1, rateAr, 0, [freq, im, fb, a, c, xi, yi]);
}
// Fast Fourier Transform
export function Fft(
	buffer: Signal,
	input: Signal,
	hop: Signal,
	wintype: Signal,
	active: Signal,
	winsize: Signal,
): Signal {
	return makeUgen('FFT', 1, rateKr, 0, [
		buffer,
		input,
		hop,
		wintype,
		active,
		winsize,
	]);
}
// Fold a signal outside given thresholds.
export function Fold(input: Signal, lo: Signal, hi: Signal): Signal {
	return makeUgen('Fold', 1, [0], 0, [input, lo, hi]);
}
// Formant oscillator
export function Formant(
	fundfreq: Signal,
	formfreq: Signal,
	bwfreq: Signal,
): Signal {
	return makeUgen('Formant', 1, rateAr, 0, [fundfreq, formfreq, bwfreq]);
}
// FOF-like filter.
export function Formlet(
	input: Signal,
	freq: Signal,
	attacktime: Signal,
	decaytime: Signal,
): Signal {
	return makeUgen('Formlet', 1, [0], 0, [input, freq, attacktime, decaytime]);
}
// First order filter section.
export function Fos(input: Signal, a0: Signal, a1: Signal, b1: Signal): Signal {
	return makeUgen('FOS', 1, [0], 0, [input, a0, a1, b1]);
}
// A reverb
export function FreeVerb(
	input: Signal,
	mix: Signal,
	room: Signal,
	damp: Signal,
): Signal {
	return makeUgen('FreeVerb', 1, [0], 0, [input, mix, room, damp]);
}
// A two-channel reverb
export function FreeVerb2(
	input: Signal,
	in2: Signal,
	mix: Signal,
	room: Signal,
	damp: Signal,
): Signal {
	return makeUgen('FreeVerb2', 2, [0], 0, [input, in2, mix, room, damp]);
}
// Frequency Shifter.
export function FreqShift(input: Signal, freq: Signal, phase: Signal): Signal {
	return makeUgen('FreqShift', 1, rateAr, 0, [input, freq, phase]);
}
// Fast sine oscillator.
export function FSinOsc(freq: Signal, iphase: Signal): Signal {
	return makeUgen('FSinOsc', 1, rateAr, 0, [freq, iphase]);
}
// Gate or hold.
export function Gate(input: Signal, trig: Signal): Signal {
	return makeUgen('Gate', 1, [0], 0, [input, trig]);
}
// Gingerbreadman map chaotic generator
export function GbmanN(freq: Signal, xi: Signal, yi: Signal): Signal {
	return makeUgen('GbmanN', 1, rateAr, 0, [freq, xi, yi]);
}
// Dynamic stochastic synthesis generator.
export function Gendy1(
	ampdist: Signal,
	durdist: Signal,
	adparam: Signal,
	ddparam: Signal,
	minfreq: Signal,
	maxfreq: Signal,
	ampscale: Signal,
	durscale: Signal,
	initCPs: Signal,
	knum: Signal,
): Signal {
	return makeUgen('Gendy1', 1, rateAr, 0, [
		ampdist,
		durdist,
		adparam,
		ddparam,
		minfreq,
		maxfreq,
		ampscale,
		durscale,
		initCPs,
		knum,
	]);
}
// Dynamic stochastic synthesis generator.
export function Gendy2(
	ampdist: Signal,
	durdist: Signal,
	adparam: Signal,
	ddparam: Signal,
	minfreq: Signal,
	maxfreq: Signal,
	ampscale: Signal,
	durscale: Signal,
	initCPs: Signal,
	knum: Signal,
	a: Signal,
	c: Signal,
): Signal {
	return makeUgen('Gendy2', 1, rateAr, 0, [
		ampdist,
		durdist,
		adparam,
		ddparam,
		minfreq,
		maxfreq,
		ampscale,
		durscale,
		initCPs,
		knum,
		a,
		c,
	]);
}
// Dynamic stochastic synthesis generator.
export function Gendy3(
	ampdist: Signal,
	durdist: Signal,
	adparam: Signal,
	ddparam: Signal,
	freq: Signal,
	ampscale: Signal,
	durscale: Signal,
	initCPs: Signal,
	knum: Signal,
): Signal {
	return makeUgen('Gendy3', 1, rateAr, 0, [
		ampdist,
		durdist,
		adparam,
		ddparam,
		freq,
		ampscale,
		durscale,
		initCPs,
		knum,
	]);
}
// Granular synthesis with sound stored in a buffer
export function GrainBuf(
	numChan: number,
	trigger: Signal,
	dur: Signal,
	sndbuf: Signal,
	rate: Signal,
	pos: Signal,
	interp: Signal,
	pan: Signal,
	envbufnum: Signal,
	maxGrains: Signal,
): Signal {
	return makeUgen('GrainBuf', numChan, rateAr, 0, [
		trigger,
		dur,
		sndbuf,
		rate,
		pos,
		interp,
		pan,
		envbufnum,
		maxGrains,
	]);
}
// Granular synthesis with frequency modulated sine tones
export function GrainFm(
	numChan: number,
	trigger: Signal,
	dur: Signal,
	carfreq: Signal,
	modfreq: Signal,
	index: Signal,
	pan: Signal,
	envbufnum: Signal,
	maxGrains: Signal,
): Signal {
	return makeUgen('GrainFM', numChan, rateAr, 0, [
		trigger,
		dur,
		carfreq,
		modfreq,
		index,
		pan,
		envbufnum,
		maxGrains,
	]);
}
// Granular synthesis with sine tones
export function GrainSin(
	numChan: number,
	trigger: Signal,
	dur: Signal,
	freq: Signal,
	pan: Signal,
	envbufnum: Signal,
	maxGrains: Signal,
): Signal {
	return makeUgen('GrainSin', numChan, rateAr, 0, [
		trigger,
		dur,
		freq,
		pan,
		envbufnum,
		maxGrains,
	]);
}
// Gray Noise.
export function GrayNoise(): Signal {
	return makeUgen('GrayNoise', 1, rateAr, 0, []);
}
// A two-channel reverb
export function GVerb(
	input: Signal,
	roomsize: Signal,
	revtime: Signal,
	damping: Signal,
	inputbw: Signal,
	spread: Signal,
	drylevel: Signal,
	earlyreflevel: Signal,
	taillevel: Signal,
	maxroomsize: Signal,
): Signal {
	return makeUgen('GVerb', 2, [0], 0, [
		input,
		roomsize,
		revtime,
		damping,
		inputbw,
		spread,
		drylevel,
		earlyreflevel,
		taillevel,
		maxroomsize,
	]);
}
// Scrambled value with a hash function.
export function Hasher(input: Signal): Signal {
	return makeUgen('Hasher', 1, [0], 0, [input]);
}
// Henon map chaotic generator
export function HenonC(
	freq: Signal,
	a: Signal,
	b: Signal,
	x0: Signal,
	x1: Signal,
): Signal {
	return makeUgen('HenonC', 1, rateAr, 0, [freq, a, b, x0, x1]);
}
// Henon map chaotic generator
export function HenonL(
	freq: Signal,
	a: Signal,
	b: Signal,
	x0: Signal,
	x1: Signal,
): Signal {
	return makeUgen('HenonL', 1, rateAr, 0, [freq, a, b, x0, x1]);
}
// Henon map chaotic generator
export function HenonN(
	freq: Signal,
	a: Signal,
	b: Signal,
	x0: Signal,
	x1: Signal,
): Signal {
	return makeUgen('HenonN', 1, rateAr, 0, [freq, a, b, x0, x1]);
}
// 2nd order Butterworth highpass filter.
export function Hpf(input: Signal, freq: Signal): Signal {
	return makeUgen('HPF', 1, [0], 0, [input, freq]);
}
// Two point difference filter
export function Hpz1(input: Signal): Signal {
	return makeUgen('HPZ1', 1, [0], 0, [input]);
}
// Two zero fixed midcut.
export function Hpz2(input: Signal): Signal {
	return makeUgen('HPZ2', 1, [0], 0, [input]);
}
// Inverse Fast Fourier Transform
export function Ifft(buffer: Signal, wintype: Signal, winsize: Signal): Signal {
	return makeUgen('IFFT', 1, rateAr, 0, [buffer, wintype, winsize]);
}
// Impulse oscillator.
export function Impulse(freq: Signal, phase: Signal): Signal {
	return makeUgen('Impulse', 1, rateAr, 0, [freq, phase]);
}
// Read a signal from a bus.
export function In(numChan: number, bus: Signal): Signal {
	return makeUgen('In', numChan, rateAr, 0, [bus]);
}
// Index into a table with a signal
export function Index(bufnum: Signal, input: Signal): Signal {
	return makeUgen('Index', 1, [1], 0, [bufnum, input]);
}
// Finds the (lowest) point in the Buffer at which the input signal lies in-between the two values
export function IndexInBetween(bufnum: Signal, input: Signal): Signal {
	return makeUgen('IndexInBetween', 1, [1], 0, [bufnum, input]);
}
// Read signal from a bus with a current or one cycle old timestamp.
export function InFeedback(numChan: number, bus: Signal): Signal {
	return makeUgen('InFeedback', numChan, rateAr, 0, [bus]);
}
// Tests if a signal is within a given range.
export function InRange(input: Signal, lo: Signal, hi: Signal): Signal {
	return makeUgen('InRange', 1, [0], 0, [input, lo, hi]);
}
// A leaky integrator.
export function Integrator(input: Signal, coef: Signal): Signal {
	return makeUgen('Integrator', 1, [0], 0, [input, coef]);
}
// Single integer random number generator.
export function IRand(lo: Signal, hi: Signal): Signal {
	return makeUgen('IRand', 1, rateIr, 0, [lo, hi]);
}
// Control to audio rate converter.
export function K2A(input: Signal): Signal {
	return makeUgen('K2A', 1, rateAr, 0, [input]);
}
/*
// Respond to the state of a key
export function KeyState(keycode: Signal, minval: Signal, maxval: Signal, lag: Signal): Signal {
    return makeUgen('KeyState', 1, rateKr, 0, [keycode, minval, maxval, lag]);
}
*/
// Sine oscillator bank
export function Klang(
	freqscale: Signal,
	freqoffset: Signal,
	specificationsArrayRef: Signal,
): Signal {
	return makeUgen(
		'Klang',
		1,
		rateAr,
		0,
		arrayConcat([freqscale, freqoffset], asArray(specificationsArrayRef)),
	);
}
// Bank of resonators
export function Klank(
	input: Signal,
	freqscale: Signal,
	freqoffset: Signal,
	decayscale: Signal,
	specificationsArrayRef: Signal,
): Signal {
	return makeUgen(
		'Klank',
		1,
		[0],
		0,
		arrayConcat(
			[input, freqscale, freqoffset, decayscale],
			asArray(specificationsArrayRef),
		),
	);
}
// Exponential lag
export function Lag(input: Signal, lagTime: Signal): Signal {
	return makeUgen('Lag', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
export function Lag2(input: Signal, lagTime: Signal): Signal {
	return makeUgen('Lag2', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
export function Lag3(input: Signal, lagTime: Signal): Signal {
	return makeUgen('Lag3', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
export function Lag3Ud(
	input: Signal,
	lagTimeU: Signal,
	lagTimeD: Signal,
): Signal {
	return makeUgen('Lag3UD', 1, [0], 0, [input, lagTimeU, lagTimeD]);
}
// Exponential lag
export function LagUd(
	input: Signal,
	lagTimeU: Signal,
	lagTimeD: Signal,
): Signal {
	return makeUgen('LagUD', 1, [0], 0, [input, lagTimeU, lagTimeD]);
}
// Sample and hold
export function Latch(input: Signal, trig: Signal): Signal {
	return makeUgen('Latch', 1, [0], 0, [input, trig]);
}
// Latoocarfian chaotic generator
export function LatoocarfianC(
	freq: Signal,
	a: Signal,
	b: Signal,
	c: Signal,
	d: Signal,
	xi: Signal,
	yi: Signal,
): Signal {
	return makeUgen('LatoocarfianC', 1, rateAr, 0, [freq, a, b, c, d, xi, yi]);
}
// Remove DC
export function LeakDc(input: Signal, coef: Signal): Signal {
	return makeUgen('LeakDC', 1, [0], 0, [input, coef]);
}
// Clipped noise
export function LfClipNoise(freq: Signal): Signal {
	return makeUgen('LFClipNoise', 1, rateAr, 0, [freq]);
}
// Dynamic clipped noise
export function LfdClipNoise(freq: Signal): Signal {
	return makeUgen('LFDClipNoise', 1, rateAr, 0, [freq]);
}
// A sine like shape made of two cubic pieces
export function LfCub(freq: Signal, iphase: Signal): Signal {
	return makeUgen('LFCub', 1, rateAr, 0, [freq, iphase]);
}
// Dynamic step noise
export function LfdNoise0(freq: Signal): Signal {
	return makeUgen('LFDNoise0', 1, rateAr, 0, [freq]);
}
// Dynamic ramp noise
export function LfdNoise1(freq: Signal): Signal {
	return makeUgen('LFDNoise1', 1, rateAr, 0, [freq]);
}
// Dynamic cubic noise
export function LfdNoise3(freq: Signal): Signal {
	return makeUgen('LFDNoise3', 1, rateAr, 0, [freq]);
}
// Gaussian function oscillator
export function LfGauss(
	duration: Signal,
	width: Signal,
	iphase: Signal,
	loop: Signal,
	doneAction: Signal,
): Signal {
	return makeUgen('LFGauss', 1, rateAr, 0, [
		duration,
		width,
		iphase,
		loop,
		doneAction,
	]);
}
// Step noise
export function LfNoise0(freq: Signal): Signal {
	return makeUgen('LFNoise0', 1, rateAr, 0, [freq]);
}
// Ramp noise
export function LfNoise1(freq: Signal): Signal {
	return makeUgen('LFNoise1', 1, rateAr, 0, [freq]);
}
// Quadratic noise.
export function LfNoise2(freq: Signal): Signal {
	return makeUgen('LFNoise2', 1, rateAr, 0, [freq]);
}
// Parabolic oscillator
export function LfPar(freq: Signal, iphase: Signal): Signal {
	return makeUgen('LFPar', 1, rateAr, 0, [freq, iphase]);
}
// pulse oscillator
export function LfPulse(freq: Signal, iphase: Signal, width: Signal): Signal {
	return makeUgen('LFPulse', 1, rateAr, 0, [freq, iphase, width]);
}
// Sawtooth oscillator
export function LfSaw(freq: Signal, iphase: Signal): Signal {
	return makeUgen('LFSaw', 1, rateAr, 0, [freq, iphase]);
}
// Triangle oscillator
export function LfTri(freq: Signal, iphase: Signal): Signal {
	return makeUgen('LFTri', 1, rateAr, 0, [freq, iphase]);
}
// Peak limiter
export function Limiter(input: Signal, level: Signal, dur: Signal): Signal {
	return makeUgen('Limiter', 1, [0], 0, [input, level, dur]);
}
// Linear congruential chaotic generator
export function LinCongC(
	freq: Signal,
	a: Signal,
	c: Signal,
	m: Signal,
	xi: Signal,
): Signal {
	return makeUgen('LinCongC', 1, rateAr, 0, [freq, a, c, m, xi]);
}
// Line generator.
export function Line(
	start: Signal,
	end: Signal,
	dur: Signal,
	doneAction: Signal,
): Signal {
	return makeUgen('Line', 1, rateAr, 0, [start, end, dur, doneAction]);
}
// Simple linear envelope generator.
export function Linen(
	gate: Signal,
	attackTime: Signal,
	susLevel: Signal,
	releaseTime: Signal,
	doneAction: Signal,
): Signal {
	return makeUgen('Linen', 1, rateKr, 0, [
		gate,
		attackTime,
		susLevel,
		releaseTime,
		doneAction,
	]);
}
// Map a linear range to an exponential range
export function LinExp(
	input: Signal,
	srclo: Signal,
	srchi: Signal,
	dstlo: Signal,
	dsthi: Signal,
): Signal {
	return makeUgen('LinExp', 1, [0], 0, [input, srclo, srchi, dstlo, dsthi]);
}
// Two channel linear pan.
export function LinPan2(input: Signal, pos: Signal, level: Signal): Signal {
	return makeUgen('LinPan2', 2, [0], 0, [input, pos, level]);
}
// Skewed random number generator.
export function LinRand(lo: Signal, hi: Signal, minmax: Signal): Signal {
	return makeUgen('LinRand', 1, rateIr, 0, [lo, hi, minmax]);
}
// Two channel linear crossfade.
export function LinXFade2(inA: Signal, inB: Signal, pan: Signal): Signal {
	return makeUgen('LinXFade2', 1, [0, 1], 0, [inA, inB, pan]);
}
// Allocate a buffer local to the synth
export function LocalBuf(numChannels: Signal, numFrames: Signal): Signal {
	return makeUgen('LocalBuf', 1, rateIr, 0, [numChannels, numFrames]);
}
// Define and read from buses local to a synth.
export function LocalIn(numChan: number, defaultValue: Signal): Signal {
	return makeUgen(
		'LocalIn',
		numChan,
		rateAr,
		0,
		arrayConcat([], asArray(defaultValue)),
	);
}
// Write to buses local to a synth.
export function LocalOut(channelsArray: Signal): Signal {
	return makeUgen(
		'LocalOut',
		0,
		[0],
		0,
		arrayConcat([], asArray(channelsArray)),
	);
}
// Chaotic noise function
export function Logistic(
	chaosParam: Signal,
	freq: Signal,
	init: Signal,
): Signal {
	return makeUgen('Logistic', 1, rateAr, 0, [chaosParam, freq, init]);
}
// Lorenz chaotic generator
export function LorenzL(
	freq: Signal,
	s: Signal,
	r: Signal,
	b: Signal,
	h: Signal,
	xi: Signal,
	yi: Signal,
	zi: Signal,
): Signal {
	return makeUgen('LorenzL', 1, rateAr, 0, [freq, s, r, b, h, xi, yi, zi]);
}
// 2nd order Butterworth lowpass filter
export function Lpf(input: Signal, freq: Signal): Signal {
	return makeUgen('LPF', 1, [0], 0, [input, freq]);
}
// Two point average filter
export function Lpz1(input: Signal): Signal {
	return makeUgen('LPZ1', 1, [0], 0, [input]);
}
// Two zero fixed lowpass
export function Lpz2(input: Signal): Signal {
	return makeUgen('LPZ2', 1, [0], 0, [input]);
}
// Reduce precision.
export function MantissaMask(input: Signal, bits: Signal): Signal {
	return makeUgen('MantissaMask', 1, [0], 0, [input, bits]);
}
// LocalBuf count
export function MaxLocalBufs(count: Signal): Signal {
	return makeUgen('MaxLocalBufs', 1, rateIr, 0, [count]);
}
// Median filter.
export function Median(length: Signal, input: Signal): Signal {
	return makeUgen('Median', 1, [1], 0, [length, input]);
}
// Parametric filter.
export function MidEq(
	input: Signal,
	freq: Signal,
	rq: Signal,
	db: Signal,
): Signal {
	return makeUgen('MidEQ', 1, [0], 0, [input, freq, rq, db]);
}
// Minimum difference of two values in modulo arithmetics
export function ModDif(x: Signal, y: Signal, mod: Signal): Signal {
	return makeUgen('ModDif', 1, [0], 0, [x, y, mod]);
}
// Moog VCF implementation, designed by Federico Fontana
export function MoogFf(
	input: Signal,
	freq: Signal,
	gain: Signal,
	reset: Signal,
): Signal {
	return makeUgen('MoogFF', 1, [0], 0, [input, freq, gain, reset]);
}
export function MoogVcf(input: Signal, fco: Signal, res: Signal): Signal {
	return makeUgen('MoogVCF', 1, [0], 0, [input, fco, res]);
}

/* c.f. bindingsUi.ts
// Mouse button UGen.
export function MouseButton(minval: Signal, maxval: Signal, lag: Signal): Signal {
    return makeUgen('MouseButton', 1, rateKr, 0, [minval, maxval, lag]);
}
// Cursor tracking UGen.
export function MouseX(minval: Signal, maxval: Signal, warp: Signal, lag: Signal): Signal {
    return makeUgen('MouseX', 1, rateKr, 0, [minval, maxval, warp, lag]);
}
// Cursor tracking UGen.
export function MouseY(minval: Signal, maxval: Signal, warp: Signal, lag: Signal): Signal {
    return makeUgen('MouseY', 1, rateKr, 0, [minval, maxval, warp, lag]);
}
*/

// Multiply add
export function MulAdd(input: Signal, mul: Signal, add: Signal): Signal {
	return makeUgen('MulAdd', 1, [0, 1, 2], 0, [input, mul, add]);
}
export function Multiplexer(selector: Signal, inputArray: Signal): Signal {
	return makeUgen('Multiplexer', 1, [0, 1], 0, arrayConcat([selector], asArray(inputArray)));
}
export function MVerb(in1: Signal, in2: Signal, dampingFreq: Signal, density: Signal, bandwidthFreq: Signal, decay: Signal, predelay: Signal, size: Signal, gain: Signal, mix: Signal, earlyMix: Signal): Signal {
	return makeUgen('MVerb', 2, rateAr, 0, [in1, in2, dampingFreq, density, bandwidthFreq, decay, predelay, size, gain, mix, earlyMix]);
}
// Flattens dynamics.
export function Normalizer(input: Signal, level: Signal, dur: Signal): Signal {
	return makeUgen('Normalizer', 1, [0], 0, [input, level, dur]);
}
// Sum of uniform distributions.
export function NRand(lo: Signal, hi: Signal, n: Signal): Signal {
	return makeUgen('NRand', 1, rateIr, 0, [lo, hi, n]);
}
// Number of output busses.
export function NumOutputBuses(): Signal {
	return makeUgen('NumOutputBuses', 1, rateIr, 0, []);
}
// One pole filter.
export function OnePole(input: Signal, coef: Signal): Signal {
	return makeUgen('OnePole', 1, [0], 0, [input, coef]);
}
// One zero filter.
export function OneZero(input: Signal, coef: Signal): Signal {
	return makeUgen('OneZero', 1, [0], 0, [input, coef]);
}
// Interpolating wavetable oscillator.
export function Osc(bufnum: Signal, freq: Signal, phase: Signal): Signal {
	return makeUgen('Osc', 1, rateAr, 0, [bufnum, freq, phase]);
}
// Write a signal to a bus.
export function Out(bus: Signal, channelsArray: Signal): Signal {
	return makeUgen('Out', 0, [1], 0, arrayConcat([bus], asArray(channelsArray)));
}
// Two channel equal power pan.
export function Pan2(input: Signal, pos: Signal, level: Signal): Signal {
	return makeUgen('Pan2', 2, [0], 0, [input, pos, level]);
}
// Azimuth panner
export function PanAz(
	numChan: ScalarOrArray<number>,
	input: Signal,
	pos: Signal,
	level: Signal,
	width: Signal,
	orientation: Signal,
): Signal {
	return makeUgen('PanAz', numChan, [0], 0, [
		input,
		pos,
		level,
		width,
		orientation,
	]);
}
// Ambisonic B-format panner.
export function PanB(
	input: Signal,
	azimuth: Signal,
	elevation: Signal,
	gain: Signal,
): Signal {
	return makeUgen('PanB', 4, rateAr, 0, [input, azimuth, elevation, gain]);
}
// 2D Ambisonic B-format panner.
export function PanB2(input: Signal, azimuth: Signal, gain: Signal): Signal {
	return makeUgen('PanB2', 3, [0], 0, [input, azimuth, gain]);
}
// Track peak signal amplitude.
export function PeakFollower(input: Signal, decay: Signal): Signal {
	return makeUgen('PeakFollower', 1, [0], 0, [input, decay]);
}
// A resettable linear ramp between two levels.
export function Phasor(
	trig: Signal,
	rate: Signal,
	start: Signal,
	end: Signal,
	resetPos: Signal,
): Signal {
	return makeUgen('Phasor', 1, rateAr, 0, [trig, rate, start, end, resetPos]);
}
// Pink Noise.
export function PinkNoise(): Signal {
	return makeUgen('PinkNoise', 1, rateAr, 0, []);
}
// Autocorrelation pitch follower
export function Pitch(
	input: Signal,
	initFreq: Signal,
	minFreq: Signal,
	maxFreq: Signal,
	execFreq: Signal,
	maxBinsPerOctave: Signal,
	median: Signal,
	ampThreshold: Signal,
	peakThreshold: Signal,
	downSample: Signal,
	clar: Signal,
): Signal {
	return makeUgen('Pitch', 2, rateKr, 0, [
		input,
		initFreq,
		minFreq,
		maxFreq,
		execFreq,
		maxBinsPerOctave,
		median,
		ampThreshold,
		peakThreshold,
		downSample,
		clar,
	]);
}
// Time domain pitch shifter.
export function PitchShift(
	input: Signal,
	windowSize: Signal,
	pitchRatio: Signal,
	pitchDispersion: Signal,
	timeDispersion: Signal,
): Signal {
	return makeUgen('PitchShift', 1, [0], 0, [
		input,
		windowSize,
		pitchRatio,
		pitchDispersion,
		timeDispersion,
	]);
}
// Sample playback oscillator.
export function PlayBuf(
	numChan: number,
	bufnum: Signal,
	rate: Signal,
	trigger: Signal,
	startPos: Signal,
	loop: Signal,
	doneAction: Signal,
): Signal {
	return makeUgen('PlayBuf', numChan, rateAr, 0, [
		bufnum,
		rate,
		trigger,
		startPos,
		loop,
		doneAction,
	]);
}
// A Karplus-Strong UGen
export function Pluck(
	input: Signal,
	trig: Signal,
	maxdelaytime: Signal,
	delaytime: Signal,
	decaytime: Signal,
	coef: Signal,
): Signal {
	return makeUgen('Pluck', 1, [0], 0, [
		input,
		trig,
		maxdelaytime,
		delaytime,
		decaytime,
		coef,
	]);
}
// Band limited pulse wave.
export function Pulse(freq: Signal, width: Signal): Signal {
	return makeUgen('Pulse', 1, rateAr, 0, [freq, width]);
}
// Pulse counter.
export function PulseCount(trig: Signal, reset: Signal): Signal {
	return makeUgen('PulseCount', 1, [0], 0, [trig, reset]);
}
// Pulse divider.
export function PulseDivider(trig: Signal, div: Signal, start: Signal): Signal {
	return makeUgen('PulseDivider', 1, [0], 0, [trig, div, start]);
}
// Scramble bins.
export function PvBinScramble(
	buffer: Signal,
	wipe: Signal,
	width: Signal,
	trig: Signal,
): Signal {
	return makeUgen('PV_BinScramble', 1, rateKr, 0, [buffer, wipe, width, trig]);
}
// Random phase shifting.
export function PvDiffuser(buffer: Signal, trig: Signal): Signal {
	return makeUgen('PV_Diffuser', 1, rateKr, 0, [buffer, trig]);
}
// Pass random bins.
export function PvRandComb(buffer: Signal, wipe: Signal, trig: Signal): Signal {
	return makeUgen('PV_RandComb', 1, rateKr, 0, [buffer, wipe, trig]);
}
// General quadratic map chaotic generator
export function QuadC(
	freq: Signal,
	a: Signal,
	b: Signal,
	c: Signal,
	xi: Signal,
): Signal {
	return makeUgen('QuadC', 1, rateAr, 0, [freq, a, b, c, xi]);
}
// General quadratic map chaotic generator
export function QuadL(
	freq: Signal,
	a: Signal,
	b: Signal,
	c: Signal,
	xi: Signal,
): Signal {
	return makeUgen('QuadL', 1, rateAr, 0, [freq, a, b, c, xi]);
}
// Single random number generator.
export function Rand(lo: Signal, hi: Signal): Signal {
	return makeUgen('Rand', 1, rateIr, 0, [lo, hi]);
}
// Record or overdub into a Buffer.
export function RecordBuf(
	bufnum: Signal,
	offset: Signal,
	recLevel: Signal,
	preLevel: Signal,
	run: Signal,
	loop: Signal,
	trigger: Signal,
	doneAction: Signal,
	inputArray: Signal,
): Signal {
	return makeUgen(
		'RecordBuf',
		1,
		rateAr,
		0,
		arrayConcat([
			bufnum,
			offset,
			recLevel,
			preLevel,
			run,
			loop,
			trigger,
			doneAction,
		], asArray(inputArray)),
	);
}
// Send signal to a bus, overwriting previous contents.
export function ReplaceOut(bus: Signal, channelsArray: Signal): Signal {
	return makeUgen(
		'ReplaceOut',
		0,
		[1],
		0,
		arrayConcat([bus], asArray(channelsArray)),
	);
}
// Resonant filter.
export function Resonz(input: Signal, freq: Signal, bwr: Signal): Signal {
	return makeUgen('Resonz', 1, [0], 0, [input, freq, bwr]);
}
// A resonant high pass filter.
export function Rhpf(input: Signal, freq: Signal, rq: Signal): Signal {
	return makeUgen('RHPF', 1, [0], 0, [input, freq, rq]);
}
// Ringing filter.
export function Ringz(input: Signal, freq: Signal, decaytime: Signal): Signal {
	return makeUgen('Ringz', 1, [0], 0, [input, freq, decaytime]);
}
// A resonant low pass filter.
export function Rlpf(input: Signal, freq: Signal, rq: Signal): Signal {
	return makeUgen('RLPF', 1, [0], 0, [input, freq, rq]);
}
// Rotate a sound field.
export function Rotate2(x: Signal, y: Signal, pos: Signal): Signal {
	return makeUgen('Rotate2', 2, [0, 1], 0, [x, y, pos]);
}
// Track maximum level.
export function RunningMax(input: Signal, trig: Signal): Signal {
	return makeUgen('RunningMax', 1, [0], 0, [input, trig]);
}
// Running sum over n frames
export function RunningSum(input: Signal, numsamp: Signal): Signal {
	return makeUgen('RunningSum', 1, [0], 0, [input, numsamp]);
}
// Duration of one sample.
export function SampleDur(): Signal {
	return makeUgen('SampleDur', 1, rateIr, 0, []);
}
// Server sample rate.
export function SampleRate(): Signal {
	return makeUgen('SampleRate', 1, rateIr, 0, []);
}
export function SamplerIndex(bufnum: Signal, size: Signal, mnn: Signal): Signal {
	return makeUgen('SamplerIndex', 2, rateKr, 0, [bufnum, size, mnn]);
}
// Remove infinity, NaN, and denormals
export function Sanitize(input: Signal, replace: Signal): Signal {
	return makeUgen('Sanitize', 1, [0], 0, [input, replace]);
}
// Band limited sawtooth.
export function Saw(freq: Signal): Signal {
	return makeUgen('Saw', 1, rateAr, 0, [freq]);
}
// Schmidt trigger.
export function Schmidt(input: Signal, lo: Signal, hi: Signal): Signal {
	return makeUgen('Schmidt', 1, [0], 0, [input, lo, hi]);
}
// Select output from an array of inputs.
export function Select(which: Signal, array: Signal): Signal {
	return makeUgen('Select', 1, [0, 1], 0, arrayConcat([which], asArray(array)));
}
// Set local buffer
export function SetBuf(
	buf: Signal,
	offset: Signal,
	length: Signal,
	array: Signal,
): Signal {
	return makeUgen(
		'SetBuf',
		1,
		rateIr,
		0,
		arrayConcat([buf, offset, length], asArray(array)),
	);
}
// Set-reset flip flop.
export function SetResetFf(trig: Signal, reset: Signal): Signal {
	return makeUgen('SetResetFF', 1, [0, 1], 0, [trig, reset]);
}
// Interpolating sine wavetable oscillator.
export function SinOsc(freq: Signal, phase: Signal): Signal {
	return makeUgen('SinOsc', 1, rateAr, 0, [freq, phase]);
}
// Feedback FM oscillator
export function SinOscFb(freq: Signal, feedback: Signal): Signal {
	return makeUgen('SinOscFB', 1, rateAr, 0, [freq, feedback]);
}
// Slew rate limiter.
export function Slew(input: Signal, up: Signal, dn: Signal): Signal {
	return makeUgen('Slew', 1, [0], 0, [input, up, dn]);
}
// Slope of signal
export function Slope(input: Signal): Signal {
	return makeUgen('Slope', 1, [0], 0, [input]);
}
// Second order filter section (biquad).
export function Sos(
	input: Signal,
	a0: Signal,
	a1: Signal,
	a2: Signal,
	b1: Signal,
	b2: Signal,
): Signal {
	return makeUgen('SOS', 1, [0], 0, [input, a0, a1, a2, b1, b2]);
}
// physical model of resonating spring
export function Spring(input: Signal, spring: Signal, damp: Signal): Signal {
	return makeUgen('Spring', 1, rateAr, 0, [input, spring, damp]);
}
// Standard map chaotic generator
export function StandardL(
	freq: Signal,
	k: Signal,
	xi: Signal,
	yi: Signal,
): Signal {
	return makeUgen('StandardL', 1, rateAr, 0, [freq, k, xi, yi]);
}
// Standard map chaotic generator
export function StandardN(
	freq: Signal,
	k: Signal,
	xi: Signal,
	yi: Signal,
): Signal {
	return makeUgen('StandardN', 1, rateAr, 0, [freq, k, xi, yi]);
}
// Pulse counter.
export function Stepper(
	trig: Signal,
	reset: Signal,
	min: Signal,
	max: Signal,
	step: Signal,
	resetval: Signal,
): Signal {
	return makeUgen('Stepper', 1, [0], 0, [
		trig,
		reset,
		min,
		max,
		step,
		resetval,
	]);
}
// Sum four signals
export function Sum4(in0: Signal, in1: Signal, in2: Signal, in3: Signal): Signal {
    return makeUgen('Sum4', 1, [0, 1, 2, 3], 0, [in0, in1, in2, in3]);
}
// Triggered linear ramp
export function Sweep(trig: Signal, rate: Signal): Signal {
	return makeUgen('Sweep', 1, rateAr, 0, [trig, rate]);
}
// Hard sync sawtooth wave.
export function SyncSaw(syncFreq: Signal, sawFreq: Signal): Signal {
	return makeUgen('SyncSaw', 1, rateAr, 0, [syncFreq, sawFreq]);
}
// Table Rand
export function TableRand(trig: Signal, bufnum: Signal): Signal {
	return makeUgen('TableRand', 1, [0], 0, [trig, bufnum]);
}
// Trigger delay.
export function TDelay(input: Signal, dur: Signal): Signal {
	return makeUgen('TDelay', 1, [0], 0, [input, dur]);
}
// Demand results as trigger from demand rate UGens.
export function TDuty(
	dur: Signal,
	reset: Signal,
	doneAction: Signal,
	level: Signal,
	gapFirst: Signal,
): Signal {
	return makeUgen('TDuty', 1, rateAr, 0, [
		dur,
		reset,
		doneAction,
		level,
		gapFirst,
	]);
}
// Triggered exponential random number generator.
export function TExpRand(lo: Signal, hi: Signal, trig: Signal): Signal {
	return makeUgen('TExpRand', 1, [2], 0, [lo, hi, trig]);
}
// Buffer granulator.
export function TGrains(
	numChan: number,
	trigger: Signal,
	bufnum: Signal,
	rate: Signal,
	centerPos: Signal,
	dur: Signal,
	pan: Signal,
	amp: Signal,
	interp: Signal,
): Signal {
	return makeUgen('TGrains', numChan, rateAr, 0, [
		trigger,
		bufnum,
		rate,
		centerPos,
		dur,
		pan,
		amp,
		interp,
	]);
}
// Returns time since last triggered.
export function Timer(trig: Signal): Signal {
	return makeUgen('Timer', 1, [0], 0, [trig]);
}
// Triggered integer random number generator.
export function TiRand(lo: Signal, hi: Signal, trig: Signal): Signal {
	return makeUgen('TIRand', 1, [2], 0, [lo, hi, trig]);
}
// Toggle flip flop.
export function ToggleFf(trig: Signal): Signal {
	return makeUgen('ToggleFF', 1, [0], 0, [trig]);
}
// Triggered random number generator.
export function TRand(lo: Signal, hi: Signal, trig: Signal): Signal {
	return makeUgen('TRand', 1, [2], 0, [lo, hi, trig]);
}
// Timed trigger.
export function Trig(input: Signal, dur: Signal): Signal {
	return makeUgen('Trig', 1, [0], 0, [input, dur]);
}
// Timed trigger.
export function Trig1(input: Signal, dur: Signal): Signal {
	return makeUgen('Trig1', 1, [0], 0, [input, dur]);
}
// Triggered windex.
export function TwIndex(
	input: Signal,
	normalize: Signal,
	array: Signal,
): Signal {
	return makeUgen(
		'TWindex',
		1,
		[0],
		0,
		arrayConcat([input, normalize], asArray(array)),
	);
}
// Two pole filter.
export function TwoPole(input: Signal, freq: Signal, radius: Signal): Signal {
	return makeUgen('TwoPole', 1, [0], 0, [input, freq, radius]);
}
// Two zero filter.
export function TwoZero(input: Signal, freq: Signal, radius: Signal): Signal {
	return makeUgen('TwoZero', 1, [0], 0, [input, freq, radius]);
}
// Variable duty saw
export function VarSaw(freq: Signal, iphase: Signal, width: Signal): Signal {
	return makeUgen('VarSaw', 1, rateAr, 0, [freq, iphase, width]);
}
// The Vibrato oscillator models a slow frequency modulation.
export function Vibrato(
	freq: Signal,
	rate: Signal,
	depth: Signal,
	delay: Signal,
	onset: Signal,
	rateVariation: Signal,
	depthVariation: Signal,
	iphase: Signal,
	trig: Signal,
): Signal {
	return makeUgen('Vibrato', 1, rateAr, 0, [
		freq,
		rate,
		depth,
		delay,
		onset,
		rateVariation,
		depthVariation,
		iphase,
		trig,
	]);
}
// Warp a buffer with a time pointer
export function Warp1(
	numChan: number,
	bufnum: Signal,
	pointer: Signal,
	freqScale: Signal,
	windowSize: Signal,
	envbufnum: Signal,
	overlaps: Signal,
	windowRandRatio: Signal,
	interp: Signal,
): Signal {
	return makeUgen('Warp1', numChan, rateAr, 0, [
		bufnum,
		pointer,
		freqScale,
		windowSize,
		envbufnum,
		overlaps,
		windowRandRatio,
		interp,
	]);
}
// White noise.
export function WhiteNoise(): Signal {
	return makeUgen('WhiteNoise', 1, rateAr, 0, []);
}
// Wrap a signal outside given thresholds.
export function Wrap(input: Signal, lo: Signal, hi: Signal): Signal {
	return makeUgen('Wrap', 1, [0], 0, [input, lo, hi]);
}
// Index into a table with a signal.
export function WrapIndex(bufnum: Signal, input: Signal): Signal {
	return makeUgen('WrapIndex', 1, [1], 0, [bufnum, input]);
}
// Equal power two channel cross fade.
export function XFade2(
	inA: Signal,
	inB: Signal,
	pan: Signal,
	level: Signal,
): Signal {
	return makeUgen('XFade2', 1, [0, 1], 0, [inA, inB, pan, level]);
}
// Exponential line generator.
export function XLine(
	start: Signal,
	end: Signal,
	dur: Signal,
	doneAction: Signal,
): Signal {
	return makeUgen('XLine', 1, rateAr, 0, [start, end, dur, doneAction]);
}
// Zero crossing frequency follower
export function ZeroCrossing(input: Signal): Signal {
	return makeUgen('ZeroCrossing', 1, [0], 0, [input]);
}
// (Undocumented class)
export function AnalogFoldOsc(freq: Signal, amp: Signal): Signal {
	return makeUgen('AnalogFoldOsc', 1, rateAr, 0, [freq, amp]);
}
// (Undocumented class)
export function Bezier(
	haltAfter: Signal,
	dx: Signal,
	freq: Signal,
	phase: Signal,
	param: Signal,
): Signal {
	return makeUgen(
		'Bezier',
		1,
		rateAr,
		0,
		arrayConcat([haltAfter, dx, freq, phase], asArray(param)),
	);
}
// class B/AB power amp distortion simulation
export function CrossoverDistortion(
	input: Signal,
	amp: Signal,
	smooth: Signal,
): Signal {
	return makeUgen('CrossoverDistortion', 1, [0], 0, [input, amp, smooth]);
}
// Digitally modelled analog filter
export function Dfm1(
	input: Signal,
	freq: Signal,
	res: Signal,
	inputgain: Signal,
	type: Signal,
	noiselevel: Signal,
): Signal {
	return makeUgen('DFM1', 1, [0], 0, [
		input,
		freq,
		res,
		inputgain,
		type,
		noiselevel,
	]);
}
// (Undocumented class)
export function DustRange(iotMin: Signal, iotMax: Signal): Signal {
	return makeUgen('DustRange', 1, rateAr, 0, [iotMin, iotMax]);
}
// Plucked physical model.
export function DwgPluckedStiff(
	freq: Signal,
	amp: Signal,
	gate: Signal,
	pos: Signal,
	c1: Signal,
	c3: Signal,
	inp: Signal,
	release: Signal,
	fB: Signal,
): Signal {
	return makeUgen('DWGPluckedStiff', 1, rateAr, 0, [
		freq,
		amp,
		gate,
		pos,
		c1,
		c3,
		inp,
		release,
		fB,
	]);
}
// (Undocumented class)
export function Dx7(
	bufnum: Signal,
	on: Signal,
	off: Signal,
	data: Signal,
	vc: Signal,
	mnn: Signal,
	vel: Signal,
	pw: Signal,
	mw: Signal,
	bc: Signal,
	fc: Signal,
): Signal {
	return makeUgen('Dx7', 1, rateAr, 0, [
		bufnum,
		on,
		off,
		data,
		vc,
		mnn,
		vel,
		pw,
		mw,
		bc,
		fc,
	]);
}
// (Undocumented class)
export function Dx7Env(
	gate: Signal,
	data: Signal,
	r1: Signal,
	r2: Signal,
	r3: Signal,
	r4: Signal,
	l1: Signal,
	l2: Signal,
	l3: Signal,
	l4: Signal,
	ol: Signal,
): Signal {
	return makeUgen('Dx7Env', 1, rateAr, 0, [
		gate,
		data,
		r1,
		r2,
		r3,
		r4,
		l1,
		l2,
		l3,
		l4,
		ol,
	]);
}
// (Undocumented class)
export function ExpRandN(numChan: number, lo: Signal, hi: Signal): Signal {
	return makeUgen('ExpRandN', numChan, rateIr, 0, [lo, hi]);
}
// Phase modulation oscillator matrix.
export function Fm7(ctlMatrix: Signal, modMatrix: Signal): Signal {
	return makeUgen(
		'FM7',
		6,
		rateAr,
		0,
		arrayConcat(asArray(ctlMatrix), asArray(modMatrix)),
	);
}
// (Undocumented class)
export function Freezer(
	bufnum: Signal,
	left: Signal,
	right: Signal,
	gain: Signal,
	increment: Signal,
	incrementOffset: Signal,
	incrementRandom: Signal,
	rightRandom: Signal,
	syncPhaseTrigger: Signal,
	randomizePhaseTrigger: Signal,
	numberOfLoops: Signal,
): Signal {
	return makeUgen('Freezer', 1, rateAr, 0, [
		bufnum,
		left,
		right,
		gain,
		increment,
		incrementOffset,
		incrementRandom,
		rightRandom,
		syncPhaseTrigger,
		randomizePhaseTrigger,
		numberOfLoops,
	]);
}
// A physical model of a system with dry-friction. A chaotic filter.
export function Friction(
	input: Signal,
	friction: Signal,
	spring: Signal,
	damp: Signal,
	mass: Signal,
	beltmass: Signal,
): Signal {
	return makeUgen('Friction', 1, rateAr, 0, [
		input,
		friction,
		spring,
		damp,
		mass,
		beltmass,
	]);
}
// algorithmic delay
export function GreyholeRaw(
	in1: Signal,
	in2: Signal,
	damping: Signal,
	delaytime: Signal,
	diffusion: Signal,
	feedback: Signal,
	moddepth: Signal,
	modfreq: Signal,
	size: Signal,
): Signal {
	return makeUgen('GreyholeRaw', 2, [0, 1], 0, [
		in1,
		in2,
		damping,
		delaytime,
		diffusion,
		feedback,
		moddepth,
		modfreq,
		size,
	]);
}
// random walk linear interp
export function LfBrownNoise1(freq: Signal, dev: Signal, dist: Signal): Signal {
	return makeUgen('LFBrownNoise1', 1, rateAr, 0, [freq, dev, dist]);
}
// (Undocumented class)
export function LinRandN(
	numChan: number,
	lo: Signal,
	hi: Signal,
	minmax: Signal,
): Signal {
	return makeUgen('LinRandN', numChan, rateIr, 0, [lo, hi, minmax]);
}
// Waveguide mesh physical models of drum membranes
export function MembraneCircle(
	excitation: Signal,
	tension: Signal,
	loss: Signal,
): Signal {
	return makeUgen('MembraneCircle', 1, rateAr, 0, [excitation, tension, loss]);
}
// a macro oscillator
export function MiBraids(
	pitch: Signal,
	timbre: Signal,
	color: Signal,
	model: Signal,
	trig: Signal,
	resamp: Signal,
	decim: Signal,
	bits: Signal,
	ws: Signal,
): Signal {
	return makeUgen('MiBraids', 1, rateAr, 0, [
		pitch,
		timbre,
		color,
		model,
		trig,
		resamp,
		decim,
		bits,
		ws,
	]);
}
// granular audio processor and texture synthesizer
export function MiClouds(
	pit: Signal,
	pos: Signal,
	size: Signal,
	dens: Signal,
	tex: Signal,
	drywet: Signal,
	in_gain: Signal,
	spread: Signal,
	rvb: Signal,
	fb: Signal,
	freeze: Signal,
	mode: Signal,
	lofi: Signal,
	trig: Signal,
	inputArray: Signal,
): Signal {
	return makeUgen(
		'MiClouds',
		2,
		rateAr,
		0,
		arrayConcat([
			pit,
			pos,
			size,
			dens,
			tex,
			drywet,
			in_gain,
			spread,
			rvb,
			fb,
			freeze,
			mode,
			lofi,
			trig,
		], asArray(inputArray)),
	);
}
// a resonator
export function MiRings(
	input: Signal,
	trig: Signal,
	pit: Signal,
	struct: Signal,
	bright: Signal,
	damp: Signal,
	pos: Signal,
	model: Signal,
	poly: Signal,
	intern_exciter: Signal,
	easteregg: Signal,
	bypass: Signal,
): Signal {
	return makeUgen('MiRings', 2, rateAr, 0, [
		input,
		trig,
		pit,
		struct,
		bright,
		damp,
		pos,
		model,
		poly,
		intern_exciter,
		easteregg,
		bypass,
	]);
}
// Moog Filter Emulation
export function MoogLadder(input: Signal, ffreq: Signal, res: Signal): Signal {
	return makeUgen('MoogLadder', 1, [0], 0, [input, ffreq, res]);
}
// (Undocumented class)
export function ObxdFilter(
	input: Signal,
	cutoff: Signal,
	resonance: Signal,
	multimode: Signal,
	bandpass: Signal,
	fourpole: Signal,
): Signal {
	return makeUgen('ObxdFilter', 1, [0], 0, [
		input,
		cutoff,
		resonance,
		multimode,
		bandpass,
		fourpole,
	]);
}
// 3D Perlin Noise
export function Perlin3(x: Signal, y: Signal, z: Signal): Signal {
	return makeUgen('Perlin3', 1, rateAr, 0, [x, y, z]);
}
// (Undocumented class)
export function RandN(numChan: number, lo: Signal, hi: Signal): Signal {
	return makeUgen('RandN', numChan, rateIr, 0, [lo, hi]);
}
// rotating clock divider
export function Rcd(
	clock: Signal,
	rotate: Signal,
	reset: Signal,
	div: Signal,
	spread: Signal,
	auto: Signal,
	len: Signal,
	down: Signal,
	gates: Signal,
): Signal {
	return makeUgen('RCD', 8, [0], 0, [
		clock,
		rotate,
		reset,
		div,
		spread,
		auto,
		len,
		down,
		gates,
	]);
}
// shuffling clock multiplier
export function Scm(
	clock: Signal,
	bpm: Signal,
	rotate: Signal,
	slip: Signal,
	shuffle: Signal,
	skip: Signal,
	pw: Signal,
): Signal {
	return makeUgen('SCM', 8, rateAr, 0, [
		clock,
		bpm,
		rotate,
		slip,
		shuffle,
		skip,
		pw,
	]);
}
// Granular synthesis with sinusoidal grains
export function SinGrain(trigger: Signal, dur: Signal, freq: Signal): Signal {
	return makeUgen('SinGrain', 1, rateAr, 0, [trigger, dur, freq]);
}
// (Undocumented class)
export function ShufflerB(
	bufnum: Signal,
	readLocationMinima: Signal,
	readLocationMaxima: Signal,
	readIncrementMinima: Signal,
	readIncrementMaxima: Signal,
	durationMinima: Signal,
	durationMaxima: Signal,
	envelopeAmplitudeMinima: Signal,
	envelopeAmplitudeMaxima: Signal,
	envelopeShapeMinima: Signal,
	envelopeShapeMaxima: Signal,
	envelopeSkewMinima: Signal,
	envelopeSkewMaxima: Signal,
	stereoLocationMinima: Signal,
	stereoLocationMaxima: Signal,
	interOffsetTimeMinima: Signal,
	interOffsetTimeMaxima: Signal,
	ftableReadLocationIncrement: Signal,
	readIncrementQuanta: Signal,
	interOffsetTimeQuanta: Signal,
): Signal {
	return makeUgen('ShufflerB', 2, rateAr, 0, [
		bufnum,
		readLocationMinima,
		readLocationMaxima,
		readIncrementMinima,
		readIncrementMaxima,
		durationMinima,
		durationMaxima,
		envelopeAmplitudeMinima,
		envelopeAmplitudeMaxima,
		envelopeShapeMinima,
		envelopeShapeMaxima,
		envelopeSkewMinima,
		envelopeSkewMaxima,
		stereoLocationMinima,
		stereoLocationMaxima,
		interOffsetTimeMinima,
		interOffsetTimeMaxima,
		ftableReadLocationIncrement,
		readIncrementQuanta,
		interOffsetTimeQuanta,
	]);
}
// (Undocumented class)
export function SvfBp(input: Signal, freq: Signal, q: Signal): Signal {
	return makeUgen('SvfBp', 1, rateAr, 0, [input, freq, q]);
}
// (Undocumented class)
export function SvfHp(input: Signal, freq: Signal, q: Signal): Signal {
	return makeUgen('SvfHp', 1, [0], 0, [input, freq, q]);
}
// (Undocumented class)
export function SvfLp(input: Signal, freq: Signal, q: Signal): Signal {
	return makeUgen('SvfLp', 1, rateAr, 0, [input, freq, q]);
}
// (Undocumented class)
export function TLinRand(
	lo: Signal,
	hi: Signal,
	minmax: Signal,
	trigger: Signal,
): Signal {
	return makeUgen('TLinRand', 1, rateKr, 0, [lo, hi, minmax, trigger]);
}
// (Undocumented class)
export function TScramble(trigger: Signal, inputs: Signal): Signal {
	return makeUgen(
		'TScramble',
		arrayLength(asArray(inputs)),
		[0],
		0,
		arrayConcat([trigger], asArray(inputs)),
	);
}
// (Undocumented class)
export function TrigAllocator(
	numChannels: number,
	algorithm: Signal,
	input: Signal,
	dur: Signal,
): Signal {
	return makeUgen('TrigAllocator', numChannels, [1], 0, [
		algorithm,
		input,
		dur,
	]);
}
// (Undocumented class)
export function TrigRoundRobin(numChannels: number, input: Signal): Signal {
	return makeUgen('TrigRoundRobin', numChannels, [0], 0, [input]);
}
// artifical reverberator
export function VbJonVerb(
	input: Signal,
	decay: Signal,
	damping: Signal,
	inputbw: Signal,
	erfl: Signal,
	tail: Signal,
): Signal {
	return makeUgen('VBJonVerb', 2, [0], 0, [
		input,
		decay,
		damping,
		inputbw,
		erfl,
		tail,
	]);
}
// vosim pulse generator
export function Vosim(
	trig: Signal,
	freq: Signal,
	nCycles: Signal,
	decay: Signal,
): Signal {
	return makeUgen('VOSIM', 1, rateAr, 0, [trig, freq, nCycles, decay]);
}
// Lose bits of your waves
export function WaveLoss(
	input: Signal,
	drop: Signal,
	outof: Signal,
	mode: Signal,
): Signal {
	return makeUgen('WaveLoss', 1, rateAr, 0, [input, drop, outof, mode]);
}
// Not at Hsc3Db. Note Kr.  Note particular channel rule.
export function WDistances(
	gate: Signal,
	x: Signal,
	y: Signal,
	z: Signal,
	coordinateArray: Signal[],
): Signal {
	return makeUgen(
		'WDistances',
		arrayLength(coordinateArray) / 3,
		rateKr,
		0,
		arrayConcat([gate, x, y, z], coordinateArray),
	);
}
// Not at Hsc3Db. Note Kr.
export function WkNearest(
	numChannels: number,
	gate: Signal,
	x: Signal,
	y: Signal,
	z: Signal,
	coordinateArray: Signal[],
): Signal {
	return makeUgen(
		'WkNearest',
		numChannels,
		rateKr,
		0,
		arrayConcat([gate, x, y, z], coordinateArray),
	);
}

export function Add(a: Signal, b: Signal): Signal {
	return BinaryOp(0, a, b);
}
export function Sub(a: Signal, b: Signal): Signal {
	return BinaryOp(1, a, b);
}
export function Mul(a: Signal, b: Signal): Signal {
	return BinaryOp(2, a, b);
}
export function Idiv(a: Signal, b: Signal): Signal {
	return BinaryOp(3, a, b);
}
export function Fdiv(a: Signal, b: Signal): Signal {
	return BinaryOp(4, a, b);
}
export function Mod(a: Signal, b: Signal): Signal {
	return BinaryOp(5, a, b);
}
export function Eq(a: Signal, b: Signal): Signal {
	return BinaryOp(6, a, b);
}
export function Ne(a: Signal, b: Signal): Signal {
	return BinaryOp(7, a, b);
}
export function Lt(a: Signal, b: Signal): Signal {
	return BinaryOp(8, a, b);
}
export function Gt(a: Signal, b: Signal): Signal {
	return BinaryOp(9, a, b);
}
export function Le(a: Signal, b: Signal): Signal {
	return BinaryOp(10, a, b);
}
export function Ge(a: Signal, b: Signal): Signal {
	return BinaryOp(11, a, b);
}
export function Min(a: Signal, b: Signal): Signal {
	return BinaryOp(12, a, b);
}
export function Max(a: Signal, b: Signal): Signal {
	return BinaryOp(13, a, b);
}
export function BitAnd(a: Signal, b: Signal): Signal {
	return BinaryOp(14, a, b);
}
export function BitOr(a: Signal, b: Signal): Signal {
	return BinaryOp(15, a, b);
}
export function BitXor(a: Signal, b: Signal): Signal {
	return BinaryOp(16, a, b);
}
export function Lcm(a: Signal, b: Signal): Signal {
	return BinaryOp(17, a, b);
}
export function Gcd(a: Signal, b: Signal): Signal {
	return BinaryOp(18, a, b);
}
export function RoundTo(a: Signal, b: Signal): Signal {
	return BinaryOp(19, a, b);
}
export function RoundUp(a: Signal, b: Signal): Signal {
	return BinaryOp(20, a, b);
}
export function Trunc(a: Signal, b: Signal): Signal {
	return BinaryOp(21, a, b);
}
export function Atan2(a: Signal, b: Signal): Signal {
	return BinaryOp(22, a, b);
}
export function Hypot(a: Signal, b: Signal): Signal {
	return BinaryOp(23, a, b);
}
export function Hypotx(a: Signal, b: Signal): Signal {
	return BinaryOp(24, a, b);
}
export function Pow(a: Signal, b: Signal): Signal {
	return BinaryOp(25, a, b);
}
export function ShiftLeft(a: Signal, b: Signal): Signal {
	return BinaryOp(26, a, b);
}
export function ShiftRight(a: Signal, b: Signal): Signal {
	return BinaryOp(27, a, b);
}
export function UnsignedShift(a: Signal, b: Signal): Signal {
	return BinaryOp(28, a, b);
}
export function Fill(a: Signal, b: Signal): Signal {
	return BinaryOp(29, a, b);
}
export function Ring1(a: Signal, b: Signal): Signal {
	return BinaryOp(30, a, b);
}
export function Ring2(a: Signal, b: Signal): Signal {
	return BinaryOp(31, a, b);
}
export function Ring3(a: Signal, b: Signal): Signal {
	return BinaryOp(32, a, b);
}
export function Ring4(a: Signal, b: Signal): Signal {
	return BinaryOp(33, a, b);
}
export function DifSqr(a: Signal, b: Signal): Signal {
	return BinaryOp(34, a, b);
}
export function SumSqr(a: Signal, b: Signal): Signal {
	return BinaryOp(35, a, b);
}
export function SqrSum(a: Signal, b: Signal): Signal {
	return BinaryOp(36, a, b);
}
export function SqrDif(a: Signal, b: Signal): Signal {
	return BinaryOp(37, a, b);
}
export function AbsDif(a: Signal, b: Signal): Signal {
	return BinaryOp(38, a, b);
}
export function Thresh(a: Signal, b: Signal): Signal {
	return BinaryOp(39, a, b);
}
export function AmClip(a: Signal, b: Signal): Signal {
	return BinaryOp(40, a, b);
}
export function ScaleNeg(a: Signal, b: Signal): Signal {
	return BinaryOp(41, a, b);
}
export function Clip2(a: Signal, b: Signal): Signal {
	return BinaryOp(42, a, b);
}
export function Excess(a: Signal, b: Signal): Signal {
	return BinaryOp(43, a, b);
}
export function Fold2(a: Signal, b: Signal): Signal {
	return BinaryOp(44, a, b);
}
export function Wrap2(a: Signal, b: Signal): Signal {
	return BinaryOp(45, a, b);
}
export function FirstArg(a: Signal, b: Signal): Signal {
	return BinaryOp(46, a, b);
}
export function RandRange(a: Signal, b: Signal): Signal {
	return BinaryOp(47, a, b);
}
export function ExpRandRange(a: Signal, b: Signal): Signal {
	return BinaryOp(48, a, b);
}

export function Neg(a: Signal): Signal {
	return UnaryOp(0, a);
}
export function Not(a: Signal): Signal {
	return UnaryOp(1, a);
}
export function IsNil(a: Signal): Signal {
	return UnaryOp(2, a);
}
export function NotNil(a: Signal): Signal {
	return UnaryOp(3, a);
}
export function BitNot(a: Signal): Signal {
	return UnaryOp(4, a);
}
export function Abs(a: Signal): Signal {
	return UnaryOp(5, a);
}
export function AsFloat(a: Signal): Signal {
	return UnaryOp(6, a);
}
export function AsInt(a: Signal): Signal {
	return UnaryOp(7, a);
}
export function Ceil(a: Signal): Signal {
	return UnaryOp(8, a);
}
export function Floor(a: Signal): Signal {
	return UnaryOp(9, a);
}
export function Frac(a: Signal): Signal {
	return UnaryOp(10, a);
}
export function Sign(a: Signal): Signal {
	return UnaryOp(11, a);
}
export function Squared(a: Signal): Signal {
	return UnaryOp(12, a);
}
export function Cubed(a: Signal): Signal {
	return UnaryOp(13, a);
}
export function Sqrt(a: Signal): Signal {
	return UnaryOp(14, a);
}
export function Exp(a: Signal): Signal {
	return UnaryOp(15, a);
}
export function Recip(a: Signal): Signal {
	return UnaryOp(16, a);
}
export function MidiCps(a: Signal): Signal {
	return UnaryOp(17, a);
}
export function CpsMidi(a: Signal): Signal {
	return UnaryOp(18, a);
}
export function MidiRatio(a: Signal): Signal {
	return UnaryOp(19, a);
}
export function RatioMidi(a: Signal): Signal {
	return UnaryOp(20, a);
}
export function DbAmp(a: Signal): Signal {
	return UnaryOp(21, a);
}
export function AmpDb(a: Signal): Signal {
	return UnaryOp(22, a);
}
export function OctCps(a: Signal): Signal {
	return UnaryOp(23, a);
}
export function CpsOct(a: Signal): Signal {
	return UnaryOp(24, a);
}
export function Log(a: Signal): Signal {
	return UnaryOp(25, a);
}
export function Log2(a: Signal): Signal {
	return UnaryOp(26, a);
}
export function Log10(a: Signal): Signal {
	return UnaryOp(27, a);
}
export function Sin(a: Signal): Signal {
	return UnaryOp(28, a);
}
export function Cos(a: Signal): Signal {
	return UnaryOp(29, a);
}
export function Tan(a: Signal): Signal {
	return UnaryOp(30, a);
}
export function ArcSin(a: Signal): Signal {
	return UnaryOp(31, a);
}
export function ArcCos(a: Signal): Signal {
	return UnaryOp(32, a);
}
export function ArcTan(a: Signal): Signal {
	return UnaryOp(33, a);
}
export function Sinh(a: Signal): Signal {
	return UnaryOp(34, a);
}
export function Cosh(a: Signal): Signal {
	return UnaryOp(35, a);
}
export function Tanh(a: Signal): Signal {
	return UnaryOp(36, a);
}
export function Rand_(a: Signal): Signal {
	return UnaryOp(37, a);
}
export function Rand2(a: Signal): Signal {
	return UnaryOp(38, a);
}
export function LinRand_(a: Signal): Signal {
	return UnaryOp(39, a);
}
export function BiLinRand(a: Signal): Signal {
	return UnaryOp(40, a);
}
export function Sum3Rand(a: Signal): Signal {
	return UnaryOp(41, a);
}
export function Distort(a: Signal): Signal {
	return UnaryOp(42, a);
}
export function SoftClip(a: Signal): Signal {
	return UnaryOp(43, a);
}
export function Coin(a: Signal): Signal {
	return UnaryOp(44, a);
}
export function DigitValue(a: Signal): Signal {
	return UnaryOp(45, a);
}
export function Silence(a: Signal): Signal {
	return UnaryOp(46, a);
}
export function Thru(a: Signal): Signal {
	return UnaryOp(47, a);
}
export function RectWindow(a: Signal): Signal {
	return UnaryOp(48, a);
}
export function HanWindow(a: Signal): Signal {
	return UnaryOp(49, a);
}
export function WelchWindow(a: Signal): Signal {
	return UnaryOp(50, a);
}
export function TriWindow(a: Signal): Signal {
	return UnaryOp(51, a);
}
export function Ramp_(a: Signal): Signal {
	return UnaryOp(52, a);
}
export function Scurve(a: Signal): Signal {
	return UnaryOp(53, a);
}

/*
import * as sc from './sc3.ts'
sc.TrigRoundRobin(4, 1)
*/
