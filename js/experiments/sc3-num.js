// sc3-num.js ; Num = Number

class Num extends Obj {
    constructor(aNumber) {
        super(aNumber);
    }
    isNumber() {
        return new Bool(true);
    }
    add(aValue) {
        return this.performWith('add', aValue);
    }
    cos() {
        return this.perform('cos');
    }
    cubed() {
        return this.perform('cubed');
    }
    div(aValue) {
        return this.performWith('div', aValue);
    }
    isEqualTo(aValue) {
        return aValue.isNumber().boolean ? this.performWith('isEqualTo', aValue) : new Bool(false);
    }
    exp() {
        return this.perform('exp');
    }
    mod(aValue) {
        return this.performWith('mod', aValue);
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
    squared() {
        return this.perform('squared');
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
}
