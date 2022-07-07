// sc3-block.js

class Block extends Obj {
	constructor(aFunction) {
		super(aFunction);
		this.function = aFunction;
	}
	isBlock() {
		return new Bool(true);
	}
	dup(p1) {
		var count = p1 ? p1 : 2;
		var answer = []
		for(var i = 0; i < count; i++) {
			answer.push(this.function());
		}
		return new Vector(answer);
	}
	value(p1, p2) {
		if(p1 && p2) {
			return this.function(p1, p2);
		} else if(p1) {
			return this.function(p1);
		} else {
			return this.function();
		}
	}
}

function block(aFunction) {
	return new Block(aFunction);
}
