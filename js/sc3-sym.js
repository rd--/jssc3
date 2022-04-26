// sc3-sym.js

class Sym extends Obj {
    constructor(aString) {
        super(aString);
        this.string = aString;
    }
    asString() {
        return new Str(this.string);
    }
    size() {
        return new Int(this.string.length);
    }
}

function sym(aString) {
    return new Sym(aString);
}
