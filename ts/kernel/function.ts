export type Predicate<T> = (aValue: T) => boolean;

// [() => null, Math.abs, Math.pow, console.log].map(functionArity) //= [0, 1, 2, 0]
export function functionArity<T>(aFunction: (...argArray: T[]) => T): number {
	return aFunction.length;
}

export function makeAritySpecificFunction(arrayFunction: any, arity: number) {
	switch (arity) {
		case 0:
			return function () {
				return arrayFunction.apply(null, arguments);
			};
		case 1:
			return function (a: any) {
				return arrayFunction.apply(null, arguments);
			};
		case 2:
			return function (a: any, b: any) {
				return arrayFunction.apply(null, arguments);
			};
		case 3:
			return function (a: any, b: any, c: any) {
				return arrayFunction.apply(null, arguments);
			};
		case 4:
			return function (a: any, b: any, c: any, d: any) {
				return arrayFunction.apply(null, arguments);
			};
		case 5:
			return function (a: any, b: any, c: any, d: any, e: any) {
				return arrayFunction.apply(null, arguments);
			};
		case 6:
			return function (a: any, b: any, c: any, d: any, e: any, f: any) {
				return arrayFunction.apply(null, arguments);
			};
		case 7:
			return function (a: any, b: any, c: any, d: any, e: any, f: any, g: any) {
				return arrayFunction.apply(null, arguments);
			};
		case 8:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 9:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 10:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 11:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
				k: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 12:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
				k: any,
				l: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 13:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
				k: any,
				l: any,
				m: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 14:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
				k: any,
				l: any,
				m: any,
				n: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 15:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
				k: any,
				l: any,
				m: any,
				n: any,
				o: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 16:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
				k: any,
				l: any,
				m: any,
				n: any,
				o: any,
				p: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 17:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
				k: any,
				l: any,
				m: any,
				n: any,
				o: any,
				p: any,
				q: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		case 18:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
				j: any,
				k: any,
				l: any,
				m: any,
				n: any,
				o: any,
				p: any,
				q: any,
				r: any,
			) {
				return arrayFunction.apply(null, arguments);
			};
		default:
			throw `makeAritySpecificFunction: arity not supported: ${arity}`;
	}
}

export function makeCheckedAritySpecificFunction(
	arrayFunction: any,
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
				return arrayFunction.apply(null, arguments);
			};
		case 1:
			return function (a: any) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		case 2:
			return function (a: any, b: any) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		case 3:
			return function (a: any, b: any, c: any) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		case 4:
			return function (a: any, b: any, c: any, d: any) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		case 5:
			return function (a: any, b: any, c: any, d: any, e: any) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		case 6:
			return function (a: any, b: any, c: any, d: any, e: any, f: any) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		case 7:
			return function (a: any, b: any, c: any, d: any, e: any, f: any, g: any) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		case 8:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
			) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		case 9:
			return function (
				a: any,
				b: any,
				c: any,
				d: any,
				e: any,
				f: any,
				g: any,
				h: any,
				i: any,
			) {
				checkArity(arguments);
				return arrayFunction.apply(null, arguments);
			};
		default:
			throw `makeCheckedAritySpecificFunction: arity not supported: ${arity}`;
	}
}
