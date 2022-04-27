// sc3-obj.js

class Obj {
    constructor (aValue) {
    }
    isArray() {
        return new Bool(false);
    }
    isBlock() {
        return new Bool(false);
    }
    isBoolean() {
        return new Bool(false);
    }
    isEmpty() {
        return this.size().isZero();
    }
    isFloat() {
        return new Bool(false);
    }
    isInt() {
        return new Bool(false);
    }
    isNumber() {
        return new Bool(false);
    }
    isString() {
        return new Bool(false);
    }
    isSymbol() {
        return new Bool(false);
    }
    adaptToCollectionAndSend(aValue, aSelector) {
        console.log('Obj>>adaptToCollectionAndSend', this, aValue, aSelector);
        return aValue.collect(block(item => this.performWith(aSelector, item)));
    }
    value() {
        return this;
    }
}
