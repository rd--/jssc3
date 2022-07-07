// sc3-bool.js ; Bool = Boolean

class Bool extends Obj {
	constructor(aBoolean) {
		super(aBoolean);
		this.boolean = aBoolean;
	}
	isBoolean() {
		return new Bool(true);
	}
	and(aBool) {
		return new Bool(this.boolean && aBool.boolean);
	}
	asString() {
		return new Str(String(this.aBoolean));
	}
	static false() {
			return new Bool(false);
	}
	isEqualTo(aValue) {
		return new Bool(aValue.isBoolean().boolean ? this.boolean === aValue.boolean : false);
	}
	not() {
		return new Bool(!this.boolean);
	}
	or(aBool) {
		return new Bool(this.boolean || aBool.boolean);
	}
	rand() {
		return Bool(Math.random()  > 0.5);
	}
	static true() {
		return new Bool(true);
	}
}

function bool(aBoolean) {
	return new Bool(aBoolean);
}
