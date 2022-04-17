'use strict';
function isArray(aValue) {
    return Array.isArray(aValue);
}
// arrayAppend([1, 2, 3], [4, 5, 6]) //= [1, 2, 3, 4, 5, 6]
function arrayAppend(lhs, rhs) {
    return lhs.concat(rhs);
}
// [1, [1, 2]].map(arrayAsArray) //= [[1], [1, 2]]
function arrayAsArray(maybeArray) {
    return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
// arrayAt([1, 2, 3, 4], 3) === 4
function arrayAt(anArray, index) {
    return anArray[index];
}
// arrayAtIndices([1, 2, 3], [0, 2]) //= [1, 3]
function arrayAtIndices(anArray, indices) {
    return indices.map(index => anArray[index]);
}
// arrayAtWrap([1, 2, 3], 5) === 3
function arrayAtWrap(anArray, index) {
    console.debug('atWrap', anArray, index);
    return anArray[index % anArray.length];
}
// arrayClump(arrayIota(20), 5)
function arrayClump(anArray, n) {
    var k = Math.ceil(anArray.length / n);
    return arrayIota(k).map(i => anArray.slice(i * n, i * n + n));
}
// arrayConcatenation([[1, 2, 3], [4, 5]]) //= [1, 2, 3, 4, 5]
function arrayConcatenation(anArray) {
    return anArray.flat(1);
}
// arrayContainsarray([1, 2, [3, 4]]) === true
function arrayContainsArray(anArray) {
    return anArray.some(item => Array.isArray(item));
}
// arrayDropWhile([1, 2, 3, 4], x => x < 3) //= [3, 4]
function arrayDropWhile(anArray, predicate) {
    var [x, ...xs] = anArray;
    if (anArray.length > 0 && predicate(x)) {
        return arrayDropWhile(xs, predicate);
    }
    else {
        return anArray;
    }
}
// arrayExtendCyclically([1, 2, 3], 8) //= [1, 2, 3, 1, 2, 3, 1, 2]
function arrayExtendCyclically(anArray, size) {
    var k = anArray.length;
    var result = anArray.slice(0, k);
    for (var x = 0; x < size - k; x += 1) {
        result.push(arrayAtWrap(anArray, x));
    }
    return result;
}
// arrayExtendToBeOfEqualSize([[1, 2], [3, 4, 5]]) //= [[1, 2, 1], [3, 4, 5]]
// arrayExtendToBeOfEqualSize([[440, 550], 0]) //= [[440, 550], [0, 0]]
function arrayExtendToBeOfEqualSize(anArray) {
    var m = arrayMaxItem(anArray.map(item => Array.isArray(item) ? item.length : 1));
    return anArray.map(item => arrayExtendCyclically(Array.isArray(item) ? item : [item], m));
}
// arrayFill(5, () => Math.random())
function arrayFill(k, f) {
    if (f.length != 0) {
        console.error('arrayFill: arity error');
    }
    return arrayIota(k).map(unusedItem => f());
}
// arrayFillWithIndex(5, i => i * i) //= [0, 1, 4, 9, 16]
function arrayFillWithIndex(k, f) {
    if (f.length != 1) {
        console.error('arrayFillWithIndex: arity error');
    }
    return arrayIota(k).map(f);
}
function arrayFilter(anArray, aFunction) {
    return anArray.filter(aFunction);
}
function arrayFind(anArray, aFunction) {
    return anArray.find(aFunction);
}
function arrayFindIndex(anArray, aFunction) {
    return anArray.findIndex(aFunction);
}
function arrayFirst(anArray) {
    return anArray[0];
}
function arrayForEach(anArray, aFunction) {
    anArray.forEach(aFunction);
}
// arrayFromTo(1, 5) //= [1, 2, 3, 4, 5]
function arrayFromTo(from, to) {
    return arrayFromToBy(from, to, 1);
}
// arrayFromToBy(1, 9, 2) //= [1, 3, 5, 7, 9]
function arrayFromToBy(from, to, by) {
    var r = [];
    for (var i = from; i <= to; i += by) {
        r.push(i);
    }
    return r;
}
function arrayIndexOf(anArray, aValue) {
    return anArray.indexOf(aValue);
}
// arrayIota(5) //= [0, 1, 2, 3, 4]
function arrayIota(k) {
    return arrayFromTo(0, k - 1);
}
function arrayLength(anArray) {
    return anArray.length;
}
function arrayMap(anArray, aFunction) {
    return anArray.map(aFunction);
}
// arrayMaxItem([1, 2, 3, 4, 3, 2, 1]) === 4
function arrayMaxItem(anArray) {
    return anArray.reduce((i, j) => Math.max(i, j));
}
// Delete duplicate entries, retain ordering
// arrayNub([1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]) //= [1, 2, 3, 4]
function arrayNub(anArray) {
    return anArray.filter((item, index) => anArray.indexOf(item) === index);
}
function arrayPush(anArray, aValue) {
    return anArray.push(aValue);
}
// arrayReplicate(5, 1) //= [1, 1, 1, 1, 1]
function arrayReplicate(k, v) {
    return arrayIota(k).map(unusedItem => v);
}
// arrayShallowEq([1, 2, 3], [1, 2, 3]) === true
function arrayShallowEq(lhs, rhs) {
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
function arraySort(anArray, aFunction) {
    return anArray.sort(aFunction);
}
function arraySum(anArray) {
    return anArray.reduce((lhs, rhs) => lhs + rhs);
}
// arrayTail([1, 2, 3, 4]) // => [2, 3, 4]
function arrayTail(anArray) {
    return anArray.slice(1, anArray.length);
}
// arrayTakeWhile([1, 2, 3, 4], x => x < 3) //= [1, 2]
function arrayTakeWhile(anArray, predicate) {
    var [x, ...xs] = anArray;
    if (anArray.length > 0 && predicate(x)) {
        return [x, ...arrayTakeWhile(xs, predicate)];
    }
    else {
        return [];
    }
}
// arrayTranspose([[1, 2, 3], [4, 5, 6]]) //= [[1, 4], [2, 5], [3, 6]]
function arrayTranspose(anArray) {
    return anArray[0].map((col, i) => anArray.map(row => row[i]));
}
// arrayTreeEq([1, 2, [3, [4, 5]]], [1, 2, [3, [4, 5]]])
function arrayTreeEq(lhs, rhs) {
    if (lhs === rhs) {
        return true;
    }
    if (!Array.isArray(rhs) || (lhs.length !== rhs.length)) {
        return false;
    }
    for (var i = 0; i < lhs.length; i++) {
        if (Array.isArray(lhs[i])) {
            if (!arrayTreeEq(lhs[i], rhs[i])) {
                return false;
            }
        }
        else {
            if (lhs[i] !== rhs[i]) {
                return false;
            }
        }
    }
    return true;
}
function arrayUnlines(anArray) {
    return anArray.join('\n');
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
