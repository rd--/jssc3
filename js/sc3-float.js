// sc3-float.js

class Float extends Obj {
    constructor(aNumber) {
        super(aNumber);
        this.number = aNumber;
    }
    add(aValue) {
        return aValue.isFloat() ? this.addFloat(aValue) : aValue.addFloat(this);
    }
    addFloat(aFloat) {
        return new Float(this.number + aFloat.number);
    }
    asFloat() {
        return this;
    }
    asInt() {
        return new Int(Math.round(this.number));
    }
    asString() {
        return new Str(String(this.number));
    }
    isFloat() {
        return new Bool(true);
    }
    negated() {
        return new Float(0 - this.number);
    }
    rand(aFloat) {
        if(aFloat) {
            return new Float(Math.random() * (aFloat.number - this.number) + this.number);
        } else {
            return new Float(Math.random() * this.number);
        }
    }
    rand2() {
        return this.negated().rand(this);
    }
    sin() {
        return new Float(Math.sin(this.number));
    }
}

function float(aNumber) {
    return new Float(aNumber);
}
