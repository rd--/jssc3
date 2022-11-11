import { isArray, asArray, arrayAtIndices, arrayContainsArray, arrayEvery, arrayExtendToBeOfEqualSize, arrayFillWithIndex, arrayFind, arrayForEach, arrayMap, arrayMaxItem, arrayTranspose } from '../kernel/array.ts'
import { consoleDebug } from '../kernel/error.ts'
import { isNumber } from '../kernel/number.ts'
import { isObject } from '../kernel/object.ts'
import { setNew, setAdd } from '../kernel/set.ts'

import { Counter, counterNew } from '../stdlib/counter.ts'
import { Tree } from '../stdlib/tree.ts'

import { binaryOperatorName, unaryOperatorName } from './operators.ts'
import { rateAr, rateIr, rateKr } from './rate.ts'

const ugenCounter: Counter = counterNew();

export type UgenInput = number | Ugen;

export type Signal = Tree<UgenInput>;

export class ScUgen {
	name: string;
	numChan: number;
	rate: number;
	specialIndex: number;
	id: number;
	inputArray: UgenInput[];
	mrg: Set<UgenInput>;
	constructor(name: string, numChan: number, rate: number, specialIndex: number, inputArray: UgenInput[]) {
		this.name = name;
		this.numChan = numChan;
		this.rate = rate;
		this.specialIndex = specialIndex;
		this.id = ugenCounter();
		this.inputArray = inputArray;
		this.mrg = setNew();
	}
}

export function isScUgen(aValue: unknown): aValue is ScUgen {
	return aValue instanceof ScUgen;
	//return isObject(aValue) && aValue.constructor.name == 'ScUgen';
}

export function scUgenCompare(i: ScUgen, j: ScUgen): number {
	return i.id - j.id;
}

// Ugens with no outputs, such as Out, set port to -1.
export const nilPort = -1;

export class Ugen {
	scUgen: ScUgen;
	port: number;
	constructor(scUgen: ScUgen, port: number) {
		this.scUgen = scUgen;
		this.port = port;
	}
}

export function isUgen(aValue: unknown): aValue is Ugen {
	return aValue instanceof Ugen;
	//return isObject(aValue) && aValue.constructor.name == 'Ugen';
}

export function isUgenInput(aValue: unknown): aValue is UgenInput {
	return isNumber(aValue) || isUgen(aValue);
}

export function inputBranch<T>(input: UgenInput, onUgen: (aUgen: Ugen) => T, onNumber: (aNumber: number) => T, onError: () => T): T {
	if(isUgen(input)) {
		return onUgen(input);
	} else if(isNumber(input)) {
		return onNumber(input);
	} else {
		console.error('inputBranch: unknown input type', input, typeof input, isUgen(input), isNumber(input));
		return onError();
	}
}

export function inputRate(input: UgenInput): number {
	consoleDebug(`inputRate: ${input}`);
	return inputBranch(input, port => port.scUgen.rate, _unusedNumber => rateIr, () => -1);
}

export type RateSpec = number | number[];

// If scalar it is the operating rate, if an array it is indices into the inputs telling how to derive the rate.
export function deriveRate(rateOrFilterUgenInputs: RateSpec, inputArray: UgenInput[]): number {
	consoleDebug(`deriveRate: ${rateOrFilterUgenInputs} ${inputArray}`);
	if(isNumber(rateOrFilterUgenInputs)) {
		return rateOrFilterUgenInputs;
	} else {
		return arrayMaxItem(arrayMap(arrayAtIndices(inputArray, <number[]>rateOrFilterUgenInputs), inputRate));
	}
}

export function requiresMce(inputs: Signal[]) {
	return arrayContainsArray(inputs);
}

export function mceInputTransform(aSignal: Signal[]): Signal[] {
	return arrayTranspose(arrayExtendToBeOfEqualSize(aSignal));
}

export function makeUgen(name: string, numChan: number, rateSpec: RateSpec, specialIndex: number, signalArray: Signal[]): Signal {
	consoleDebug(`makeUgen: ${name} ${numChan} ${rateSpec} ${specialIndex} ${signalArray}`);
	if(requiresMce(signalArray)) {
		return arrayMap(mceInputTransform(signalArray), item => makeUgen(name, numChan, rateSpec, specialIndex, <Signal[]>item));
	} else {
		const inputArray = <UgenInput[]>signalArray;
		const scUgen = new ScUgen(name, numChan, deriveRate(rateSpec, inputArray), specialIndex, inputArray);
		switch (numChan) {
		    case 0: return new Ugen(scUgen, nilPort);
		    case 1: return new Ugen(scUgen, 0);
		    default: return arrayFillWithIndex(numChan, item => new Ugen(scUgen, item));
		}
	}
}

export function ugenDisplayName(ugen: ScUgen): string {
	switch(ugen.name) {
		case 'UnaryOpUGen': return unaryOperatorName(ugen.specialIndex);
		case 'BinaryOpUGen': return binaryOperatorName(ugen.specialIndex);
		default: return ugen.name;
	}
}

// Mrg

// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
export function inputFirstUgen(input: Signal): ScUgen | null {
	if(isArray(input)) {
		consoleDebug(`inputFirstUgen: array: ${input}`);
		return arrayFind(arrayMap(input, inputFirstUgen), isScUgen) || null;
	} else if(isUgen(input)) {
		consoleDebug(`inputFirstUgen: port: ${input}`);
		return (input).scUgen;
	} else {
		consoleDebug(`inputFirstUgen: number: ${input}`);
		return null;
	}
}

export function mrg(lhs: Signal,rhs: Signal): Signal {
	const ugen = inputFirstUgen(lhs);
	consoleDebug(`mrg: ${lhs}, ${rhs}, ${ugen}`);
	if(ugen && ugen.mrg) {
		if(isArray(rhs)) {
		    const mrgSet = <Set<UgenInput>>(ugen.mrg);
		    arrayForEach(rhs, item => setAdd(mrgSet, item));
		} else {
		    setAdd(ugen.mrg, rhs);
		}
	} else {
		console.error('mrg: no ugen or ugen.mrg is null?', lhs, rhs);
	}
	return lhs;
}

// Kr

export function krMutateInPlace(input: Tree<UgenInput | ScUgen>): void {
	if(isUgen(input)) {
		const inputPort = input;
		consoleDebug(`kr: port: ${inputPort}`);
		krMutateInPlace(inputPort.scUgen);
	} else if(isScUgen(input)) {
		const inputUgen = input;
		consoleDebug(`kr: ugen: ${inputUgen}`);
		if(inputUgen.rate === rateAr) {
		    inputUgen.rate =  rateKr;
		}
		arrayForEach(inputUgen.inputArray, item => krMutateInPlace(item));
	} else if(isArray(input)) {
		consoleDebug(`kr: array: ${input}`);
		arrayForEach(input, item => krMutateInPlace(item));
	} else {
		if(!isNumber(input)) {
		    console.error('krMutateInPlace', input);
		}
	}
}

export function kr(input: Signal): Signal {
	krMutateInPlace(input);
	return input;
}

// Operators

export function UnaryOpWithConstantOptimiser(specialIndex: number, input: Signal): Signal {
	if(isNumber(input)) {
		switch(specialIndex) {
			case 0: return 0 - input;
			case 5: return Math.abs(input);
			case 8: return Math.ceil(input);
			case 9: return Math.floor(input);
			case 12: return input * input;
			case 13: return input * input * input;
			case 14: return Math.sqrt(input);
			case 16: return 1 / input;
			case 28: return Math.sin(input);
			case 29: return Math.cos(input);
			case 30: return Math.tan(input);
		}
	}
	return makeUgen('UnaryOpUGen', 1, [0], specialIndex, [input]);
}

// [1, [], [1], [1, 2], [1, null], SinOsc(440, 0), [SinOsc(440, 0)]].map(isArrayConstant)
export function isArrayConstant(aValue: unknown): aValue is Array<number> {
	return isArray(aValue) && arrayEvery(aValue, isNumber);
}

export function UnaryOp(specialIndex: number, input: Signal): Signal {
	if(isArray(input) && arrayEvery(input, isNumber)) {
		return arrayMap(input, item => UnaryOpWithConstantOptimiser(specialIndex, item));
	} else {
		return UnaryOpWithConstantOptimiser(specialIndex, input);
	}
}

export function BinaryOpWithConstantOptimiser(specialIndex: number, lhs: UgenInput, rhs: UgenInput): Signal {
	if(isNumber(lhs) && isNumber(rhs)) {
		switch(specialIndex) {
			case 0: return lhs + rhs;
			case 1: return lhs - rhs;
			case 2: return lhs * rhs;
			case 4: return lhs / rhs;
		}
	}
	return makeUgen('BinaryOpUGen', 1, [0, 1], specialIndex, [lhs, rhs]);
}

export function BinaryOp(specialIndex: number, lhs: Signal, rhs: Signal): Signal {
	if(isArray(lhs) || isArray(rhs)) {
		const expanded = mceInputTransform([asArray(lhs), asArray(rhs)]);
		consoleDebug(`BinaryOp: array constant: ${expanded}`);
		return arrayMap(<UgenInput[][]>expanded, item => BinaryOpWithConstantOptimiser(specialIndex, item[0], item[1]));
	} else {
		return BinaryOpWithConstantOptimiser(specialIndex, lhs, rhs);
	}
}

// isOutUgen(Out(0, mul(SinOsc(440, 0), 0.1)))
export function isOutUgen(aValue: unknown): boolean {
	return isUgen(aValue) && (aValue).scUgen.name == 'Out';
}

// isControlRateUgen(MouseX(0, 1, 0, 0.2))
export function isControlRateUgen(aValue: unknown): boolean {
	return isUgenInput(aValue) && (inputRate(aValue) == rateKr);
}
