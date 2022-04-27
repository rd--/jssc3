// sc3-sym.js

class Sym extends Obj {
    constructor(aString) {
        super(aString);
        this.string = aString;
    }
    isSymbol() {
        return new Bool(true);
    }
    asString() {
        return new Str(this.string);
    }
    asSymbol() {
        return this;
    }
    isEqualTo(aValue) {
        return new Bool(aValue.isSymbol().boolean ? this.string === aValue.string : false);
    }
    size() {
        return new Int(this.string.length);
    }
}

function sym(aString) {
    return new Sym(aString);
}
