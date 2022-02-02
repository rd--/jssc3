'use strict';

// arrayAt([1, 2, 3, 4], 3) == 4
function arrayAt(array, index) {
    return array[index];
}

// arrayAtIndices([1, 2, 3], [0, 2]) //=> [1, 3]
function arrayAtIndices(array, indices) {
    return indices.map(index => array[index]);
}

// arrayAtWrap([1, 2, 3], 5) === 3
function arrayAtWrap(array, index) {
    //console.log('atWrap', this, index);
    return array[index % array.length];
}

// arrayClump(arrayIota(20), 5)
function arrayClump(array, n) {
    var k = Math.ceil(array.length / n);
    return arrayIota(k).map(i => array.slice(i * n, i * n + n));
}

// arrayConcatenation([[1, 2, 3], [4, 5]]) //=> [1, 2, 3, 4, 5]
function arrayConcatenation(array) {
    return array.flat(1);
}

// arrayContainsarray([1, 2, [3, 4]]) === true
function arrayContainsArray(array) {
    return array.some(item => Array.isArray(item));
}

// [t] -> (t -> bool) -> [t]
// arrayDropWhile([1, 2, 3, 4], x => x < 3) //=> [3, 4]
function arrayDropWhile(array, predicate) {
    var [x, ...xs] = array;
    if (array.length > 0 && predicate(x)) {
        return arrayDropWhile(xs, predicate);
    } else {
        return array;
    }
}

// arrayExtendCyclically([1, 2, 3], 8) //=> [1, 2, 3, 1, 2, 3, 1, 2]
function arrayExtendCyclically(array, size) {
    var k = array.length;
    var result = array.slice(0, k);
    for(var x = 0; x < size - k; x += 1) {
        result.push(arrayAtWrap(array, x));
    }
    return result;
}

// arrayExtendToBeOfEqualSize([[1, 2], [3, 4, 5]]) //=> [[1, 2, 1], [3, 4, 5]]
// arrayExtendToBeOfEqualSize([[440, 550], 0]) //=> [[440, 550], [0, 0]]
function arrayExtendToBeOfEqualSize(array) {
    var m = arrayMaxItem(array.map(item => Array.isArray(item) ? item.length : 1));
    return array.map(item => arrayExtendCyclically(Array.isArray(item) ? item : [item], m));
}

// [t] -> t
function arrayHead(array) {
    return array[0];
}

// arrayMaxItem([1, 2, 3, 4, 3, 2, 1]) === 4
function arrayMaxItem(array) {
    return array.reduce((i, j) => Math.max(i, j));
}

// Delete duplicate entries, retain ordering
// arrayNub([1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1]) //=> [1, 2, 3, 4]
function arrayNub(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
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

// [t] -> [t]
// arrayTail([1, 2, 3, 4]) // => [2, 3, 4]
function arrayTail(array) {
    return array.slice(1, array.size);
}

// [t] -> (t -> bool) -> [t]
// arrayTakeWhile([1, 2, 3, 4], x => x < 3) //=> [1, 2]
function arrayTakeWhile(array, predicate) {
    var [x, ...xs] = array;
    if (array.length > 0 && predicate(x)) {
        return [x, ...arrayTakeWhile(xs, predicate)];
    } else {
        return [];
    }
}

// arrayTranspose([[1, 2, 3], [4, 5, 6]]) //=> [[1, 4], [2, 5], [3, 6]]
function arrayTranspose(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
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

// [string] -> string
function arrayUnlines(array) {
    return array.join('\n');
}

// arrayFill(5, () => Math.random())
function arrayFill(k, f) {
    if(f.length != 0) {
        console.error('arrayFill: arity error');
    }
    return arrayIota(k).map(f);
}

// arrayFillWithIndex(5, i => i * i) //=> [0, 1, 4, 9, 16]
function arrayFillWithIndex(k, f) {
    if(f.length != 1) {
        console.error('arrayFillWithIndex: arity error');
    }
    return arrayIota(k).map(f);
}

// arrayFromToBy(1, 9, 2) //=> [1, 3, 5, 7, 9]
function arrayFromToBy(from, to, by) {
    var r = [];
    for(var i = from; i <= to; i += by) {
        r.push(i);
    }
    return r;
}

// arrayFromTo(1, 5) //=> [1, 2, 3, 4, 5]
function arrayFromTo(from, to) {
    return arrayFromToBy(from, to, 1);
}

// arrayIota(5) //=> [0, 1, 2, 3, 4]
function arrayIota(k) {
    return arrayFromTo(0, k - 1);
}

// arrayReplicate(5, 1) //=> [1, 1, 1, 1, 1]
function arrayReplicate(k, v) {
    return arrayIota(k).map(unused => v);
}

// [1, [1, 2]].map(unitArrayIfScalar) //=> [[1], [1, 2]]
function unitArrayIfScalar(i) {
    return Array.isArray(i) ? i : [i];
}
