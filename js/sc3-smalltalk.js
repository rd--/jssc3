'use strict';

function append(lhs, rhs) { return lhs.concat(rhs); }
function choose(anArray) { return anArray[randomInteger(0, anArray.length)]; }
function clump(anArray, n) { return arrayClump(anArray, n); }
function collect(anArray, proc) { return anArray.map(proc); }
function concatenation(anArray) { return arrayConcatenation(anArray); }
function coord(anEnvelope) { return envCoord(anEnvelope); }
function dup(proc, count) { return arrayFill(nullFix('dup: count?', count, 2), proc); }
function first(anArray) { return anArray[0]; }
function mean(anArray) { return fdiv(sum(anArray), anArray.length); }
function negated(aNumber) { return neg(aNumber); }
function nth(anArray, index) { return anArray[index - 1]; }
function product(anArray) { return anArray.reduce(mul); }
var rand = randomFloat;
function rand2(n) { return randomFloat(0 - n, n); }
function reciprocal(a) { return recip(a); }
function reverse(anArray) { return anArray.reverse(); }
function roundTo(a, b) { return round(a, b); }
function rounded(a) { return round(a, 1); }
function second(anArray) { return anArray[1]; }
function size(anArray) { return anArray.length; }
function sum(anArray) { return anArray.reduce(add); }
function third(anArray) { return anArray[2]; }
function timesRepeat(count, proc) { for(var i = 0; i < count; i++) { proc(); } }
function to(from, to) { return arrayFromTo(from, to); }
function transpose(anArray) { return arrayTranspose(anArray); }
function truncateTo(a, b) { return trunc(a, b); }
function value(proc, maybeArg1, maybeArg2) { return maybeArg2 ? proc(maybeArg1, maybeArg2) : (maybeArg1 ? proc(maybeArg1) : proc()); }

/*

append([1, 2, 3], [4, 5]) //=> [1, 2, 3, 4, 5]

*/
