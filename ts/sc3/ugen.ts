import { isArray, ScalarOrArray, scalarOrArraySize, asArray, arrayAtIndices, arrayContainsArray, arrayEvery, arrayExtendCyclically, arrayExtendToBeOfEqualSize, arrayFillWithIndex, arrayFind, arrayForEach, arrayMap, arrayMaxItem, arraySize, arrayTranspose } from '../kernel/array.ts'
import { throwError } from '../kernel/error.ts'
import { isNumber } from '../kernel/number.ts'
import { isObject } from '../kernel/object.ts'
import { setNew, setAdd } from '../kernel/set.ts'
import { stringCompare } from '../kernel/string.ts'

import { Counter, counterNew } from '../stdlib/counter.ts'
import { Tree } from '../stdlib/tree.ts'

import * as scMath from './math.ts'
import { binaryOperatorName, unaryOperatorName } from './operators.ts'
import { rateAr, rateIr, rateKr } from './rate.ts'

export class LocalControl {
	name: string;
	index: number;
	defaultValue: number;
	operatingRate: number;
	isTriggered: boolean;
	constructor(name: string, index: number, defaultValue: number) {
		this.name = name;
		this.index = index;
		this.defaultValue = defaultValue;
		this.operatingRate = rateKr;
		this.isTriggered = false;
	}
}

export function localControlIndexCompare(i: LocalControl, j: LocalControl): number {
	return i.index - j.index;
}

export function localControlNameCompare(i: LocalControl, j: LocalControl): number {
	return stringCompare(i.name, j.name);
}

/* There are two allowed cases:
1. all local controls have non negative indices set, the array is sorted by index
2. all local controls have indices set to -1, the array is sorted by name and indices assigned
*/
export function sortLocalControls(controls: LocalControl[]): LocalControl[] {
	if(controls.every(each => each.index == -1)) {
		controls.sort(localControlNameCompare);
		controls.forEach((each, index) => each.index = index);
		return controls;
	} else if(controls.every(each => each.index >= 0)) {
		return controls.sort(localControlIndexCompare);
	} else {
		throw Error('sortLocalControls');
	}
}

const ugenCounter: Counter = counterNew();

export type UgenInput = number | Ugen;

export type Signal = Tree<UgenInput>;

export function signalSize(aSignal: Signal): number {
	return isArray(aSignal) ? aSignal.length : 1;
}

export class ScUgen {
	name: string;
	numChannels: number;
	rate: number;
	specialIndex: number;
	id: number;
	inputArray: UgenInput[];
	multipleRootGraph: Set<UgenInput>;
	localControl: null | LocalControl;
	constructor(name: string, numChannels: number, rate: number, specialIndex: number, inputArray: UgenInput[]) {
		this.name = name;
		this.numChannels = numChannels;
		this.rate = rate;
		this.specialIndex = specialIndex;
		this.id = ugenCounter();
		this.inputArray = inputArray;
		this.multipleRootGraph = setNew();
		this.localControl = null;
	}
}

export function localControlInput(name: string, index: number, defaultValue: number): Ugen {
	const scUgen = new ScUgen('LocalControl', 1, rateKr, 0, []);
	scUgen.localControl = new LocalControl(name, index, defaultValue);
	return new Ugen(scUgen, 0);
}

export function NamedControl(name: string, defaultValue: number): Ugen {
	return localControlInput(name, -1, defaultValue);
}

export type LocalControlDictionary = Record<string, number | number[]>;

// sc.localControls({freq: [440, 441], amp: 0.1})
export function localControls(dictionary: LocalControlDictionary): Map<string, Signal> {
	let index = 0;
	const makeArrayed = function(name: string, defaultArray: number[]) {
		let qualifier = 1;
		const controlArray: Signal[] = [];
		defaultArray.forEach(function(value) {
			const qualifiedName = `${name}${qualifier}`;
			controlArray.push(localControlInput(qualifiedName, index, value));
			index += 1;
			qualifier +=1 ;
		});
		return controlArray;
	};
	const answer: [string, Signal][] = [];
	for (const [name, defaultValue] of Object.entries(dictionary)) {
		if(Array.isArray(defaultValue)) {
			answer.push([name, makeArrayed(name, defaultValue)]);
		} else {
			answer.push([name, localControlInput(name, index, defaultValue)]);
			index += 1;
		}
	}
	return new Map(answer);
}

export function isScUgen(aValue: unknown): aValue is ScUgen {
	return aValue instanceof ScUgen;
}

export function isScUgenByName(aValue: unknown): aValue is ScUgen {
	return isObject(aValue) && aValue.constructor.name == 'ScUgen';
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

export function isLocalControl(aUgen: Ugen): boolean {
	return aUgen.scUgen.localControl !== null;
}

export function isUgen(aValue: unknown): aValue is Ugen {
	return aValue instanceof Ugen;
}

export function isUgenByName(aValue: unknown): aValue is Ugen {
	return isObject(aValue) && aValue.constructor.name == 'Ugen';
}

export function isUgenInput(aValue: unknown): aValue is UgenInput {
	return isNumber(aValue) || isUgen(aValue);
}

export function isSignal(aValue: unknown): aValue is Signal {
	return isUgenInput(aValue) || (isArray(aValue) && arrayEvery(aValue, isSignal));
}

// Output signals should be either a Ugen or an array of Ugens.  Not all signals are appropriate as outputs.
export function isOutputSignal(aValue: unknown): boolean {
	return isUgen(aValue) || (isArray(aValue) && arrayEvery(aValue, isUgen));
}

export function inputBranch<T>(input: UgenInput, onUgen: (aUgen: Ugen) => T, onNumber: (aNumber: number) => T, onError: () => T): T {
	if(isUgen(input)) {
		return onUgen(input);
	} else if(isNumber(input)) {
		return onNumber(input);
	} else {
		throwError(`inputBranch: unknown input type: ${input}, ${typeof input}, ${isUgen(input)}, ${isNumber(input)}`);
		return onError();
	}
}

export function inputRate(input: UgenInput): number {
	// console.debug(`inputRate: ${input}`);
	return inputBranch(input, port => port.scUgen.rate, unusedNumber => rateIr, () => -1);
}

export type RateSpec = number | number[];

// If scalar it is the operating rate, if an array it is indices into the inputs telling how to derive the rate.
export function deriveRate(rateOrFilterUgenInputs: RateSpec, inputArray: UgenInput[]): number {
	// console.debug(`deriveRate: ${rateOrFilterUgenInputs} ${inputArray}`);
	if(isNumber(rateOrFilterUgenInputs)) {
		return rateOrFilterUgenInputs;
	} else {
		return arrayMaxItem(arrayMap(inputRate, arrayAtIndices(inputArray, <number[]>rateOrFilterUgenInputs)));
	}
}

export function requiresMce(inputs: Signal[]) {
	return arrayContainsArray(inputs);
}

export function mceInputTransform(atLeast: number, aSignal: Signal[]): Signal[] {
	return arrayTranspose(arrayExtendToBeOfEqualSize(atLeast, aSignal));
}

export function makeUgen(
	name: string,
	numChannels: ScalarOrArray<number>,
	rateSpec: RateSpec,
	specialIndex: number,
	signalArray: Signal[]
): Signal {
	// console.debug(`makeUgen: ${name} ${numChannels} ${rateSpec} ${specialIndex} ${signalArray}`);
	if(isArray(numChannels) || requiresMce(signalArray)) {
		const atLeast = scalarOrArraySize(numChannels);
		const expandedSignalArray = mceInputTransform(atLeast, signalArray);
		const expandedSize = expandedSignalArray.length;
		const expandedNumChannels = arrayExtendCyclically(asArray(numChannels), expandedSize);
		// console.debug('Mce', expandedSize, expandedNumChannels);
		return expandedSignalArray.map((item, index) =>
			makeUgen(
				name,
				expandedNumChannels[index],
				rateSpec,
				specialIndex,
			    <Signal[]>item
			)
		);
	} else {
		const inputArray = <UgenInput[]>signalArray;
		const derivedRate = deriveRate(rateSpec, inputArray);
		const scUgen = new ScUgen(
			name,
			numChannels,
			derivedRate,
			specialIndex,
			inputArray
		);
		// console.debug('No-Mce', derivedRate);
		switch (numChannels) {
		    case 0: return new Ugen(scUgen, nilPort);
		    case 1: return new Ugen(scUgen, 0);
		    default: return arrayFillWithIndex(numChannels, item => new Ugen(scUgen, item));
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

// MultipleRootGraph

// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
export function inputFirstUgen(input: Signal): ScUgen | null {
	if(isArray(input)) {
		// console.debug(`inputFirstUgen: array: ${input}`);
		return arrayFind(arrayMap(inputFirstUgen, input), isScUgen) || null;
	} else if(isUgen(input)) {
		// console.debug(`inputFirstUgen: port: ${input}`);
		return (input).scUgen;
	} else {
		// console.debug(`inputFirstUgen: number: ${input}`);
		return null;
	}
}

export function multipleRootGraph(lhs: Signal,rhs: Signal): Signal {
	const ugen = inputFirstUgen(lhs);
	// console.debug(`multipleRootGraph: ${lhs}, ${rhs}, ${ugen}`);
	if(ugen && ugen.multipleRootGraph) {
		if(isArray(rhs)) {
		    const multipleRootGraphSet = <Set<UgenInput>>(ugen.multipleRootGraph);
		    arrayForEach(rhs, item => setAdd(multipleRootGraphSet, item));
		} else {
		    setAdd(ugen.multipleRootGraph, rhs);
		}
	} else {
		throwError(`multipleRootGraph: no ugen or ugen.multipleRootGraph is null: ${lhs}, ${rhs}`);
	}
	return lhs;
}

// Kr

export function krMutateInPlace(input: Tree<UgenInput | ScUgen>): void {
	if(isUgen(input)) {
		const inputPort = input;
		// console.debug(`kr: port: ${inputPort}`);
		krMutateInPlace(inputPort.scUgen);
	} else if(isScUgen(input)) {
		const inputUgen = input;
		// console.debug(`kr: ugen: ${inputUgen}`);
		if(inputUgen.rate === rateAr) {
		    inputUgen.rate =  rateKr;
		}
		arrayForEach(inputUgen.inputArray, item => krMutateInPlace(item));
	} else if(isArray(input)) {
		// console.debug(`kr: array: ${input}`);
		arrayForEach(input, item => krMutateInPlace(item));
	} else {
		if(!isNumber(input)) {
		    throwError(`krMutateInPlace: ${input}`);
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
			case 15: return Math.exp(input);
			case 16: return 1 / input;
			case 17: return scMath.midiCps(input);
			case 18: return scMath.cpsMidi(input);
			case 19: return scMath.midiRatio(input);
			case 20: return scMath.ratioMidi(input);
			case 21: return scMath.dbAmp(input);
			case 22: return scMath.ampDb(input);
			case 23: return scMath.octCps(input);
			case 24: return scMath.cpsOct(input);
			case 25: return Math.log(input);
			case 26: return Math.log2(input);
			case 27: return Math.log10(input);
			case 28: return Math.sin(input);
			case 29: return Math.cos(input);
			case 30: return Math.tan(input);
			case 36: return Math.tanh(input);
			case 44: return scMath.coin(input) ? 1.0 : 0.0;
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
		return arrayMap(item => UnaryOpWithConstantOptimiser(specialIndex, item), input);
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
			case 23: return scMath.hypot(lhs, rhs);
			case 34: return scMath.difSqr(lhs, rhs);
		}
	}
	return makeUgen('BinaryOpUGen', 1, [0, 1], specialIndex, [lhs, rhs]);
}

export function BinaryOp(specialIndex: number, lhs: Signal, rhs: Signal): Signal {
	if(isArray(lhs) || isArray(rhs)) {
		const expanded = mceInputTransform(1, [asArray(lhs), asArray(rhs)]);
		// console.debug(`BinaryOp: array constant: ${expanded}`);
		return arrayMap(item => BinaryOpWithConstantOptimiser(specialIndex, item[0], item[1]), <UgenInput[][]>expanded);
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
