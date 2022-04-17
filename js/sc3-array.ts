'use strict';

// [1, [1, 2]].map(arrayAsArray) //= [[1], [1, 2]]
function arrayAsArray(maybeArray : any) : any[] {
    return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

// arrayAt([1, 2, 3, 4], 3) === 4
function arrayAt(array : any[], index : number) : any {
    return array[index];
}

// arrayAtIndices([1, 2, 3], [0, 2]) //= [1, 3]
function arrayAtIndices(array : any[], indices : number[]) : any[] {
    return indices.map(index => array[index]);
}

// arrayAtWrap([1, 2, 3], 5) === 3
function arrayAtWrap(array : any[], index : number) : any {
    console.debug('atWrap', array, index);
    return array[index % array.length];
}

// arrayClump(arrayIota(20), 5)
function arrayClump(array : any[], n : number) : any[] {
    var k = Math.ceil(array.length / n);
    return arrayIota(k).map(i => array.slice(i * n, i * n + n));
}

// arrayConcatenation([[1, 2, 3], [4, 5]]) //= [1, 2, 3, 4, 5]
function arrayConcatenation(array : any[][] ) : any[] {
    return array.flat(1);
}

// arrayContainsarray([1, 2, [3, 4]]) === true
function arrayContainsArray(array : any[]) : boolean {
    return array.some(item => Array.isArray(item));
}

// arrayDropWhile([1, 2, 3, 4], x => x < 3) //= [3, 4]
function arrayDropWhile(array : any[], predicate : (x : any) => boolean) {
    var [x, ...xs] = array;
    if (array.length > 0 && predicate(x)) {
        return arrayDropWhile(xs, predicate);
    } else {
        return array;
    }
}

// arrayExtendCyclically([1, 2, 3], 8) //= [1, 2, 3, 1, 2, 3, 1, 2]
function arrayExtendCyclically(array : any[], size : number) : any[] {
    var k = array.length;
    var result = array.slice(0, k);
    for(var x = 0; x < size - k; x += 1) {
        result.push(arrayAtWrap(array, x));
    }
    return result;
}

// arrayExtendToBeOfEqualSize([[1, 2], [3, 4, 5]]) //= [[1, 2, 1], [3, 4, 5]]
// arrayExtendToBeOfEqualSize([[440, 550], 0]) //= [[440, 550], [0, 0]]
function arrayExtendToBeOfEqualSize(array : any[][]) : any[][] {
    var m = arrayMaxItem(array.map(item => Array.isArray(item) ? item.length : 1));
    return array.map(item => arrayExtendCyclically(Array.isArray(item) ? item : [item], m));
}

// arrayFill(5, () => Math.random())
function arrayFill(k : number, f : (x : void) => any) : any[] {
    if(f.length != 0) {
        console.error('arrayFill: arity error');
    }
    return arrayIota(k).map(unusedItem => f());
}

// arrayFillWithIndex(5, i => i * i) //= [0, 1, 4, 9, 16]
function arrayFillWithIndex(k : number, f : (x : any) => any) : any[] {
    if(f.length != 1) {
        console.error('arrayFillWithIndex: arity error');
    }
    return arrayIota(k).map(f);
}

function arrayFirst(array : any[]) : any {
    return array[0];
}

// arrayFromTo(1, 5) //= [1, 2, 3, 4, 5]
function arrayFromTo(from : number, to : number) : number[] {
    return arrayFromToBy(from, to, 1);
}

// arrayFromToBy(1, 9, 2) //= [1, 3, 5, 7, 9]
function arrayFromToBy(from : number, to : number, by : number) : number[] {
    var r = [];
    for(var i = from; i <= to; i += by) {
        r.push(i);
    }
    return r;
}

// arrayIota(5) //= [0, 1, 2, 3, 4]
function arrayIota(k : number) : number[] {
    return arrayFromTo(0, k - 1);
}

// arrayMaxItem([1, 2, 3, 4, 3, 2, 1]) === 4
function arrayMaxItem(array : number[]) : number {
    return array.reduce((i, j) => Math.max(i, j));
}

// Delete duplicate entries, retain ordering
// arrayNub([1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]) //= [1, 2, 3, 4]
function arrayNub(array : any[]) : any[] {
    return array.filter((item, index) => array.indexOf(item) === index);
}

// arrayReplicate(5, 1) //= [1, 1, 1, 1, 1]
function arrayReplicate(k : number, v : any) : any[] {
    return arrayIota(k).map(unusedItem => v);
}

// arrayShallowEq([1, 2, 3], [1, 2, 3]) === true
function arrayShallowEq(lhs : any[], rhs : any[]) : boolean {
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

// arrayTail([1, 2, 3, 4]) // => [2, 3, 4]
function arrayTail(array : any[]) : any[] {
    return array.slice(1, array.length);
}

// arrayTakeWhile([1, 2, 3, 4], x => x < 3) //= [1, 2]
function arrayTakeWhile(array : any[], predicate : (x : any) => boolean) : any[] {
    var [x, ...xs] = array;
    if (array.length > 0 && predicate(x)) {
        return [x, ...arrayTakeWhile(xs, predicate)];
    } else {
        return [];
    }
}

// arrayTranspose([[1, 2, 3], [4, 5, 6]]) //= [[1, 4], [2, 5], [3, 6]]
function arrayTranspose(array : any[][])  : any[][] {
    return array[0].map((col, i) => array.map(row => row[i]));
}

// arrayTreeEq([1, 2, [3, [4, 5]]], [1, 2, [3, [4, 5]]])
function arrayTreeEq(lhs : any[], rhs : any[]) : boolean {
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

function arrayUnlines(array : string[]) : string {
    return array.join('\n');
}

var array = {
    asArray: arrayAsArray,
    at: arrayAt,
    atIndices: arrayAtIndices,
    atWrap: arrayAtWrap,
    clump: arrayClump,
    concatenation: arrayConcatenation,
    containsArray: arrayContainsArray,
    dropWhile: arrayDropWhile,
    extendCyclically: arrayExtendCyclically,
    extendToBeOfEqualSize: arrayExtendToBeOfEqualSize,
    fill: arrayFill,
    fillWithIndex: arrayFillWithIndex,
    first: arrayFirst,
    fromTo: arrayFromTo,
    fromToBy: arrayFromToBy,
    iota: arrayIota,
    maxItem: arrayMaxItem,
    nub: arrayNub,
    replicate: arrayReplicate,
    shallowEq: arrayShallowEq,
    tail: arrayTail,
    takeWhile: arrayTakeWhile,
    transpose: arrayTranspose,
    treeEq: arrayTreeEq,
    unlines: arrayUnlines
};

// export { array };
