'use strict';

function append(lhs, rhs) { return lhs.concat(rhs); }
function choose(array) { return array[randomInteger(0, array.length)]; }
function clump(array, n) { return arrayClump(array, n); }
function collect(array, proc) { return array.map(proc); }
function concatenation(array) { return arrayConcatenation(array); }
function dup(proc, count) { return arrayFill(nullFix('dup: count?', count, 2), proc); }
function first(array) { return array[0]; }
function mean(array) { return fdiv(sum(array), array.length); }
function negated(a) { return neg(a); }
function nth(array, index) { return array[index - 1]; }
function product(a) { return a.reduce(mul); }
function rand2(n) { return randomFloat(0 - n, n); }
function reciprocal(a) { return recip(a); }
function reverse(array) { return array.reverse(); }
function roundTo(a, b) { return round(a, b); }
function rounded(a) { return round(a, 1); }
function second(array) { return array[1]; }
function size(array) { return array.length; }
function sum(a) { return a.reduce(add); }
function third(array) { return array[2]; }
function timesRepeat(count, proc) { for(var i = 0; i < count; i++) { proc(); } }
function to(from, to) { return arrayFromTo(from, to); }
function transpose(array) { return arrayTranspose(array); }
function truncateTo(a, b) { return trunc(a, b); }
function value(proc, maybeArg1, maybeArg2) { return maybeArg2 ? proc(maybeArg1, maybeArg2) : (maybeArg1 ? proc(maybeArg1) : proc()); }

/*

append([1, 2, 3], [4, 5]) //=> [1, 2, 3, 4, 5]

*/
