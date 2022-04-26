// sc3-str.js

class Str extends Obj {
    constructor(aString) {
        super(aString);
        this.string = aString;
    }
    asString() {
        return this;
    }
    size() {
        return new Int(this.string.length);
    }
}

function str(aString) {
    return new Str(aString);
}
