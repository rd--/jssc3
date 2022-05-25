// sc3-obj.js ; Obj = Object

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
    isDictionary() {
        return new Bool(true);
    }
    isFloat() {
        return new Bool(false);
    }
    isInt() {
        return new Bool(false);
    }
    isNil() {
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
