'use strict';

// Schroeder allpass delay line with cubic interpolation.
function AllpassC(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('AllpassC', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Schroeder allpass delay line with linear interpolation.
function AllpassL(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('AllpassL', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Schroeder allpass delay line with no interpolation.
function AllpassN(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('AllpassN', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Basic psychoacoustic amplitude compensation.
function AmpComp(freq, root, exp) {
    return makeUgen('AmpComp', 1, Rate.ar, 0, [freq, root, exp]);
}
// Basic psychoacoustic amplitude compensation (ANSI A-weighting curve).
function AmpCompA(freq, root, minAmp, rootAmp) {
    return makeUgen('AmpCompA', 1, Rate.ar, 0, [freq, root, minAmp, rootAmp]);
}
// Amplitude follower
function Amplitude(input, attackTime, releaseTime) {
    return makeUgen('Amplitude', 1, Rate.ar, 0, [input, attackTime, releaseTime]);
}
// Stereo signal balancer
function Balance2(left, right, pos, level) {
    return makeUgen('Balance2', 2, [0, 1], 0, [left, right, pos, level]);
}
// Band Pass Filter
function BBandPass(input, freq, bw) {
    return makeUgen('BBandPass', 1, [0], 0, [input, freq, bw]);
}
// Band reject filter
function BBandStop(input, freq, bw) {
    return makeUgen('BBandStop', 1, [0], 0, [input, freq, bw]);
}
// Band limited impulse oscillator.
function Blip(freq, numharm) {
    return makeUgen('Blip', 1, Rate.ar, 0, [freq, numharm]);
}
// (Undocumented class)
function BlockSize() {
    return makeUgen('BlockSize', 1, Rate.ir, 0, []);
}
// 12db/oct rolloff - 2nd order resonant Low Pass Filter
function BLowPass(input, freq, rq) {
    return makeUgen('BLowPass', 1, [0], 0, [input, freq, rq]);
}
// 2nd order Butterworth bandpass filter.
function BPF(input, freq, rq) {
    return makeUgen('BPF', 1, [0], 0, [input, freq, rq]);
}
// Two zero fixed midpass.
function BPZ2(input) {
    return makeUgen('BPZ2', 1, [0], 0, [input]);
}
// 2nd order Butterworth band reject filter.
function BRF(input, freq, rq) {
    return makeUgen('BRF', 1, [0], 0, [input, freq, rq]);
}
// Brown Noise.
function BrownNoise() {
    return makeUgen('BrownNoise', 1, Rate.ar, 0, []);
}
// Current duration of soundfile in buffer.
function BufDur(bufnum) {
    return makeUgen('BufDur', 1, Rate.kr, 0, [bufnum]);
}
// Current number of frames allocated in the buffer.
function BufFrames(bufnum) {
    return makeUgen('BufFrames', 1, Rate.kr, 0, [bufnum]);
}
// Buffer rate scaling in respect to server samplerate.
function BufRateScale(bufnum) {
    return makeUgen('BufRateScale', 1, Rate.kr, 0, [bufnum]);
}
// Buffer reading oscillator.
function BufRd(numChan, bufnum, phase, loop, interpolation) {
    return makeUgen('BufRd', numChan, Rate.ar, 0, [bufnum, phase, loop, interpolation]);
}
// Buffer writing oscillator.
function BufWr(bufnum, phase, loop, inputArray) {
    return makeUgen('BufWr', 1, [3], 0, [bufnum, phase, loop].concat(unitArrayIfScalar(inputArray)));
}
// (Undocumented class)
function ClearBuf(buf) {
    return makeUgen('ClearBuf', 1, Rate.ir, 0, [buf]);
}
// Clip a signal outside given thresholds.
function Clip(input, lo, hi) {
    return makeUgen('Clip', 1, [0], 0, [input, lo, hi]);
}
// Statistical gate.
function CoinGate(prob, input) {
    return makeUgen('CoinGate', 1, [1], 0, [prob, input]);
}
// Comb delay line with cubic interpolation.
function CombC(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('CombC', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Comb delay line with linear interpolation.
function CombL(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('CombL', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Comb delay line with no interpolation.
function CombN(input, maxdelaytime, delaytime, decaytime) {
    return makeUgen('CombN', 1, [0], 0, [input, maxdelaytime, delaytime, decaytime]);
}
// Duration of one block
function ControlDur() {
    return makeUgen('ControlDur', 1, Rate.ir, 0, []);
}
// Server control rate.
function ControlRate() {
    return makeUgen('ControlRate', 1, Rate.ir, 0, []);
}
// Real-time convolver.
function Convolution(input, kernel, framesize) {
    return makeUgen('Convolution', 1, Rate.ar, 0, [input, kernel, framesize]);
}
// Chaotic noise function.
function Crackle(chaosParam) {
    return makeUgen('Crackle', 1, Rate.ar, 0, [chaosParam]);
}
// Cusp map chaotic generator
function CuspL(freq, a, b, xi) {
    return makeUgen('CuspL', 1, Rate.ar, 0, [freq, a, b, xi]);
}
// Buffer read demand ugen
function Dbufrd(bufnum, phase, loop) {
    return makeUgen('Dbufrd', 1, Rate.dr, 0, [bufnum, phase, loop]);
}
// Buffer write demand ugen
function Dbufwr(bufnum, phase, input, loop) {
    return makeUgen('Dbufwr', 1, Rate.dr, 0, [bufnum, phase, input, loop]);
}
// Create a constant amplitude signal
function DC(input) {
    return makeUgen('DC', 1, Rate.ar, 0, [input]);
}
// Exponential decay
function Decay(input, decayTime) {
    return makeUgen('Decay', 1, [0], 0, [input, decayTime]);
}
// Exponential decay
function Decay2(input, attackTime, decayTime) {
    return makeUgen('Decay2', 1, [0], 0, [input, attackTime, decayTime]);
}
// Convert signal to modal pitch.
function DegreeToKey(bufnum, input, octave) {
    return makeUgen('DegreeToKey', 1, [1], 0, [bufnum, input, octave]);
}
// Single sample delay.
function Delay1(input) {
    return makeUgen('Delay1', 1, [0], 0, [input]);
}
// Simple delay line with cubic interpolation.
function DelayC(input, maxdelaytime, delaytime) {
    return makeUgen('DelayC', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
// Simple delay line with linear interpolation.
function DelayL(input, maxdelaytime, delaytime) {
    return makeUgen('DelayL', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
// Simple delay line with no interpolation.
function DelayN(input, maxdelaytime, delaytime) {
    return makeUgen('DelayN', 1, [0], 0, [input, maxdelaytime, delaytime]);
}
// Demand results from demand rate UGens.
function Demand(trig, reset, demandUGens) {
    return makeUgen('Demand', unitArrayIfScalar(demandUGens).length, [0], 0, [trig, reset].concat(unitArrayIfScalar(demandUGens)));
}
// Detect when input falls below an amplitude threshold
function DetectSilence(input, amp, time, doneAction) {
    return makeUgen('DetectSilence', 1, [0], 0, [input, amp, time, doneAction]);
}
// Demand rate white noise random generator.
function Diwhite(length, lo, hi) {
    return makeUgen('Diwhite', 1, Rate.dr, 0, [length, lo, hi]);
}
// Demand rate random sequence generator.
function Drand(repeats, list) {
    return makeUgen('Drand', 1, Rate.dr, 0, [repeats].concat(unitArrayIfScalar(list)));
}
// Demand rate sequence generator.
function Dseq(repeats, list) {
    return makeUgen('Dseq', 1, Rate.dr, 0, [repeats].concat(unitArrayIfScalar(list)));
}
// Demand rate arithmetic series UGen.
function Dseries(length, start, step) {
    return makeUgen('Dseries', 1, Rate.dr, 0, [length, start, step]);
}
// Demand rate random sequence generator
function Dshuf(repeats, list) {
    return makeUgen('Dshuf', 1, Rate.dr, 0, [repeats].concat(unitArrayIfScalar(list)));
}
// Random impulses.
function Dust(density) {
    return makeUgen('Dust', 1, Rate.ar, 0, [density]);
}
// Random impulses.
function Dust2(density) {
    return makeUgen('Dust2', 1, Rate.ar, 0, [density]);
}
// Demand results from demand rate UGens.
function Duty(dur, reset, doneAction, level) {
    return makeUgen('Duty', 1, Rate.ar, 0, [dur, reset, doneAction, level]);
}
// Plucked physical model.
function DWGPluckedStiff(freq, amp, gate, pos, c1, c3, inp, release, fB) {
    return makeUgen('DWGPluckedStiff', 1, Rate.ar, 0, [freq, amp, gate, pos, c1, c3, inp, release, fB]);
}
// Envelope generator
function EnvGen(gate, levelScale, levelBias, timeScale, doneAction, envelope) {
    return makeUgen('EnvGen', 1, Rate.ar, 0, [gate, levelScale, levelBias, timeScale, doneAction].concat(unitArrayIfScalar(envelope)));
}
// Exponential single random number generator.
function ExpRand(lo, hi) {
    return makeUgen('ExpRand', 1, Rate.ir, 0, [lo, hi]);
}
// Feedback sine with chaotic phase indexing
function FBSineL(freq, im, fb, a, c, xi, yi) {
    return makeUgen('FBSineL', 1, Rate.ar, 0, [freq, im, fb, a, c, xi, yi]);
}
// Feedback sine with chaotic phase indexing
function FBSineC(freq, im, fb, a, c, xi, yi) {
    return makeUgen('FBSineC', 1, Rate.ar, 0, [freq, im, fb, a, c, xi, yi]);
}
// Fast Fourier Transform
function FFT(buffer, input, hop, wintype, active, winsize) {
    return makeUgen('FFT', 1, Rate.kr, 0, [buffer, input, hop, wintype, active, winsize]);
}
// Fold a signal outside given thresholds.
function Fold(input, lo, hi) {
    return makeUgen('Fold', 1, [0], 0, [input, lo, hi]);
}
// Formant oscillator
function Formant(fundfreq, formfreq, bwfreq) {
    return makeUgen('Formant', 1, Rate.ar, 0, [fundfreq, formfreq, bwfreq]);
}
// FOF-like filter.
function Formlet(input, freq, attacktime, decaytime) {
    return makeUgen('Formlet', 1, [0], 0, [input, freq, attacktime, decaytime]);
}
// Frequency Shifter.
function FreqShift(input, freq, phase) {
    return makeUgen('FreqShift', 1, Rate.ar, 0, [input, freq, phase]);
}
// Fast sine oscillator.
function FSinOsc(freq, iphase) {
    return makeUgen('FSinOsc', 1, Rate.ar, 0, [freq, iphase]);
}
// A reverb
function FreeVerb(input, mix, room, damp) {
    return makeUgen('FreeVerb', 1, [0], 0, [input, mix, room, damp]);
}
// A two-channel reverb
function FreeVerb2(input, in2, mix, room, damp) {
    return makeUgen('FreeVerb2', 2, [0], 0, [input, in2, mix, room, damp]);
}
// Dynamic stochastic synthesis generator.
function Gendy1(ampdist, durdist, adparam, ddparam, minfreq, maxfreq, ampscale, durscale, initCPs, knum) {
    return makeUgen('Gendy1', 1, Rate.ar, 0, [ampdist, durdist, adparam, ddparam, minfreq, maxfreq, ampscale, durscale, initCPs, knum]);
}
// Granular synthesis with frequency modulated sine tones
function GrainFM(numChan, trigger, dur, carfreq, modfreq, index, pan, envbufnum, maxGrains) {
    return makeUgen('GrainFM', numChan, Rate.ar, 0, [trigger, dur, carfreq, modfreq, index, pan, envbufnum, maxGrains]);
}
// Granular synthesis with sine tones
function GrainSin(numChan, trigger, dur, freq, pan, envbufnum, maxGrains) {
    return makeUgen('GrainSin', numChan, Rate.ar, 0, [trigger, dur, freq, pan, envbufnum, maxGrains]);
}
// Gray Noise.
function GrayNoise() {
    return makeUgen('GrayNoise', 1, Rate.ar, 0, []);
}
// A two-channel reverb
function GVerb(input, roomsize, revtime, damping, inputbw, spread, drylevel, earlyreflevel, taillevel, maxroomsize) {
    return makeUgen('GVerb', 2, [0], 0, [input, roomsize, revtime, damping, inputbw, spread, drylevel, earlyreflevel, taillevel, maxroomsize]);
}
// Scrambled value with a hash function.
function Hasher(input) {
    return makeUgen('Hasher', 1, [0], 0, [input]);
}
// Henon map chaotic generator
function HenonL(freq, a, b, x0, x1) {
    return makeUgen('HenonL', 1, Rate.ar, 0, [freq, a, b, x0, x1]);
}
// Henon map chaotic generator
function HenonC(freq, a, b, x0, x1) {
    return makeUgen('HenonC', 1, Rate.ar, 0, [freq, a, b, x0, x1]);
}
// 2nd order Butterworth highpass filter.
function HPF(input, freq) {
    return makeUgen('HPF', 1, [0], 0, [input, freq]);
}
// Two point difference filter
function HPZ1(input) {
    return makeUgen('HPZ1', 1, [0], 0, [input]);
}
// Inverse Fast Fourier Transform
function IFFT(buffer, wintype, winsize) {
    return makeUgen('IFFT', 1, Rate.ar, 0, [buffer, wintype, winsize]);
}
// Impulse oscillator.
function Impulse(freq, phase) {
    return makeUgen('Impulse', 1, Rate.ar, 0, [freq, phase]);
}
// Read a signal from a bus.
function In(numChan, bus) {
    return makeUgen('In', numChan, Rate.ar, 0, [bus]);
}
// Index into a table with a signal
function Index(bufnum, input) {
    return makeUgen('Index', 1, [1], 0, [bufnum, input]);
}
// Finds the (lowest) point in the Buffer at which the input signal lies in-between the two values
function IndexInBetween(bufnum, input) {
    return makeUgen('IndexInBetween', 1, [1], 0, [bufnum, input]);
}
// Read signal from a bus with a current or one cycle old timestamp.
function InFeedback(numChan, bus) {
    return makeUgen('InFeedback', numChan, Rate.ar, 0, [bus]);
}
// Tests if a signal is within a given range.
function InRange(input, lo, hi) {
    return makeUgen('InRange', 1, [0], 0, [input, lo, hi]);
}
// Single integer random number generator.
function IRand(lo, hi) {
    return makeUgen('IRand', 1, Rate.ir, 0, [lo, hi]);
}
// A leaky integrator.
function Integrator(input, coef) {
    return makeUgen('Integrator', 1, [0], 0, [input, coef]);
}
// Control to audio rate converter.
function K2A(input) {
    return makeUgen('K2A', 1, Rate.ar, 0, [input]);
}
// Respond to the state of a key
function KeyState(keycode, minval, maxval, lag) {
    return makeUgen('KeyState', 1, Rate.kr, 0, [keycode, minval, maxval, lag]);
}
// Sine oscillator bank
function Klang(freqscale, freqoffset, specificationsArrayRef) {
    return makeUgen('Klang', 1, Rate.ar, 0, [freqscale, freqoffset].concat(unitArrayIfScalar(specificationsArrayRef)));
}
// Bank of resonators
function Klank(input, freqscale, freqoffset, decayscale, specificationsArrayRef) {
    return makeUgen('Klank', 1, [0], 0, [input, freqscale, freqoffset, decayscale].concat(unitArrayIfScalar(specificationsArrayRef)));
}
// random walk linear interp
function LFBrownNoise1(freq, dev, dist) {
    return makeUgen('LFBrownNoise1', 1, Rate.ar, 0, [freq, dev, dist]);
}
// Clipped noise
function LFClipNoise(freq) {
    return makeUgen('LFClipNoise', 1, Rate.ar, 0, [freq]);
}
// A sine like shape made of two cubic pieces
function LFCub(freq, iphase) {
    return makeUgen('LFCub', 1, Rate.ar, 0, [freq, iphase]);
}
// Dynamic ramp noise
function LFDNoise1(freq) {
    return makeUgen('LFDNoise1', 1, Rate.ar, 0, [freq]);
}
// Dynamic cubic noise
function LFDNoise3(freq) {
    return makeUgen('LFDNoise3', 1, Rate.ar, 0, [freq]);
}
// Gaussian function oscillator
function LFGauss(duration, width, iphase, loop, doneAction) {
    return makeUgen('LFGauss', 1, Rate.ar, 0, [duration, width, iphase, loop, doneAction]);
}
// Step noise
function LFNoise0(freq) {
    return makeUgen('LFNoise0', 1, Rate.ar, 0, [freq]);
}
// Ramp noise
function LFNoise1(freq) {
    return makeUgen('LFNoise1', 1, Rate.ar, 0, [freq]);
}
// Quadratic noise.
function LFNoise2(freq) {
    return makeUgen('LFNoise2', 1, Rate.ar, 0, [freq]);
}
// Parabolic oscillator
function LFPar(freq, iphase) {
    return makeUgen('LFPar', 1, Rate.ar, 0, [freq, iphase]);
}
// pulse oscillator
function LFPulse(freq, iphase, width) {
    return makeUgen('LFPulse', 1, Rate.ar, 0, [freq, iphase, width]);
}
// Sawtooth oscillator
function LFSaw(freq, iphase) {
    return makeUgen('LFSaw', 1, Rate.ar, 0, [freq, iphase]);
}
// Triangle oscillator
function LFTri(freq, iphase) {
    return makeUgen('LFTri', 1, Rate.ar, 0, [freq, iphase]);
}
// 2nd order Butterworth lowpass filter
function LPF(input, freq) {
    return makeUgen('LPF', 1, [0], 0, [input, freq]);
}
// Exponential lag
function Lag(input, lagTime) {
    return makeUgen('Lag', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
function LagUD(input, lagTimeU, lagTimeD) {
    return makeUgen('LagUD', 1, [0], 0, [input, lagTimeU, lagTimeD]);
}
// Exponential lag
function Lag2(input, lagTime) {
    return makeUgen('Lag2', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
function Lag3(input, lagTime) {
    return makeUgen('Lag3', 1, [0], 0, [input, lagTime]);
}
// Exponential lag
function Lag3UD(input, lagTimeU, lagTimeD) {
    return makeUgen('Lag3UD', 1, [0], 0, [input, lagTimeU, lagTimeD]);
}
// Sample and hold
function Latch(input, trig) {
    return makeUgen('Latch', 1, [0], 0, [input, trig]);
}
// Remove DC
function LeakDC(input, coef) {
    return makeUgen('LeakDC', 1, [0], 0, [input, coef]);
}
// Peak limiter
function Limiter(input, level, dur) {
    return makeUgen('Limiter', 1, [0], 0, [input, level, dur]);
}
// Line generator.
function Line(start, end, dur, doneAction) {
    return makeUgen('Line', 1, Rate.ar, 0, [start, end, dur, doneAction]);
}
// Simple linear envelope generator.
function Linen(gate, attackTime, susLevel, releaseTime, doneAction) {
    return makeUgen('Linen', 1, Rate.kr, 0, [gate, attackTime, susLevel, releaseTime, doneAction]);
}
// Map a linear range to an exponential range
function LinExp(input, srclo, srchi, dstlo, dsthi) {
    return makeUgen('LinExp', 1, [0], 0, [input, srclo, srchi, dstlo, dsthi]);
}
// Two channel linear pan.
function LinPan2(input, pos, level) {
    return makeUgen('LinPan2', 2, [0], 0, [input, pos, level]);
}
// Skewed random number generator.
function LinRand(lo, hi, minmax) {
    return makeUgen('LinRand', 1, Rate.ir, 0, [lo, hi, minmax]);
}
// Two channel linear crossfade.
function LinXFade2(inA, inB, pan) {
    return makeUgen('LinXFade2', 1, [0, 1], 0, [inA, inB, pan]);
}
// Allocate a buffer local to the synth
function LocalBuf(numChannels, numFrames) {
    return makeUgen('LocalBuf', 1, Rate.ir, 0, [numChannels, numFrames]);
}
// Define and read from buses local to a synth.
function LocalIn(numChan, defaultValue) {
    return makeUgen('LocalIn', numChan, Rate.ar, 0, [].concat(unitArrayIfScalar(defaultValue)));
}
// Write to buses local to a synth.
function LocalOut(channelsArray) {
    return makeUgen('LocalOut', 0, [0], 0, [].concat(unitArrayIfScalar(channelsArray)));
}
// Two point average filter
function LPZ1(input) {
    return makeUgen('LPZ1', 1, [0], 0, [input]);
}
// Reduce precision.
function MantissaMask(input, bits) {
    return makeUgen('MantissaMask', 1, [0], 0, [input, bits]);
}
// LocalBuf count
function MaxLocalBufs(count) {
    return makeUgen('MaxLocalBufs', 1, Rate.ir, 0, [count]);
}
// Minimum difference of two values in modulo arithmetics
function ModDif(x, y, mod) {
    return makeUgen('ModDif', 1, [0], 0, [x, y, mod]);
}
// Moog VCF implementation, designed by Federico Fontana
function MoogFF(input, freq, gain, reset) {
    return makeUgen('MoogFF', 1, [0], 0, [input, freq, gain, reset]);
}
// Mouse button UGen.
function MouseButton(minval, maxval, lag) {
    return makeUgen('MouseButton', 1, Rate.kr, 0, [minval, maxval, lag]);
}
// Cursor tracking UGen.
function MouseX(minval, maxval, warp, lag) {
    return makeUgen('MouseX', 1, Rate.kr, 0, [minval, maxval, warp, lag]);
}
// Cursor tracking UGen.
function MouseY(minval, maxval, warp, lag) {
    return makeUgen('MouseY', 1, Rate.kr, 0, [minval, maxval, warp, lag]);
}
// Multiply add
function MulAdd(input, mul, add) {
    return makeUgen('MulAdd', 1, [0, 1, 2], 0, [input, mul, add]);
}
// Flattens dynamics.
function Normalizer(input, level, dur) {
    return makeUgen('Normalizer', 1, [0], 0, [input, level, dur]);
}
// Sum of uniform distributions.
function NRand(lo, hi, n) {
    return makeUgen('NRand', 1, Rate.ir, 0, [lo, hi, n]);
}
// Number of output busses.
function NumOutputBuses() {
    return makeUgen('NumOutputBuses', 1, Rate.ir, 0, []);
}
// One pole filter.
function OnePole(input, coef) {
    return makeUgen('OnePole', 1, [0], 0, [input, coef]);
}
// Interpolating wavetable oscillator.
function Osc(bufnum, freq, phase) {
    return makeUgen('Osc', 1, Rate.ar, 0, [bufnum, freq, phase]);
}
// Write a signal to a bus.
function Out(bus, channelsArray) {
    return makeUgen('Out', 0, [1], 0, [bus].concat(unitArrayIfScalar(channelsArray)));
}
// Two channel equal power pan.
function Pan2(input, pos, level) {
    return makeUgen('Pan2', 2, [0], 0, [input, pos, level]);
}
// Azimuth panner
function PanAz(numChan, input, pos, level, width, orientation) {
    return makeUgen('PanAz', numChan, [0], 0, [input, pos, level, width, orientation]);
}
// A resettable linear ramp between two levels.
function Phasor(trig, rate, start, end, resetPos) {
    return makeUgen('Phasor', 1, Rate.ar, 0, [trig, rate, start, end, resetPos]);
}
// Pink Noise.
function PinkNoise() {
    return makeUgen('PinkNoise', 1, Rate.ar, 0, []);
}
// Autocorrelation pitch follower
function Pitch(input, initFreq, minFreq, maxFreq, execFreq, maxBinsPerOctave, median, ampThreshold, peakThreshold, downSample, clar) {
    return makeUgen('Pitch', 2, Rate.kr, 0, [input, initFreq, minFreq, maxFreq, execFreq, maxBinsPerOctave, median, ampThreshold, peakThreshold, downSample, clar]);
}
// Time domain pitch shifter.
function PitchShift(input, windowSize, pitchRatio, pitchDispersion, timeDispersion) {
    return makeUgen('PitchShift', 1, [0], 0, [input, windowSize, pitchRatio, pitchDispersion, timeDispersion]);
}
// Sample playback oscillator.
function PlayBuf(numChan, bufnum, rate, trigger, startPos, loop, doneAction) {
    return makeUgen('PlayBuf', numChan, Rate.ar, 0, [bufnum, rate, trigger, startPos, loop, doneAction]);
}
// A Karplus-Strong UGen
function Pluck(input, trig, maxdelaytime, delaytime, decaytime, coef) {
    return makeUgen('Pluck', 1, [0], 0, [input, trig, maxdelaytime, delaytime, decaytime, coef]);
}
// Band limited pulse wave.
function Pulse(freq, width) {
    return makeUgen('Pulse', 1, Rate.ar, 0, [freq, width]);
}
// Pulse counter.
function PulseCount(trig, reset) {
    return makeUgen('PulseCount', 1, [0], 0, [trig, reset]);
}
// Pulse divider.
function PulseDivider(trig, div, start) {
    return makeUgen('PulseDivider', 1, [0], 0, [trig, div, start]);
}
// Pass random bins.
function PV_RandComb(buffer, wipe, trig) {
    return makeUgen('PV_RandComb', 1, Rate.kr, 0, [buffer, wipe, trig]);
}
// General quadratic map chaotic generator
function QuadL(freq, a, b, c, xi) {
    return makeUgen('QuadL', 1, Rate.ar, 0, [freq, a, b, c, xi]);
}
// General quadratic map chaotic generator
function QuadC(freq, a, b, c, xi) {
    return makeUgen('QuadC', 1, Rate.ar, 0, [freq, a, b, c, xi]);
}
// A resonant high pass filter.
function RHPF(input, freq, rq) {
    return makeUgen('RHPF', 1, [0], 0, [input, freq, rq]);
}
// A resonant low pass filter.
function RLPF(input, freq, rq) {
    return makeUgen('RLPF', 1, [0], 0, [input, freq, rq]);
}
// Single random number generator.
function Rand(lo, hi) {
    return makeUgen('Rand', 1, Rate.ir, 0, [lo, hi]);
}
// Record or overdub into a Buffer.
function RecordBuf(bufnum, offset, recLevel, preLevel, run, loop, trigger, doneAction, inputArray) {
    return makeUgen('RecordBuf', 1, Rate.ar, 0, [bufnum, offset, recLevel, preLevel, run, loop, trigger, doneAction].concat(unitArrayIfScalar(inputArray)));
}
// Send signal to a bus, overwriting previous contents.
function ReplaceOut(bus, channelsArray) {
    return makeUgen('ReplaceOut', 0, [1], 0, [bus].concat(unitArrayIfScalar(channelsArray)));
}
// Resonant filter.
function Resonz(input, freq, bwr) {
    return makeUgen('Resonz', 1, [0], 0, [input, freq, bwr]);
}
// Ringing filter.
function Ringz(input, freq, decaytime) {
    return makeUgen('Ringz', 1, [0], 0, [input, freq, decaytime]);
}
// Track maximum level.
function RunningMax(input, trig) {
    return makeUgen('RunningMax', 1, [0], 0, [input, trig]);
}
// Rotate a sound field.
function Rotate2(x, y, pos) {
    return makeUgen('Rotate2', 2, [0, 1], 0, [x, y, pos]);
}
// Duration of one sample.
function SampleDur() {
    return makeUgen('SampleDur', 1, Rate.ir, 0, []);
}
// Server sample rate.
function SampleRate() {
    return makeUgen('SampleRate', 1, Rate.ir, 0, []);
}
// Band limited sawtooth.
function Saw(freq) {
    return makeUgen('Saw', 1, Rate.ar, 0, [freq]);
}
// Select output from an array of inputs.
function Select(which, array) {
    return makeUgen('Select', 1, [0, 1], 0, [which].concat(unitArrayIfScalar(array)));
}
// Set local buffer
function SetBuf(buf, offset, length, array) {
    return makeUgen('SetBuf', 1, Rate.ir, 0, [buf, offset, length].concat(unitArrayIfScalar(array)));
}
// Set-reset flip flop.
function SetResetFF(trig, reset) {
    return makeUgen('SetResetFF', 1, [0, 1], 0, [trig, reset]);
}
// Interpolating sine wavetable oscillator.
function SinOsc(freq, phase) {
    return makeUgen('SinOsc', 1, Rate.ar, 0, [freq, phase]);
}
// Feedback FM oscillator
function SinOscFB(freq, feedback) {
    return makeUgen('SinOscFB', 1, Rate.ar, 0, [freq, feedback]);
}
// Slew rate limiter.
function Slew(input, up, dn) {
    return makeUgen('Slew', 1, [0], 0, [input, up, dn]);
}
// Slope of signal
function Slope(input) {
    return makeUgen('Slope', 1, [0], 0, [input]);
}
// Pulse counter.
function Stepper(trig, reset, min, max, step, resetval) {
    return makeUgen('Stepper', 1, [0], 0, [trig, reset, min, max, step, resetval]);
}
// Triggered linear ramp
function Sweep(trig, rate) {
    return makeUgen('Sweep', 1, [0], 0, [trig, rate]);
}
// Hard sync sawtooth wave.
function SyncSaw(syncFreq, sawFreq) {
    return makeUgen('SyncSaw', 1, Rate.ar, 0, [syncFreq, sawFreq]);
}
// Demand results as trigger from demand rate UGens.
function TDuty(dur, reset, doneAction, level, gapFirst) {
    return makeUgen('TDuty', 1, Rate.ar, 0, [dur, reset, doneAction, level, gapFirst]);
}
// Triggered exponential random number generator.
function TExpRand(lo, hi, trig) {
    return makeUgen('TExpRand', 1, [2], 0, [lo, hi, trig]);
}
// Buffer granulator.
function TGrains(numChan, trigger, bufnum, rate, centerPos, dur, pan, amp, interp) {
    return makeUgen('TGrains', numChan, Rate.ar, 0, [trigger, bufnum, rate, centerPos, dur, pan, amp, interp]);
}
// Returns time since last triggered.
function Timer(trig) {
    return makeUgen('Timer', 1, [0], 0, [trig]);
}
// Triggered integer random number generator.
function TIRand(lo, hi, trig) {
    return makeUgen('TIRand', 1, [2], 0, [lo, hi, trig]);
}
// Toggle flip flop.
function ToggleFF(trig) {
    return makeUgen('ToggleFF', 1, [0], 0, [trig]);
}
// Triggered random number generator.
function TRand(lo, hi, trig) {
    return makeUgen('TRand', 1, [2], 0, [lo, hi, trig]);
}
// Timed trigger.
function Trig(input, dur) {
    return makeUgen('Trig', 1, [0], 0, [input, dur]);
}
// Timed trigger.
function Trig1(input, dur) {
    return makeUgen('Trig1', 1, [0], 0, [input, dur]);
}
// Two pole filter.
function TwoPole(input, freq, radius) {
    return makeUgen('TwoPole', 1, [0], 0, [input, freq, radius]);
}
// Two zero filter.
function TwoZero(input, freq, radius) {
    return makeUgen('TwoZero', 1, [0], 0, [input, freq, radius]);
}
// Variable duty saw
function VarSaw(freq, iphase, width) {
    return makeUgen('VarSaw', 1, Rate.ar, 0, [freq, iphase, width]);
}
// The Vibrato oscillator models a slow frequency modulation.
function Vibrato(freq, rate, depth, delay, onset, rateVariation, depthVariation, iphase, trig) {
    return makeUgen('Vibrato', 1, Rate.ar, 0, [freq, rate, depth, delay, onset, rateVariation, depthVariation, iphase, trig]);
}
// White noise.
function WhiteNoise() {
    return makeUgen('WhiteNoise', 1, Rate.ar, 0, []);
}
// Wrap a signal outside given thresholds.
function Wrap(input, lo, hi) {
    return makeUgen('Wrap', 1, [0], 0, [input, lo, hi]);
}
// Index into a table with a signal.
function WrapIndex(bufnum, input) {
    return makeUgen('WrapIndex', 1, [1], 0, [bufnum, input]);
}
// Equal power two channel cross fade.
function XFade2(inA, inB, pan, level) {
    return makeUgen('XFade2', 1, [0, 1], 0, [inA, inB, pan, level]);
}
// Exponential line generator.
function XLine(start, end, dur, doneAction) {
    return makeUgen('XLine', 1, Rate.ar, 0, [start, end, dur, doneAction]);
}
// Zero crossing frequency follower
function ZeroCrossing(input) {
    return makeUgen('ZeroCrossing', 1, [0], 0, [input]);
}
// Moog Filter Emulation
function MoogLadder(input, ffreq, res) {
    return makeUgen('MoogLadder', 1, [0], 0, [input, ffreq, res]);
}
// algorithmic delay
function GreyholeRaw(in1, in2, damping, delaytime, diffusion, feedback, moddepth, modfreq, size) {
    return makeUgen('GreyholeRaw', 2, [0, 1], 0, [in1, in2, damping, delaytime, diffusion, feedback, moddepth, modfreq, size]);
}
// class B/AB power amp distortion simulation
function CrossoverDistortion(input, amp, smooth) {
    return makeUgen('CrossoverDistortion', 1, [0], 0, [input, amp, smooth]);
}
// A physical model of a system with dry-friction. A chaotic filter.
function Friction(input, friction, spring, damp, mass, beltmass) {
    return makeUgen('Friction', 1, Rate.ar, 0, [input, friction, spring, damp, mass, beltmass]);
}
// Waveguide mesh physical models of drum membranes
function MembraneCircle(excitation, tension, loss) {
    return makeUgen('MembraneCircle', 1, Rate.ar, 0, [excitation, tension, loss]);
}
// vosim pulse generator
function VOSIM(trig, freq, nCycles, decay) {
    return makeUgen('VOSIM', 1, Rate.ar, 0, [trig, freq, nCycles, decay]);
}
// a resonator
function MiRings(input, trig, pit, struct, bright, damp, pos, model, poly, intern_exciter, easteregg, bypass) {
    return makeUgen('MiRings', 2, Rate.ar, 0, [input, trig, pit, struct, bright, damp, pos, model, poly, intern_exciter, easteregg, bypass]);
}
// (Undocumented class)
function AnalogFoldOsc(freq, amp) {
    return makeUgen('AnalogFoldOsc', 1, Rate.ar, 0, [freq, amp]);
}
// rotating clock divider
function RCD(clock, rotate, reset, div, spread, auto, len, down, gates) {
    return makeUgen('RCD', 8, [0], 0, [clock, rotate, reset, div, spread, auto, len, down, gates]);
}
// shuffling clock multiplier
function SCM(clock, bpm, rotate, slip, shuffle, skip, pw) {
    return makeUgen('SCM', 8, Rate.ar, 0, [clock, bpm, rotate, slip, shuffle, skip, pw]);
}
// (Undocumented class)
function DustRange(iotMin, iotMax) {
    return makeUgen('DustRange', 1, Rate.ar, 0, [iotMin, iotMax]);
}
// (Undocumented class)
function ExpRandN(numChan, lo, hi) {
    return makeUgen('ExpRandN', numChan, Rate.ir, 0, [lo, hi]);
}
// (Undocumented class)
function LinRandN(numChan, lo, hi, minmax) {
    return makeUgen('LinRandN', numChan, Rate.ir, 0, [lo, hi, minmax]);
}
// (Undocumented class)
function RandN(numChan, lo, hi) {
    return makeUgen('RandN', numChan, Rate.ir, 0, [lo, hi]);
}
// (Undocumented class)
function TScramble(trigger, inputs) {
    return makeUgen('TScramble', unitArrayIfScalar(inputs).length, [0], 0, [trigger].concat(unitArrayIfScalar(inputs)));
}
// (Undocumented class)
function DX7(bufnum, on, off, data, vc, mnn, vel, pw, mw, bc, fc) {
    return makeUgen('DX7', 1, Rate.ar, 0, [bufnum, on, off, data, vc, mnn, vel, pw, mw, bc, fc]);
}
// (Undocumented class)
function RDX7Env(gate, data, r1, r2, r3, r4, l1, l2, l3, l4, ol) {
    return makeUgen('RDX7Env', 1, Rate.ar, 0, [gate, data, r1, r2, r3, r4, l1, l2, l3, l4, ol]);
}
// (Undocumented class)
function ObxdFilter(input, cutoff, resonance, multimode, bandpass, fourpole) {
    return makeUgen('ObxdFilter', 1, [0], 0, [input, cutoff, resonance, multimode, bandpass, fourpole]);
}
// (Undocumented class)
function SvfBp(input, freq, q) {
    return makeUgen('SvfBp', 1, Rate.ar, 0, [input, freq, q]);
}
// (Undocumented class)
function SvfHp(input, freq, q) {
    return makeUgen('SvfHp', 1, [0], 0, [input, freq, q]);
}
// (Undocumented class)
function SvfLp(input, freq, q) {
    return makeUgen('SvfLp', 1, Rate.ar, 0, [input, freq, q]);
}
// (Undocumented class)
function Bezier(haltAfter, dx, freq, phase, param) {
    return makeUgen('Bezier', 1, Rate.ar, 0, [haltAfter, dx, freq, phase].concat(unitArrayIfScalar(param)));
}
// (Undocumented class)
function Freezer(bufnum, left, right, gain, increment, incrementOffset, incrementRandom, rightRandom, syncPhaseTrigger, randomizePhaseTrigger, numberOfLoops) {
    return makeUgen('Freezer', 1, Rate.ar, 0, [bufnum, left, right, gain, increment, incrementOffset, incrementRandom, rightRandom, syncPhaseTrigger, randomizePhaseTrigger, numberOfLoops]);
}
// (Undocumented class)
function ShufflerB(bufnum, readLocationMinima, readLocationMaxima, readIncrementMinima, readIncrementMaxima, durationMinima, durationMaxima, envelopeAmplitudeMinima, envelopeAmplitudeMaxima, envelopeShapeMinima, envelopeShapeMaxima, envelopeSkewMinima, envelopeSkewMaxima, stereoLocationMinima, stereoLocationMaxima, interOffsetTimeMinima, interOffsetTimeMaxima, ftableReadLocationIncrement, readIncrementQuanta, interOffsetTimeQuanta) {
    return makeUgen('ShufflerB', 2, Rate.ar, 0, [bufnum, readLocationMinima, readLocationMaxima, readIncrementMinima, readIncrementMaxima, durationMinima, durationMaxima, envelopeAmplitudeMinima, envelopeAmplitudeMaxima, envelopeShapeMinima, envelopeShapeMaxima, envelopeSkewMinima, envelopeSkewMaxima, stereoLocationMinima, stereoLocationMaxima, interOffsetTimeMinima, interOffsetTimeMaxima, ftableReadLocationIncrement, readIncrementQuanta, interOffsetTimeQuanta]);
}

function add(a, b) { return BinaryOp(0, a, b); }
function sub(a, b) { return BinaryOp(1, a, b); }
function mul(a, b) { return BinaryOp(2, a, b); }
function idiv(a, b) { return BinaryOp(3, a, b); }
function fdiv(a, b) { return BinaryOp(4, a, b); }
function mod(a, b) { return BinaryOp(5, a, b); }
function eq(a, b) { return BinaryOp(6, a, b); }
function ne(a, b) { return BinaryOp(7, a, b); }
function lt(a, b) { return BinaryOp(8, a, b); }
function gt(a, b) { return BinaryOp(9, a, b); }
function le(a, b) { return BinaryOp(10, a, b); }
function ge(a, b) { return BinaryOp(11, a, b); }
function min(a, b) { return BinaryOp(12, a, b); }
function max(a, b) { return BinaryOp(13, a, b); }
function bitAnd(a, b) { return BinaryOp(14, a, b); }
function bitOr(a, b) { return BinaryOp(15, a, b); }
function bitXor(a, b) { return BinaryOp(16, a, b); }
function lcm(a, b) { return BinaryOp(17, a, b); }
function gcd(a, b) { return BinaryOp(18, a, b); }
function round(a, b) { return BinaryOp(19, a, b); }
function roundUp(a, b) { return BinaryOp(20, a, b); }
function trunc(a, b) { return BinaryOp(21, a, b); }
function atan2(a, b) { return BinaryOp(22, a, b); }
function hypot(a, b) { return BinaryOp(23, a, b); }
function hypotx(a, b) { return BinaryOp(24, a, b); }
function pow(a, b) { return BinaryOp(25, a, b); }
function shiftLeft(a, b) { return BinaryOp(26, a, b); }
function shiftRight(a, b) { return BinaryOp(27, a, b); }
function unsignedShift(a, b) { return BinaryOp(28, a, b); }
function fill(a, b) { return BinaryOp(29, a, b); }
function ring1(a, b) { return BinaryOp(30, a, b); }
function ring2(a, b) { return BinaryOp(31, a, b); }
function ring3(a, b) { return BinaryOp(32, a, b); }
function ring4(a, b) { return BinaryOp(33, a, b); }
function difSqr(a, b) { return BinaryOp(34, a, b); }
function sumSqr(a, b) { return BinaryOp(35, a, b); }
function sqrSum(a, b) { return BinaryOp(36, a, b); }
function sqrDif(a, b) { return BinaryOp(37, a, b); }
function absDif(a, b) { return BinaryOp(38, a, b); }
function thresh(a, b) { return BinaryOp(39, a, b); }
function amClip(a, b) { return BinaryOp(40, a, b); }
function scaleNeg(a, b) { return BinaryOp(41, a, b); }
function clip2(a, b) { return BinaryOp(42, a, b); }
function excess(a, b) { return BinaryOp(43, a, b); }
function fold2(a, b) { return BinaryOp(44, a, b); }
function wrap2(a, b) { return BinaryOp(45, a, b); }
function firstArg(a, b) { return BinaryOp(46, a, b); }
function randRange(a, b) { return BinaryOp(47, a, b); }
function expRandRange(a, b) { return BinaryOp(48, a, b); }

function neg(a) { return UnaryOp(0, a); }
function not(a) { return UnaryOp(1, a); }
function isNil(a) { return UnaryOp(2, a); }
function notNil(a) { return UnaryOp(3, a); }
function bitNot(a) { return UnaryOp(4, a); }
function abs(a) { return UnaryOp(5, a); }
function asFloat(a) { return UnaryOp(6, a); }
function asInt(a) { return UnaryOp(7, a); }
function ceil(a) { return UnaryOp(8, a); }
function floor(a) { return UnaryOp(9, a); }
function frac(a) { return UnaryOp(10, a); }
function sign(a) { return UnaryOp(11, a); }
function squared(a) { return UnaryOp(12, a); }
function cubed(a) { return UnaryOp(13, a); }
function sqrt(a) { return UnaryOp(14, a); }
function exp(a) { return UnaryOp(15, a); }
function recip(a) { return UnaryOp(16, a); }
function midiCps(a) { return UnaryOp(17, a); }
function cpsMidi(a) { return UnaryOp(18, a); }
function midiRatio(a) { return UnaryOp(19, a); }
function ratioMidi(a) { return UnaryOp(20, a); }
function dbAmp(a) { return UnaryOp(21, a); }
function ampDb(a) { return UnaryOp(22, a); }
function octCps(a) { return UnaryOp(23, a); }
function cpsOct(a) { return UnaryOp(24, a); }
function log(a) { return UnaryOp(25, a); }
function log2(a) { return UnaryOp(26, a); }
function log10(a) { return UnaryOp(27, a); }
function sin(a) { return UnaryOp(28, a); }
function cos(a) { return UnaryOp(29, a); }
function tan(a) { return UnaryOp(30, a); }
function arcSin(a) { return UnaryOp(31, a); }
function arcCos(a) { return UnaryOp(32, a); }
function arcTan(a) { return UnaryOp(33, a); }
function sinh(a) { return UnaryOp(34, a); }
function cosh(a) { return UnaryOp(35, a); }
function tanh(a) { return UnaryOp(36, a); }
function rand_(a) { return UnaryOp(37, a); }
function rand2(a) { return UnaryOp(38, a); }
function linRand_(a) { return UnaryOp(39, a); }
function biLinRand(a) { return UnaryOp(40, a); }
function sum3Rand(a) { return UnaryOp(41, a); }
function distort(a) { return UnaryOp(42, a); }
function softClip(a) { return UnaryOp(43, a); }
function coin(a) { return UnaryOp(44, a); }
function digitValue(a) { return UnaryOp(45, a); }
function silence(a) { return UnaryOp(46, a); }
function thru(a) { return UnaryOp(47, a); }
function rectWindow(a) { return UnaryOp(48, a); }
function hanWindow(a) { return UnaryOp(49, a); }
function welchWindow(a) { return UnaryOp(50, a); }
function triWindow(a) { return UnaryOp(51, a); }
function ramp_(a) { return UnaryOp(52, a); }
function scurve(a) { return UnaryOp(53, a); }

