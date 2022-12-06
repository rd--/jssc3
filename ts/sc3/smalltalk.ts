import { arrayClump, arrayConcatenation, arrayFill, arrayFromTo, arrayTranspose } from '../kernel/array.ts'
import { nullFix } from '../kernel/null.ts'
import { numberTimesRepeat, randomFloat, randomInteger } from '../kernel/number.ts'

import { Abs, Add, Ceil, CpsMidi, Cubed, Exp, Fdiv, Floor, MidiCps, MidiRatio, Min, Max, Mul, Neg, Recip, RoundTo, Sqrt, Sin, Tanh, Trunc } from './bindings.ts'
import { Env, envCoord } from './envelope.ts'
import { Signal } from './ugen.ts'
import { UnitCps } from './pseudo.ts'

export function append<T>(lhs: T[], rhs: T[]): T[] { return lhs.concat(rhs); } // smalltalk = ,
export function choose<T>(anArray: T[]): T { return anArray[randomInteger(0, anArray.length)]; }
export function clump<T>(anArray: T[], n: number): T[][] { return arrayClump(anArray, n); }
export function collect<T, U>(anArray: T[], proc: (aValue: T) => U): U[] { return anArray.map(proc); }
export function concatenation<T>(anArray: T[][]): T[] { return arrayConcatenation(anArray); }
export function first<T>(anArray: T[]): T { return anArray[0]; }
export function nth<T>(anArray: T[], index: number): T { return anArray[index - 1]; }
export function reverse<T>(anArray: T[]): T[] { return anArray.reverse(); }
export function second<T>(anArray: T[]): T { return anArray[1]; }
export function size<T>(anArray: T[]): number { return anArray.length; }
export function third<T>(anArray: T[]): T { return anArray[2]; }
export function transpose<T>(anArray: T[][]): T[][] { return arrayTranspose(anArray); }

export function mean(anArray: Signal[]): Signal { return Fdiv(sum(anArray), anArray.length); }
export function product(anArray: Signal[]): Signal { return anArray.reduce(Mul); }
export function sum(anArray: Signal[]): Signal { return anArray.reduce(Add); }

export function abs(aNumber: Signal): Signal { return Abs(aNumber); }
export function ceiling(aNumber: Signal): Signal { return Ceil(aNumber); }
export function cubed(aNumber: Signal): Signal { return Cubed(aNumber); }
export function exp(aNumber: Signal): Signal { return Exp(aNumber); }
export function floor(aNumber: Signal): Signal { return Floor(aNumber); }
export function log(aNumber: Signal): Signal { return Log(aNumber); }
export function negated(aNumber: Signal): Signal { return Neg(aNumber); }
export function reciprocal(aNumber: Signal): Signal { return Recip(aNumber); }
export function rounded(aNumber: Signal): Signal { return RoundTo(aNumber, 1); }
export function sin(aNumber: Signal): Signal { return Sin(aNumber); }
export function sqrt(aNumber: Signal): Signal { return Sqrt(aNumber); }
export function tanh(aNumber: Signal): Signal { return Tanh(aNumber); }

export function max(a: Signal, b: Signal): Signal { return Max(a, b); }
export function min(a: Signal, b: Signal): Signal { return Min(a, b); }
export function roundTo(a: Signal, b: Signal): Signal { return RoundTo(a, b); }
export function truncateTo(a: Signal, b: Signal): Signal { return Trunc(a, b); }

export function cpsMidi(aNumber: Signal): Signal { return CpsMidi(aNumber); }
export function midiCps(aNumber: Signal): Signal { return MidiCps(aNumber); }
export function midiRatio(aNumber: Signal): Signal { return MidiRatio(aNumber); }
export function unitCps(aNumber: Signal): Signal { return UnitCps(aNumber); }

export function rand(min: number, max: number): number { return randomFloat(min, max); }
export function rand2(n: number): number { return randomFloat(0 - n, n); }

export function timesRepeat(count: number, proc: (aValue: void) => void): void { return numberTimesRepeat(count, proc) }
export function to(from: number, to: number): number[] { return arrayFromTo(from, to); }

export function dup<T>(proc: (aValue: void) => T, count?: number): T[] {
	return arrayFill(nullFix('dup: count?', count, 2), proc);
}
export function value(proc: (p1?: unknown, p2?: unknown) => unknown, maybeArg1?: unknown, maybeArg2?: unknown): unknown {
	return maybeArg2 ? proc(maybeArg1, maybeArg2) : (maybeArg1 ? proc(maybeArg1) : proc());
}

export function coord(anEnvelope: Env): Signal[] { return envCoord(anEnvelope); }
