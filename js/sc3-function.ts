// sc-function.ts

export type Predicate<T> = (aValue: T) => boolean;

// [() => null, Math.abs, Math.pow, console.log].map(functionArity) //= [0, 1, 2, 0]
export function functionArity<T>(aFunction: (...argArray: T[]) => T): number {
	return aFunction.length;
}
