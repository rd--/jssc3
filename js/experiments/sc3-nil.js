// sc3-nil.js

class Nil extends Obj {
    constructor() {
        super();
    }
    isNil() {
        return new Bool(true);
    }
}

function nil() {
    return new Nil();
}
