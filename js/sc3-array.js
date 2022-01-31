'use strict';

// [1, 2, 3, 4].at(3) == 4
Array.prototype.at = function(index) {
    return this[index];
}

// [1, 2, 3].atIndices([0, 2]) //=> [1, 3]
Array.prototype.atIndices = function(indices) {
    return indices.map(index => this[index]);
}

// [1, 2, 3].atWrap(5) === 3
Array.prototype.atWrap = function(index) {
    //console.log('atWrap', this, index);
    return this[index % this.length];
}

// arrayIota(20).clump(5)
Array.prototype.clump = function(n) {
    var k = Math.ceil(this.length / n);
    return arrayIota(k).map(i => this.slice(i * n, i * n + n));
}

// [[1, 2, 3], [4, 5]].concatenation() //=> [1, 2, 3, 4, 5]
Array.prototype.concatenation = function() {
    return this.flat(1);  /* [].concat.apply([], array) */
}

// [1, 2, [3, 4]].containsArray() === true
Array.prototype.containsArray = function() {
    return this.some(item => Array.isArray(item));
}

// [t] -> (t -> bool) -> [t]
// [1, 2, 3, 4].dropWhile(x => x < 3) //=> [3, 4]
Array.prototype.dropWhile = function(predicate) {
    var [x, ...xs] = this;
    if (this.length > 0 && predicate(x)) {
        return xs.dropWhile(predicate);
    } else {
        return this;
    }
}

// [1, 2, 3].extendCyclically(8).shallowEq([1, 2, 3, 1, 2, 3, 1, 2])
Array.prototype.extendCyclically = function(size) {
    var k = this.length;
    var result = this.slice(0, k)
    for(let x = 0; x < size - k; x += 1) {
        result.push(this.atWrap(x));
    }
    return result;
}

// [[1, 2], [3, 4, 5]].extendToBeOfEqualSize().treeEq([[1, 2, 1], [3, 4, 5]])
// [[440, 550], 0].extendToBeOfEqualSize().treeEq([[440, 550], [0, 0]])
Array.prototype.extendToBeOfEqualSize = function() {
    var m = this.map(item => Array.isArray(item) ? item.length : 1).maxItem();
    return this.map(item => (Array.isArray(item) ? item : [item]).extendCyclically(m));
}

// [t] -> t
Array.prototype.head = function() {
    return this[0];
}

// [1, 2, 3, 4, 3, 2, 1].maxItem() === 4
Array.prototype.maxItem = function() {
    return this.reduce((i, j) => Math.max(i, j));
}

// Delete duplicate entries, retain ordering ; [1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1].nub().shallowEq([1, 2, 3, 4])
Array.prototype.nub = function() {
    return this.filter((item, index) => this.indexOf(item) === index);
}

// [1, 2, 3].shallowEq([1, 2, 3]) === true
Array.prototype.shallowEq = function(anArray) {
    if (this === anArray) {
        return true;
    }
    if (!Array.isArray(anArray) || (this.length !== anArray.length)) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== anArray[i]) {
            return false;
        }
    }
    return true;
}

// [t] -> [t]
// [1, 2, 3, 4].tail() // => [2, 3, 4]
Array.prototype.tail = function() {
    return this.slice(1, this.size);
}

// [t] -> (t -> bool) -> [t]
// [1, 2, 3, 4].takeWhile(x => x < 3) //=> [1, 2]
Array.prototype.takeWhile = function(predicate) {
    var [x, ...xs] = this;
    if (this.length > 0 && predicate(x)) {
        return [x, ...xs.takeWhile(predicate)];
    } else {
        return [];
    }
}

// [[1, 2, 3], [4, 5, 6]].transpose().treeEq([[1, 4], [2, 5], [3, 6]])
Array.prototype.transpose = function() {
    return this[0].map((col, i) => this.map(row => row[i]));
}

// [1, 2, [3, [4, 5]]].treeEq([1, 2, [3, [4, 5]]])
Array.prototype.treeEq = function(anArray) {
    if (this === anArray) {
        return true;
    }
    if (!Array.isArray(anArray) || (this.length !== anArray.length)) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if(Array.isArray(this[i])) {
            if (!this[i].treeEq(anArray[i])) {
                return false;
            }
        } else {
            if (this[i] !== anArray[i]) {
                return false;
            }
        }
    }
    return true;
}

// [string] -> string
Array.prototype.unlines = function () {
    return this.join('\n');
}

// arrayFill(5, () => Math.random())
function arrayFill(k, f) {
    if(f.length != 0) {
        console.error('arrayFill: arity error');
    }
    return arrayIota(k).map(f);
}

// arrayFillWithIndex(5, i => i * i).shallowEq([0, 1, 4, 9, 16])
function arrayFillWithIndex(k, f) {
    if(f.length != 1) {
        console.error('arrayFillWithIndex: arity error');
    }
    return arrayIota(k).map(f);
}

// arrayFromToBy(1, 9, 2).shallowEq([1, 3, 5, 7, 9])
function arrayFromToBy(from, to, by) {
    var r = [];
    for(let i = from; i <= to; i += by) {
        r.push(i);
    }
    return r;
}

// arrayFromTo(1, 5).shallowEq([1, 2, 3, 4, 5])
function arrayFromTo(from, to) { return arrayFromToBy(from, to, 1); }

// arrayIota(5).shallowEq([0, 1, 2, 3, 4])
function arrayIota(k) { return arrayFromTo(0, k - 1); }

// arrayReplicate(5, 1).shallowEq([1, 1, 1, 1, 1])
function arrayReplicate(k, v) {
    return arrayIota(k).map(unused => v);
}

// [1, [1, 2]].map(unitArrayIfScalar) //=> [[1], [1, 2]]
function unitArrayIfScalar(i) {
    return Array.isArray(i) ? i : [i];
}
