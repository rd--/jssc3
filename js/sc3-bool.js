// sc3-bool.js

class Bool extends Obj {
    constructor(aBoolean) {
        super(aBoolean);
        this.boolean = aBoolean;
    }
    and(aBool) {
        return new Bool(this.boolean && aBool.boolean);
    }
    asString() {
        return new Str(String(this.aBoolean));
    }
    isBoolean() {
        return new Bool(true);
    }
    not() {
        return new Bool(!this.boolean);
    }
    or(aBool) {
        return new Bool(this.boolean || aBool.boolean);
    }
}

function bool(aBoolean) {
    return new Bool(aBoolean);
}
