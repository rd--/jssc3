export type Predicate<T> = (aValue: T) => boolean;

// [() => null, Math.abs, Math.pow, console.log].map(functionArity) //= [0, 1, 2, 0]
export function functionArity<T, U>(
	aFunction: (...argArray: T[]) => U,
): number {
	return aFunction.length;
}

export function makeAritySpecificFunction<T, U>(
	arrayFunction: (argArray: T[]) => U,
	arity: number,
) {
	switch (arity) {
		case 0:
			return function () {
				return arrayFunction([]);
			};
		case 1:
			return function (a: T) {
				return arrayFunction([a]);
			};
		case 2:
			return function (a: T, b: T) {
				return arrayFunction([a, b]);
			};
		case 3:
			return function (a: T, b: T, c: T) {
				return arrayFunction([a, b, c]);
			};
		case 4:
			return function (a: T, b: T, c: T, d: T) {
				return arrayFunction([a, b, c, d]);
			};
		case 5:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
			) {
				return arrayFunction([a, b, c, d, e]);
			};
		case 6:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
			) {
				return arrayFunction([a, b, c, d, e, f]);
			};
		case 7:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g]);
			};
		case 8:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h]);
			};
		case 9:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h, i]);
			};
		case 10:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h, i, j]);
			};
		case 11:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
				k: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h, i, j, k]);
			};
		case 12:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
				k: T,
				l: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h, i, j, k, l]);
			};
		case 13:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
				k: T,
				l: T,
				m: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h, i, j, k, l, m]);
			};
		case 14:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
				k: T,
				l: T,
				m: T,
				n: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h, i, j, k, l, m, n]);
			};
		case 15:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
				k: T,
				l: T,
				m: T,
				n: T,
				o: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h, i, j, k, l, m, n, o]);
			};
		case 16:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
				k: T,
				l: T,
				m: T,
				n: T,
				o: T,
				p: T,
			) {
				return arrayFunction([a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p]);
			};
		case 17:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
				k: T,
				l: T,
				m: T,
				n: T,
				o: T,
				p: T,
				q: T,
			) {
				return arrayFunction([
					a,
					b,
					c,
					d,
					e,
					f,
					g,
					h,
					i,
					j,
					k,
					l,
					m,
					n,
					o,
					p,
					q,
				]);
			};
		case 18:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
				j: T,
				k: T,
				l: T,
				m: T,
				n: T,
				o: T,
				p: T,
				q: T,
				r: T,
			) {
				return arrayFunction([
					a,
					b,
					c,
					d,
					e,
					f,
					g,
					h,
					i,
					j,
					k,
					l,
					m,
					n,
					o,
					p,
					q,
					r,
				]);
			};
		default:
			throw `makeAritySpecificFunction: arity not supported: ${arity}`;
	}
}

export function makeCheckedAritySpecificFunction<T, U>(
	arrayFunction: (argArray: T[]) => U,
	arity: number,
) {
	const checkArity = function (anArray: IArguments) {
		if (anArray.length !== arity) {
			const errorString =
				`makeCheckedAritySpecificFunction: ${anArray.length} != ${arity}`;
			console.error(errorString);
			throw errorString;
		}
	};
	switch (arity) {
		case 0:
			return function () {
				checkArity(arguments);
				return arrayFunction([]);
			};
		case 1:
			return function (a: T) {
				checkArity(arguments);
				return arrayFunction([a]);
			};
		case 2:
			return function (a: T, b: T) {
				checkArity(arguments);
				return arrayFunction([a, b]);
			};
		case 3:
			return function (a: T, b: T, c: T) {
				checkArity(arguments);
				return arrayFunction([a, b, c]);
			};
		case 4:
			return function (a: T, b: T, c: T, d: T) {
				checkArity(arguments);
				return arrayFunction([a, b, c, d]);
			};
		case 5:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
			) {
				checkArity(arguments);
				return arrayFunction([a, b, c, d, e]);
			};
		case 6:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
			) {
				checkArity(arguments);
				return arrayFunction([a, b, c, d, e, f]);
			};
		case 7:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
			) {
				checkArity(arguments);
				return arrayFunction([a, b, c, d, e, f, g]);
			};
		case 8:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
			) {
				checkArity(arguments);
				return arrayFunction([a, b, c, d, e, f, g, h]);
			};
		case 9:
			return function (
				a: T,
				b: T,
				c: T,
				d: T,
				e: T,
				f: T,
				g: T,
				h: T,
				i: T,
			) {
				checkArity(arguments);
				return arrayFunction([a, b, c, d, e, f, g, h, i]);
			};
		default:
			throw `makeCheckedAritySpecificFunction: arity not supported: ${arity}`;
	}
}
