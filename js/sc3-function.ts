// sc-function.ts

type Predicate<T> = (aValue: T) => boolean;

// [() => null, Math.abs, Math.pow, console.log].map(functionArity) //= [0, 1, 2, 0]
function functionArity(aFunction: (...argArray: any[]) => any): number {
    return aFunction.length;
}
