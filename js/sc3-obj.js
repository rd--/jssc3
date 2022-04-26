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
    add(aValue) {
        return this.performWith('add', aValue);
    }
    cos() {
        return this.perform('cos');
    }
    div(aValue) {
        return this.performWith('div', aValue);
    }
    mul(aValue) {
        return this.performWith('mul', aValue);
    }
    negated() {
        return this.perform('negated');
    }
   pow(aValue) {
        return this.performWith('pow', aValue);
    }
    rand(aValue) {
        if(aValue) {
            return this.performWith('rand', aValue);
        } else {
            return this.perform('rand');
        }
    }
    rand2() {
        return this.negated().performWith('rand', this);
    }
    sign(aValue) {
        return this.performWith('sign', aValue);
    }
    sin(aValue) {
        return this.perform('sin');
    }
    sqrt(aValue) {
        return this.perform('sqrt');
    }
    sub(aValue) {
        return this.performWith('sub', aValue);
    }
    tan(aValue) {
        return this.perform('tan');
    }
    value() {
        return this;
    }
}
