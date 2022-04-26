// sc3-str.js

class Str extends Obj {
    constructor(aString) {
        super(aString);
        this.string = aString;
    }
    isString() {
        return new Bool(true);
    }
    asString() {
        return this;
    }
    asSymbol() {
        return new Sym(this.string);
    }
    equalTo(aValue) {
        return new Bool(aValue.isString().boolean ? this.string === aValue.string : false);
    }
    size() {
        return new Int(this.string.length);
    }
}

function str(aString) {
    return new Str(aString);
}
