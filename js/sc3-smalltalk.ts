function append(lhs: any[], rhs: any[]): any[] { return lhs.concat(rhs); }
function choose(anArray: any[]): any { return anArray[randomInteger(0, anArray.length)]; }
function clump(anArray: any[], n: number) { return arrayClump(anArray, n); }
function collect(anArray: any[], proc: (aValue: any) => any): any[] { return anArray.map(proc); }
function concatenation(anArray: any[]) { return arrayConcatenation(anArray); }
function coord(anEnvelope: Dictionary): Signal[] { return envCoord(anEnvelope); }
function dup(proc: (aValue: void) => any, count: number): any[] { return arrayFill(nullFix('dup: count?', count, 2), proc); }
function first(anArray: any[]): any { return anArray[0]; }
function mean(anArray: Signal[]): Signal { return fdiv(sum(anArray), anArray.length); }
function negated(aNumber: Signal): Signal { return neg(aNumber); }
function nth(anArray: any[], index: number): any { return anArray[index - 1]; }
function product(anArray : Signal[]): Signal { return anArray.reduce(mul); }
var rand = randomFloat;
function rand2(n: number): number { return randomFloat(0 - n, n); }
function reciprocal(a: Signal): Signal { return recip(a); }
function reverse(anArray: any[]): any[] { return anArray.reverse(); }
function roundTo(a: Signal, b: Signal): Signal { return round(a, b); }
function rounded(a: Signal): Signal { return round(a, 1); }
function second(anArray: any[]): any { return anArray[1]; }
function size(anArray: any[]): any { return anArray.length; }
function sum(anArray: Signal[]): Signal { return anArray.reduce(add); }
function third(anArray: any[]): any { return anArray[2]; }
function timesRepeat(count: number, proc: (aValue: void) => void): void { for(var i = 0; i < count; i++) { proc(); } }
function to(from: number, to: number): number[] { return arrayFromTo(from, to); }
function transpose(anArray: any[]) { return arrayTranspose(anArray); }
function truncateTo(a: Signal, b: Signal): Signal { return trunc(a, b); }
function value(proc: (p1?: any, p2?: any) => any, maybeArg1?: any, maybeArg2?: any): any { return maybeArg2 ? proc(maybeArg1, maybeArg2) : (maybeArg1 ? proc(maybeArg1) : proc()); }

/*

append([1, 2, 3], [4, 5]) //=> [1, 2, 3, 4, 5]

*/
