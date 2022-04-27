// sc3-vector.js ; zero indexed

class Vector extends Num {
    constructor(anArray) {
        super(anArray);
        this.array = anArray;
    }
    isArray() {
        return new Bool(true);
    }
    adaptToIntAndSend(aValue, aSelector) {
        console.log('Vector>>adaptToIntAndSend', this, aValue, aSelector);
        return this.collect(block(item => aValue.performWith(aSelector, item)));
    }
    adaptToFloatAndSend(aValue, aSelector) {
        console.log('Vector>>adaptToFloatAndSend', this, aValue, aSelector);
        return this.collect(block(item => aValue.performWith(aSelector, item)));
    }
    append(aVector) {
        return new Vector(this.array.concat(aVector.array));
    }
    at(anIndex) {
        return this.array[anIndex.number];
    }
    atWrap(anIndex) {
        return this.array[anIndex.number % this.array.length];
    }
    collect(aBlock) {
        return new Vector(this.array.map(aBlock.function));
    }
    copy() {
        return new Vector(this.array.slice(0, this.array.length));
    }
    perform(aSelector) {
        return this.collect(block((p) => p.perform(aSelector)));
    }
    performWith(aSelector, aValue) {
        console.log('Vector>>performWith', this, aSelector, aValue);
        if(aValue.isArray().boolean) {
            return this.withCollect(aValue, block((p, q) => p.performWith(aSelector, q)));
        } else {
            return aValue.adaptToCollectionAndSend(this, aSelector);
        }
    }
    put(anIndex, aValue) {
        this.array[anIndex.number] = aValue;
    }
    reversed() {
        var answer = this.copy()
        answer.reverseInPlace();
        return answer;
    }
    reverseInPlace() {
        this.array.reverse();
    }
    size() {
        return new Int(this.array.length);
    }
    withCollect(aVector, aBlock) {
        console.log('Vector>>withCollect', this, aVector, aBlock);
        return new Vector(this.array.map((item, index) => aBlock.function(item, aVector.array[index])));
    }
}

function vector(anArray) {
    return new Vector(anArray);
}
