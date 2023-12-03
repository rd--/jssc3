export function isArray<T>(aValue: unknown): aValue is Array<T> {
	return Array.isArray(aValue);
}

export type ScalarOrArray<T> = T | T[];

export function scalarOrArray<T, U>(
	maybeArray: ScalarOrArray<T>,
	scalarFunc: (aScalar: T) => U,
	arrayFunc: (anArray: T[]) => U,
): U {
	return isArray(maybeArray) ? arrayFunc(maybeArray) : scalarFunc(maybeArray);
}

export function scalarOrArraySize<T>(maybeArray: ScalarOrArray<T>): number {
	return isArray(maybeArray) ? maybeArray.length : 1;
}

export function scalarOrArrayFirst<T>(maybeArray: ScalarOrArray<T>): T {
	return isArray(maybeArray) ? maybeArray[0] : maybeArray;
}

// [1, [1, 2]].map(asArray) //= [[1], [1, 2]]
export function asArray<T>(maybeArray: ScalarOrArray<T>): T[] {
	return isArray(maybeArray) ? maybeArray : [maybeArray];
}

export function arrayNew<T>(size: number): T[] {
	return new Array(size);
}

// arrayAppend([1, 2, 3], [4, 5]) //= [1, 2, 3, 4, 5]
export function arrayAppend<T>(lhs: T[], rhs: T[]): T[] {
	return lhs.concat(rhs);
}

// arrayAt([1, 2, 3, 4], 3) === 4
export function arrayAt<T>(anArray: T[], index: number): T {
	return anArray[index];
}

// arrayAtIndices([1, 2, 3], [0, 2]) //= [1, 3]
export function arrayAtIndices<T>(anArray: T[], indices: number[]): T[] {
	return indices.map((index) => anArray[index]);
}

// arrayAtWrap([1, 2, 3], 5) === 3
export function arrayAtWrap<T>(anArray: T[], index: number): T {
	return anArray[index % anArray.length];
}

export function arrayCheckIndex(
	anArray: unknown[],
	anInteger: number,
): boolean {
	return Number.isInteger(anInteger) && anInteger >= 0 &&
		anInteger < anArray.length;
}

// arrayChoose([1, 2, 3, 4, 5])
export function arrayChoose<T>(anArray: T[]): T {
	return anArray[Math.floor(Math.random() * anArray.length)];
}

// arrayClump(arrayIota(20), 5)
export function arrayClump<T>(anArray: T[], clumpSize: number): T[][] {
	const clumpCount = Math.ceil(anArray.length / clumpSize);
	return arrayIota(clumpCount).map((i) =>
		anArray.slice(i * clumpSize, i * clumpSize + clumpSize)
	);
}

export function arrayCollect<T, U>(
	anArray: T[],
	aFunction: (aValue: T) => U,
): U[] {
	return anArray.map(aFunction);
}

// arrayConcat([1, 2, 3], [4, 5, 6]) //= [1, 2, 3, 4, 5, 6] ; c.f. arrayAppend
export function arrayConcat<T>(lhs: T[], rhs: T[]): T[] {
	return lhs.concat(rhs);
}

// arrayConcatenation([[1, 2, 3], [4, 5]]) //= [1, 2, 3, 4, 5]
export function arrayConcatenation<T>(anArray: T[][]): T[] {
	return anArray.flat(1);
}

export function arrayCons<T>(anArray: T[], aValue: T): number {
	return anArray.unshift(aValue);
}

// arrayContainsarray([1, 2, [3, 4]]) === true
export function arrayContainsArray<T>(anArray: T[]): boolean {
	return anArray.some((item) => isArray(item));
}

// x = [1, 2, 3, 4, 5]; y = arrayCopy(x); x[0] = -1; [x, y]
export function arrayCopy<T>(anArray: T[]): T[] {
	return anArray.slice(0, anArray.length);
}

// arrayDropWhile([1, 2, 3, 4], x => x < 3) //= [3, 4]
export function arrayDropWhile<T>(
	anArray: T[],
	predicate: (aValue: T) => boolean,
): T[] {
	const startIndex = anArray.findIndex((item) => !predicate(item));
	if (anArray.length > 0 && startIndex > 0) {
		return anArray.slice(startIndex, anArray.length);
	} else {
		return anArray;
	}
}

export function arrayEvery<T>(
	anArray: T[],
	aPredicate: (aValue: T) => boolean,
): boolean {
	return anArray.every(aPredicate);
}

// arrayExtendCyclically([1, 2, 3], 8) //= [1, 2, 3, 1, 2, 3, 1, 2]
export function arrayExtendCyclically<T>(anArray: T[], size: number): T[] {
	const initialSize = anArray.length;
	const result = anArray.slice(0, initialSize);
	for (let x = 0; x < size - initialSize; x += 1) {
		result.push(arrayAtWrap(anArray, x));
	}
	return result;
}

// arrayExtendToBeOfEqualSize(1, [[1, 2], [3, 4, 5]]) //= [[1, 2, 1], [3, 4, 5]]
// arrayExtendToBeOfEqualSize(1, [[440, 550], 0]) //= [[440, 550], [0, 0]]
export function arrayExtendToBeOfEqualSize<T>(
	atLeast: number,
	anArray: (ScalarOrArray<T>)[],
): T[][] {
	const maxSize = Math.max(atLeast, arrayMaxSize(anArray));
	return anArray.map((item) => arrayExtendCyclically(asArray(item), maxSize));
}

// arrayFill(5, () => Math.random())
export function arrayFill<T>(
	size: number,
	elemProc: (noValue: void) => T,
): T[] {
	if (elemProc.length != 0) {
		console.error('arrayFill: arity error');
	}
	return arrayIota(size).map((_unusedItem) => elemProc());
}

/* Zero indexed.

arrayFillWithIndex(5, i => i * i) //= [0, 1, 4, 9, 16]
*/
export function arrayFillWithIndex<T>(
	size: number,
	elemProc: (anIndex: number) => T,
): T[] {
	if (elemProc.length != 1) {
		console.error('arrayFillWithIndex: arity error');
	}
	return arrayIota(size).map(elemProc);
}

export function arrayFilter<T>(
	anArray: T[],
	aFunction: (aValue: T) => boolean,
): T[] {
	return anArray.filter(aFunction);
}

export function arrayFind<T>(
	anArray: T[],
	aFunction: (aValue: T) => boolean,
): T | undefined {
	return anArray.find(aFunction);
}

export function arrayFindIndex<T>(
	anArray: T[],
	aFunction: (aValue: T) => boolean,
): number {
	return anArray.findIndex(aFunction);
}

export function arrayFirst<T>(anArray: T[]): T {
	return anArray[0];
}

export function arrayForEach<T>(
	anArray: T[],
	aFunction: (aValue: T) => void,
): void {
	anArray.forEach(aFunction);
}

// arrayFromTo(1, 5) //= [1, 2, 3, 4, 5]
export function arrayFromTo(from: number, to: number): number[] {
	return arrayFromToBy(from, to, 1);
}

// arrayFromToBy(1, 9, 2) //= [1, 3, 5, 7, 9]
export function arrayFromToBy(from: number, to: number, by: number): number[] {
	const answer = [];
	for (let i = from; i <= to; i += by) {
		answer.push(i);
	}
	return answer;
}

export function arrayIndexOf<T>(anArray: T[], aValue: T): number {
	return anArray.indexOf(aValue);
}

// arrayIota(5) //= [0, 1, 2, 3, 4]
export function arrayIota(k: number): number[] {
	return arrayFromTo(0, k - 1);
}

// x = [1, 2, 3]; arrayInsert([4, 5, 6], x); x //= [1, 2, 3, 4, 5, 6]
export function arrayInsert<T>(sourceArray: T[], destinationArray: T[]): void {
	sourceArray.forEach((item) => destinationArray.push(item));
}

export function arrayLength<T>(anArray: T[]): number {
	return anArray.length;
}

export function arrayMap<T, U>(aFunction: (aValue: T) => U, anArray: T[]): U[] {
	return anArray.map(aFunction);
}

// arrayMaxItem([1, 2, 3, 4, 3, 2, 1]) === 4
export function arrayMaxItem(anArray: number[]): number {
	return anArray.reduce((i, j) => Math.max(i, j));
}

// array.arrayMaxSize([[], [1], [2, 3], [4, 5, 6]]) === 3
export function arrayMaxSize<T>(anArray: ScalarOrArray<T>[]): number {
	return arrayMaxItem(anArray.map((item) => isArray(item) ? item.length : 1));
}

// Delete duplicate entries, retain ordering
// arrayNub([1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]) //= [1, 2, 3, 4]
export function arrayNub<T>(anArray: T[]): T[] {
	return anArray.filter((item, index) => anArray.indexOf(item) === index);
}

export function arrayProduct(anArray: number[]): number {
	return anArray.reduce((lhs, rhs) => lhs * rhs);
}

export function arrayPush<T>(anArray: T[], aValue: T): number {
	return anArray.push(aValue);
}

export function arrayPut<T>(anArray: T[], anIndex: number, aValue: T): void {
	anArray[anIndex] = aValue;
}

// arrayReplicate(5, 1) //= [1, 1, 1, 1, 1]
export function arrayReplicate<T>(count: number, value: T): T[] {
	return arrayIota(count).map((_unusedItem) => value);
}

export function arrayReduce<T>(
	anArray: T[],
	aFunction: (previousValue: T, currentValue: T) => T,
): T {
	return anArray.reduce(aFunction);
}

// x = [1, 2, 3, 4, 5]; arrayReverseInPlace(x); x
export function arrayReverseInPlace<T>(anArray: T[]): void {
	anArray.reverse();
}

// x = [1, 2, 3, 4, 5]; y = arrayReverse(x); [x, y]
export function arrayReverse<T>(anArray: T[]): T[] {
	return arrayCopy(anArray).reverse();
}

export function arraySecond<T>(anArray: T[]): T {
	return anArray[1];
}

// arrayShallowEq([1, 2, 3], [1, 2, 3]) === true
export function arrayShallowEq<T>(lhs: T[], rhs: T[]): boolean {
	if (lhs === rhs) {
		return true;
	}
	if (!isArray(rhs) || (lhs.length !== rhs.length)) {
		return false;
	}
	for (let i = 0; i < lhs.length; i++) {
		if (lhs[i] !== rhs[i]) {
			return false;
		}
	}
	return true;
}

export function arraySize<T>(anArray: T[]): number {
	return anArray.length;
}

export function arraySort<T>(
	anArray: T[],
	aFunction: (lhs: T, rhs: T) => number,
): T[] {
	return anArray.sort(aFunction);
}

export function arraySum(anArray: number[]): number {
	return anArray.reduce((lhs, rhs) => lhs + rhs, 0);
}

// arrayTail([1, 2, 3, 4]) // => [2, 3, 4]
export function arrayTail<T>(anArray: T[]): T[] {
	return anArray.slice(1, anArray.length);
}

// arrayTakeWhile([1, 2, 3, 4], x => x < 3) //= [1, 2]
export function arrayTakeWhile<T>(
	anArray: T[],
	predicate: (aValue: T) => boolean,
): T[] {
	const endIndex = anArray.findIndex((item) => !predicate(item));
	if (anArray.length > 0 && endIndex > 0) {
		return anArray.slice(0, endIndex);
	} else {
		return [];
	}
}

// arrayTranspose([[1, 2, 3], [4, 5, 6]]) //= [[1, 4], [2, 5], [3, 6]]
export function arrayTranspose<T>(anArray: T[][]): T[][] {
	return anArray[0].map((_unusedColumn, i) => anArray.map((row) => row[i]));
}

export function arrayUnlines(anArray: string[]): string {
	return anArray.join('\n');
}

/*

import * as array from './array.ts'

*/
