// sc3-array.ts

export function isArray(aValue: (aValue: any) => boolean) {
    return Array.isArray(aValue);
}

export function arrayAppend(lhs: any[], rhs: any[]): any[] {
    return lhs.concat(rhs);
}

// [1, [1, 2]].map(arrayAsArray) //= [[1], [1, 2]]
export function arrayAsArray(maybeArray: any): any[] {
    return Array.isArray(maybeArray) ? maybeArray: [maybeArray];
}

// arrayAt([1, 2, 3, 4], 3) === 4
export function arrayAt(anArray: any[], index: number): any {
    return anArray[index];
}

// arrayAtIndices([1, 2, 3], [0, 2]) //= [1, 3]
export function arrayAtIndices(anArray: any[], indices: number[]): any[] {
    return indices.map(index => anArray[index]);
}

// arrayAtWrap([1, 2, 3], 5) === 3
export function arrayAtWrap(anArray: any[], index: number): any {
    return anArray[index % anArray.length];
}

// arrayClump(arrayIota(20), 5)
export function arrayClump(anArray: any[], clumpSize: number): any[] {
    var clumpCount = Math.ceil(anArray.length / clumpSize);
    return arrayIota(clumpCount).map(i => anArray.slice(i * clumpSize, i * clumpSize + clumpSize));
}

// arrayConcat([1, 2, 3], [4, 5, 6]) //= [1, 2, 3, 4, 5, 6] ; c.f. arrayAppend
export function arrayConcat(lhs: any[], rhs: any[]): any[] {
    return lhs.concat(rhs);
}

// arrayConcatenation([[1, 2, 3], [4, 5]]) //= [1, 2, 3, 4, 5]
export function arrayConcatenation(anArray: any[][] ): any[] {
    return anArray.flat(1);
}

export function arrayCons(anArray: any[], aValue: any): number {
    return anArray.unshift(aValue);
}

// arrayContainsarray([1, 2, [3, 4]]) === true
export function arrayContainsArray(anArray: any[]): boolean {
    return anArray.some(item => Array.isArray(item));
}

// arrayDropWhile([1, 2, 3, 4], x => x < 3) //= [3, 4]
export function arrayDropWhile(anArray: any[], predicate: (aValue: any) => boolean): any[] {
    var [x, ...xs] = anArray;
    if (anArray.length > 0 && predicate(x)) {
        return arrayDropWhile(xs, predicate);
    } else {
        return anArray;
    }
}

export function arrayEvery(anArray: any[], aPredicate: (aValue: any) => boolean): boolean {
    return anArray.every(aPredicate);
}

// arrayExtendCyclically([1, 2, 3], 8) //= [1, 2, 3, 1, 2, 3, 1, 2]
export function arrayExtendCyclically(anArray: any[], size: number): any[] {
    var initialSize = anArray.length;
    var result = anArray.slice(0, initialSize);
    for(var x = 0; x < size - initialSize; x += 1) {
        result.push(arrayAtWrap(anArray, x));
    }
    return result;
}

// arrayExtendToBeOfEqualSize([[1, 2], [3, 4, 5]]) //= [[1, 2, 1], [3, 4, 5]]
// arrayExtendToBeOfEqualSize([[440, 550], 0]) //= [[440, 550], [0, 0]]
export function arrayExtendToBeOfEqualSize(anArray: (any | any[])[]): any[][] {
    var maxSize = arrayMaxItem(anArray.map(item => Array.isArray(item) ? item.length: 1));
    return anArray.map(item => arrayExtendCyclically(Array.isArray(item) ? item: [item], maxSize));
}

// arrayFill(5, () => Math.random())
export function arrayFill(size: number, elemProc: (noValue: void) => any): any[] {
    if(elemProc.length != 0) {
        console.error('arrayFill: arity error');
    }
    return arrayIota(size).map(unusedItem => elemProc());
}

// arrayFillWithIndex(5, i => i * i) //= [0, 1, 4, 9, 16]
export function arrayFillWithIndex(size: number, elemProc: (anIndex: number) => any): any[] {
    if(elemProc.length != 1) {
        console.error('arrayFillWithIndex: arity error');
    }
    return arrayIota(size).map(elemProc);
}

export function arrayFilter(anArray: any[], aFunction: (aValue: any) => boolean): any[] {
    return anArray.filter(aFunction);
}

export function arrayFind(anArray: any[], aFunction: (aValue: any) => boolean): any {
    return anArray.find(aFunction);
}

export function arrayFindIndex(anArray: any[], aFunction: (aValue: any) => boolean): number {
    return anArray.findIndex(aFunction);
}

export function arrayFirst(anArray: any[]): any {
    return anArray[0];
}

export function arrayForEach(anArray: any[], aFunction: (aValue: any) => void): void {
    anArray.forEach(aFunction);
}

// arrayFromTo(1, 5) //= [1, 2, 3, 4, 5]
export function arrayFromTo(from: number, to: number): number[] {
    return arrayFromToBy(from, to, 1);
}

// arrayFromToBy(1, 9, 2) //= [1, 3, 5, 7, 9]
export function arrayFromToBy(from: number, to: number, by: number): number[] {
    var r = [];
    for(var i = from; i <= to; i += by) {
        r.push(i);
    }
    return r;
}

export function arrayIndexOf(anArray: any[], aValue: any): number {
    return anArray.indexOf(aValue);
}

// arrayIota(5) //= [0, 1, 2, 3, 4]
export function arrayIota(k: number): number[] {
    return arrayFromTo(0, k - 1);
}

// x = [1, 2, 3]; arrayInsert([4, 5, 6], x); x //= [1, 2, 3, 4, 5, 6]
export function arrayInsert(sourceArray: any[], destinationArray: any[]): void {
    sourceArray.forEach(item => destinationArray.push(item));
}

export function arrayLength(anArray: any[]): number {
    return anArray.length;
}

export function arrayMap(anArray: any[], aFunction: (aValue: any) => any): any[] {
    return anArray.map(aFunction);
}

// arrayMaxItem([1, 2, 3, 4, 3, 2, 1]) === 4
export function arrayMaxItem(anArray: number[]): number {
    return anArray.reduce((i, j) => Math.max(i, j));
}

// Delete duplicate entries, retain ordering
// arrayNub([1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]) //= [1, 2, 3, 4]
export function arrayNub(anArray: any[]): any[] {
    return anArray.filter((item, index) => anArray.indexOf(item) === index);
}

export function arrayPush(anArray: any[], aValue: any): number {
    return anArray.push(aValue);
}

// arrayReplicate(5, 1) //= [1, 1, 1, 1, 1]
export function arrayReplicate(k: number, v: any): any[] {
    return arrayIota(k).map(unusedItem => v);
}

export function arrayReduce(anArray: any[], aFunction : (previousValue: any, currentValue: any) => any): any {
    return anArray.reduce(aFunction);
}

export function arraySecond(anArray: any[]): any {
    return anArray[1];
}

// arrayShallowEq([1, 2, 3], [1, 2, 3]) === true
export function arrayShallowEq(lhs: any[], rhs: any[]): boolean {
    if (lhs === rhs) {
        return true;
    }
    if (!Array.isArray(rhs) || (lhs.length !== rhs.length)) {
        return false;
    }
    for (var i = 0; i < lhs.length; i++) {
        if (lhs[i] !== rhs[i]) {
            return false;
        }
    }
    return true;
}

export function arraySort(anArray: any[], aFunction: (lhs: any, rhs: any) => number): any[] {
    return anArray.sort(aFunction);
}

export function arraySum(anArray: number[]): number {
    return anArray.reduce((lhs, rhs) => lhs + rhs);
}

// arrayTail([1, 2, 3, 4]) // => [2, 3, 4]
export function arrayTail(anArray: any[]): any[] {
    return anArray.slice(1, anArray.length);
}

// arrayTakeWhile([1, 2, 3, 4], x => x < 3) //= [1, 2]
export function arrayTakeWhile(anArray: any[], predicate: (aValue: any) => boolean): any[] {
    var [x, ...xs] = anArray;
    if (anArray.length > 0 && predicate(x)) {
        return [x, ...arrayTakeWhile(xs, predicate)];
    } else {
        return [];
    }
}

// arrayTranspose([[1, 2, 3], [4, 5, 6]]) //= [[1, 4], [2, 5], [3, 6]]
export function arrayTranspose(anArray: any[][]): any[][] {
    return anArray[0].map((col, i) => anArray.map(row => row[i]));
}

// arrayTreeEq([1, 2, [3, [4, 5]]], [1, 2, [3, [4, 5]]])
export function arrayTreeEq(lhs: any[], rhs: any[]): boolean {
    if (lhs === rhs) {
        return true;
    }
    if (!Array.isArray(rhs) || (lhs.length !== rhs.length)) {
        return false;
    }
    for (var i = 0; i < lhs.length; i++) {
        if(Array.isArray(lhs[i])) {
            if (!arrayTreeEq(lhs[i], rhs[i])) {
                return false;
            }
        } else {
            if (lhs[i] !== rhs[i]) {
                return false;
            }
        }
    }
    return true;
}

export function arrayUnlines(anArray: string[]): string {
    return anArray.join('\n');
}
