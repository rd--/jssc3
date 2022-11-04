// sc3-smalltalk.ts

import { arrayClump, arrayConcatenation, arrayFill, arrayFromTo, arrayTranspose } from './sc3-array.js'
import { add, fdiv, mul, neg, recip, roundTo, trunc } from './sc3-bindings.js'
import { Env, envCoord } from './sc3-envelope.js'
import { nullFix } from './sc3-null.js'
import { numberTimesRepeat, randomFloat, randomInteger } from './sc3-number.js'
import { Signal } from './sc3-ugen.js'

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

export function mean(anArray: Signal[]): Signal { return fdiv(sum(anArray), anArray.length); }
export function product(anArray: Signal[]): Signal { return anArray.reduce(mul); }
export function sum(anArray: Signal[]): Signal { return anArray.reduce(add); }

export function negated(aNumber: Signal): Signal { return neg(aNumber); }
export function reciprocal(a: Signal): Signal { return recip(a); }
export function rounded(a: Signal): Signal { return roundTo(a, 1); }
export function truncateTo(a: Signal, b: Signal): Signal { return trunc(a, b); }

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
