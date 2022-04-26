// sc3-vector.js ; one-indexed

class Vector extends Obj {
    constructor(anArray) {
        super(anArray);
        this.array = anArray;
    }
    isArray() {
        return new Bool(true);
    }
    append(aVector) {
        return new Vector(this.array.concat(aVector.array));
    }
    at(anIndex) {
        return this.array[anIndex.number - 1];
    }
    collect(aBlock) {
        return new Vector(this.array.map(aBlock));
    }
    copy() {
        return new Vector(this.array.slice(0, this.array.length));
    }
    negated() {
        return new Vector(this.array.map(item => item.negated()));
    }
    put(anIndex, aValue) {
        this.array[anIndex.number - 1] = aValue;
    }
    reversed() {
        var answer = this.copy()
        answer.reverseInPlace();
        return answer;
    }
    reverseInPlace() {
        this.array.reverse();
    }
    sin() {
        return new Vector(this.array.map(item => item.sin()));
    }
    size() {
        return new Int(this.array.length);
    }
}

function vector(anArray) {
    return new Vector(anArray);
}
