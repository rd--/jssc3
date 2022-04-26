// sc3-int.js

class Int extends Obj {
    constructor(aNumber) {
        super(aNumber);
        this.number = aNumber;
    }
    add(aValue) {
        return aValue.isInt() ? this.addInt(aValue) : aValue.addInt(this);
    }
    addInt(anInt) {
        return new Int(this.number + anInt.number);
    }
    asFloat() {
        return new Float(this.number);
    }
    asInt() {
        return this;
    }
    asString() {
        return new Str(String(this.number));
    }
    isInt() {
        return new Bool(true);
    }
    negated() {
        return new Int(0 - this.number);
    }
    to(anInt) {
        var answer = [];
        for(var i = this.number; i <= anInt.number; i += 1) {
            answer.push(new Int(i));
        }
        return new Vector(answer);
    }
}

function int(aNumber) {
    return new Int(aNumber);
}
