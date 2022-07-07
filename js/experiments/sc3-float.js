// sc3-float.js

class Float extends Num {
	constructor(aNumber) {
		super(aNumber);
		this.number = aNumber;
	}
	isFloat() {
		return new Bool(true);
	}
	adaptToIntAndSend(aValue, aSelector) {
		console.log('Float>>adaptToIntAndSend', this, aValue, aSelector);
		return aValue.asFloat().performWithFloat(aSelector, this);
	}
	adaptToFloatAndSend(aValue, aSelector) {
		console.log('Float>>adaptToFloatAndSend', this, aValue, aSelector);
		return aValue.performWithFloat(aSelector, this);
	}
	asFloat() {
		return this;
	}
	asString() {
		return new Str(String(this.number));
	}
	asInt() {
		return new Int(Math.trunc(this.number));
	}
	coin() {
		return new Bool(Math.random() > this.number);
	}
	static inf() {
		    return new Float(Infinity);
	}
	isZero() {
		return new Bool(this.number === 0);
	}
	perform(aSelector) {
		switch(aSelector) {
			case 'cos': return new Float(Math.cos(this.number));
			case 'cubed': return new Float(this.number * this.number * this.number);
			case 'exp': return new Float(Math.exp(this.number));
			case 'negated': return new Float(0 - this.number);
			case 'sign': return new Int(this.number > 0 ? 1 : (this.number < 0 ? -1 : 0));
			case 'sin': return new Float(Math.sin(this.number));
			case 'sqrt': return new Float(Math.sqrt(this.number));
			case 'rand': return new Float(Math.random() * this.number);
			case 'squared': return new Float(this.number * this.number);
			case 'tan': return new Float(Math.tan(this.number));
			default: console.error('Float>>perform', this, aSelector); return null;
		}
	}
	performWith(aSelector, aValue) {
		return aValue.isFloat().boolean ? this.performWithFloat(aSelector, aValue) : aValue.adaptToFloatAndSend(this, aSelector);
	}
	performWithFloat(aSelector, aFloat) {
		switch(aSelector) {
			case 'add': return new Float(this.number + aFloat.number);
			case 'div': return new Float(this.number / aFloat.number);
			case 'isEqualTo': return new Bool(this.number === aFloat.number);
			case 'mod': return new Float(this.number % aFloat.number);
			case 'mul': return new Float(this.number * aFloat.number);
			case 'pow': return new Float(this.number ** aFloat.number);
			case 'rand': return new Float(Math.random() * (aFloat.number - this.number) + this.number);
			case 'sub': return new Float(this.number - aFloat.number);
			default: console.error('Float>>performWithFloat', this, aSelector, aFloat); return null;
		}
	}
	static pi() {
		return new Float(Math.PI);
	}
}

function float(aNumber) {
	return new Float(aNumber);
}
