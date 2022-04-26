// sc3-int.js

class Int extends Num {
    constructor(aNumber) {
        super(aNumber);
    }
    isInt() {
        return new Bool(true);
    }
    adaptToIntAndSend(aValue, aSelector) {
        return aValue.performWithInt(aSelector, this);
    }
    adaptToFloatAndSend(aValue, aSelector) {
        console.log('Int>>adaptToFloatAndSend', this, aValue, aSelector);
        return aValue.performWithFloat(aSelector, this.asFloat());
    }
    asFloat() {
        return new Float(this.number);
    }
    asInt() {
        return this;
    }
    perform(aSelector) {
        switch(aSelector) {
        case 'negated': return new Int(0 - this.number);
        case 'rand': return new Int(Math.floor(Math.random() * this.number));
        default: return this.asFloat().perform(aSelector);
        }
    }
    performWith(aSelector, aValue) {
        return aValue.isInt().boolean ? this.performWithInt(aSelector, aValue) : aValue.adaptToIntAndSend(this, aSelector);
    }
    performWithInt(aSelector, anInt) {
        console.log('Int>>performWithInt', this, aSelector, anInt);
        switch(aSelector) {
        case 'add': return new Int(this.number + anInt.number);
        case 'div': return new Float(this.number / anInt.number);
        case 'equalTo': return new Bool(this.number === anInt.number);
        case 'mul': return new Int(this.number * anInt.number);
        case 'pow': return new Int(this.number ** anInt.number);
        case 'rand': return new Int(Math.floor(Math.random() * (anInt.number - this.number) + this.number));
        case 'sub': return new Int(this.number - anInt.number);
        default: console.error('Int>>performWithInt', this, aSelector, anInt); return null;
        }
    }
    timesRepeat(aBlock) {
        for(var i = 0; i < this.number; i++) {
            aBlock.value();
        }
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
