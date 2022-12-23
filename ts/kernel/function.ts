// @ts-nocheck

export type Predicate<T> = (aValue: T) => boolean;

// [() => null, Math.abs, Math.pow, console.log].map(functionArity) //= [0, 1, 2, 0]
export function functionArity<T>(aFunction: (...argArray: T[]) => T): number {
	return aFunction.length;
}

export function makeAritySpecificFunction(arrayFunction, arity) {
    switch (arity) {
		case 0: return function () { return arrayFunction.apply(null, arguments); };
		case 1: return function (a) { return arrayFunction.apply(null, arguments); };
		case 2: return function (a, b) { return arrayFunction.apply(null, arguments); };
		case 3: return function (a, b, c) { return arrayFunction.apply(null, arguments); };
		case 4: return function (a, b, c, d) { return arrayFunction.apply(null, arguments); };
		case 5: return function (a, b, c, d, e) { return arrayFunction.apply(null, arguments); };
		case 6: return function (a, b, c, d, e, f) { return arrayFunction.apply(null, arguments); };
		case 7: return function (a, b, c, d, e, f, g) { return arrayFunction.apply(null, arguments); };
		case 8: return function (a, b, c, d, e, f, g, h) { return arrayFunction.apply(null, arguments); };
		case 9: return function (a, b, c, d, e, f, g, h, i) { return arrayFunction.apply(null, arguments); };
		case 10: return function (a, b, c, d, e, f, g, h, i, j) { return arrayFunction.apply(null, arguments); };
		case 11: return function (a, b, c, d, e, f, g, h, i, j, k) { return arrayFunction.apply(null, arguments); };
		case 12: return function (a, b, c, d, e, f, g, h, i, j, k, l) { return arrayFunction.apply(null, arguments); };
		case 13: return function (a, b, c, d, e, f, g, h, i, j, k, l, m) { return arrayFunction.apply(null, arguments); };
		case 14: return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) { return arrayFunction.apply(null, arguments); };
		case 15: return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) { return arrayFunction.apply(null, arguments); };
		case 16: return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) { return arrayFunction.apply(null, arguments); };
		case 17: return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) { return arrayFunction.apply(null, arguments); };
		case 18: return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) { return arrayFunction.apply(null, arguments); };
		default: throw `makeAritySpecificFunction: arity not supported: ${arity}`;
    }
}

export function makeCheckedAritySpecificFunction(arrayFunction, arity) {
	const checkArity = function(anArray) {
		if(anArray.length !== arity) {
			const errorString = `makeCheckedAritySpecificFunction: ${anArray.length} != ${arity}`;
			console.error(errorString);
			throw errorString;
		};
	};
    switch (arity) {
		case 0: return function () { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 1: return function (a) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 2: return function (a, b) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 3: return function (a, b, c) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 4: return function (a, b, c, d) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 5: return function (a, b, c, d, e) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 6: return function (a, b, c, d, e, f) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 7: return function (a, b, c, d, e, f, g) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 8: return function (a, b, c, d, e, f, g, h) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		case 9: return function (a, b, c, d, e, f, g, h, i) { checkArity(arguments); return arrayFunction.apply(null, arguments); };
		default: throw `makeCheckedAritySpecificFunction: arity not supported: ${arity}`;
    }
}
