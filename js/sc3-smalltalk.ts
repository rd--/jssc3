// sc3-smalltalk.ts

import { arrayClump, arrayConcatenation, arrayFill, arrayFromTo, arrayTranspose } from './sc3-array.js'
import { add, fdiv, mul, neg, recip, round, trunc } from './sc3-bindings.js'
import { envCoord } from './sc3-envelope.js'
import { Dictionary } from './sc3-dictionary.js'
import { nullFix } from './sc3-null.js'
import { numberTimesRepeat, randomFloat, randomInteger } from './sc3-number.js'
import { Signal } from './sc3-ugen.js'

export function append(lhs: any[], rhs: any[]): any[] { return lhs.concat(rhs); } // smalltalk = ,
export function choose(anArray: any[]): any { return anArray[randomInteger(0, anArray.length)]; }
export function clump(anArray: any[], n: number) { return arrayClump(anArray, n); }
export function collect(anArray: any[], proc: (aValue: any) => any): any[] { return anArray.map(proc); }
export function concatenation(anArray: any[]) { return arrayConcatenation(anArray); }
export function first(anArray: any[]): any { return anArray[0]; }
export function nth(anArray: any[], index: number): any { return anArray[index - 1]; }
export function reverse(anArray: any[]): any[] { return anArray.reverse(); }
export function second(anArray: any[]): any { return anArray[1]; }
export function size(anArray: any[]): any { return anArray.length; }
export function third(anArray: any[]): any { return anArray[2]; }
export function transpose(anArray: any[]) { return arrayTranspose(anArray); }

export function mean(anArray: Signal[]): Signal { return fdiv(sum(anArray), anArray.length); }
export function product(anArray: Signal[]): Signal { return anArray.reduce(mul); }
export function sum(anArray: Signal[]): Signal { return anArray.reduce(add); }

export function negated(aNumber: Signal): Signal { return neg(aNumber); }
export function reciprocal(a: Signal): Signal { return recip(a); }
export function roundTo(a: Signal, b: Signal): Signal { return round(a, b); }
export function rounded(a: Signal): Signal { return round(a, 1); }
export function truncateTo(a: Signal, b: Signal): Signal { return trunc(a, b); }

export function rand(min: number, max: number): number { return randomFloat(min, max); }
export function rand2(n: number): number { return randomFloat(0 - n, n); }
export function timesRepeat(count: number, proc: (aValue: void) => void): void { return numberTimesRepeat(count, proc) }
export function to(from: number, to: number): number[] { return arrayFromTo(from, to); }

export function dup(proc: (aValue: void) => any, count?: number): any[] {
	return arrayFill(nullFix('dup: count?', count, 2), proc);
}
export function value(proc: (p1?: any, p2?: any) => any, maybeArg1?: any, maybeArg2?: any): any {
	return maybeArg2 ? proc(maybeArg1, maybeArg2) : (maybeArg1 ? proc(maybeArg1) : proc());
}

export function coord(anEnvelope: Dictionary): Signal[] { return envCoord(anEnvelope); }
