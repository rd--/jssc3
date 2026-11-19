import {
	arrayAtIndices,
	arrayContainsArray,
	arrayEvery,
	arrayExtendCyclically,
	arrayExtendToBeOfEqualSize,
	arrayFillWithIndex,
	arrayFind,
	arrayForEach,
	arrayMap,
	arrayMaxItem,
	arrayTranspose,
	asArray,
	isArray,
	ScalarOrArray,
	scalarOrArraySize,
} from '../kernel/array.ts';
import { isBigInt, isNumber } from '../kernel/number.ts';
import { isObject } from '../kernel/object.ts';
import { setAdd, setNew } from '../kernel/set.ts';
import { stringCompare } from '../kernel/string.ts';

import { Counter, counterNew } from '../stdlib/counter.ts';
import { Tree, treeMap } from '../stdlib/tree.ts';
import { Fraction, isFraction, fractionToNumber } from '../stdlib/fraction.ts';

import * as scMath from './math.ts';
import { binaryOperatorName, unaryOperatorName } from './operators.ts';
import { rateAr, rateIr, rateKr } from './rate.ts';

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

export function localControlIndexCompare(
	i: LocalControl,
	j: LocalControl,
): number {
	return i.index - j.index;
}

export function localControlNameCompare(
	i: LocalControl,
	j: LocalControl,
): number {
	return stringCompare(i.name, j.name);
}

/** Sort local controls.
 *
 * There are two allowed cases:
 * 1. all local controls have non negative indices set, the array is sorted by index
 * 2. all local controls have indices set to -1, the array is sorted by name and indices assigned
 */
export function sortLocalControls(controls: LocalControl[]): LocalControl[] {
	if (controls.every((each) => each.index == -1)) {
		controls.sort(localControlNameCompare);
		controls.forEach((each, index) => each.index = index);
		return controls;
	} else if (controls.every((each) => each.index >= 0)) {
		return controls.sort(localControlIndexCompare);
	} else {
		throw new Error('sortLocalControls');
	}
}

const ugenCounter: Counter = counterNew();

// Type of "world" inputs
export type UgenInput = number | bigint | Fraction | Ugen;

// Narrowed type of "internal" inputs
export type ScUgenInput = number | Ugen;

// Type of "world" signals
export type Signal = Tree<UgenInput>;

// Narrowed type of "internal" signals
export type ScSignal = Tree<ScUgenInput>;

export function narrowUgenInput(x: UgenInput): ScUgenInput {
	if(isFraction(x)) {
		return fractionToNumber(x);
	};
	if(isBigInt(x)) {
		return Number(x);
	}
	return x;
}

export function narrowSignal(x: Signal): ScSignal {
	return treeMap(x, narrowUgenInput);
}

export function signalSize(x: Signal): number {
	return isArray(x) ? x.length : 1;
}

export function signalNumber(x: Signal): number {
	if (isNumber(x)) {
		return x;
	}
	if (isBigInt(x)) {
		return Number(x);
	}
	if (isFraction(x)) {
		return fractionToNumber(x);
	}
	throw new Error('signalNumber: not a number?');
}

export class ScUgen {
	name: string;
	numChannels: number;
	rate: number;
	specialIndex: number;
	id: number;
	inputArray: ScUgenInput[];
	multipleRootGraph: Set<ScUgenInput>;
	localControl: null | LocalControl;
	constructor(
		name: string,
		numChannels: number,
		rate: number,
		specialIndex: number,
		inputArray: ScUgenInput[],
	) {
		this.name = name;
		this.numChannels = numChannels;
		this.rate = rate;
		this.specialIndex = specialIndex;
		this.id = ugenCounter();
		this.inputArray = inputArray;
		this.multipleRootGraph = setNew();
		this.localControl = null;
	}
	displayName(): string {
		switch (this.name) {
			case 'UnaryOpUGen':
				return unaryOperatorName(this.specialIndex);
			case 'BinaryOpUGen':
				return binaryOperatorName(this.specialIndex);
			default:
				return this.name;
		}
	}
}

export function localControlInput(
	name: string,
	index: number,
	defaultValue: number,
): Ugen {
	const scUgen = new ScUgen('LocalControl', 1, rateKr, 0, []);
	scUgen.localControl = new LocalControl(name, index, defaultValue);
	return new Ugen(scUgen, 0);
}

export function NamedControl(name: string, defaultValue: number): Ugen {
	return localControlInput(name, -1, defaultValue);
}

export type LocalControlDictionary = Record<string, number | number[]>;

// sc.localControls({freq: [440, 441], amp: 0.1})
export function localControls(
	dictionary: LocalControlDictionary,
): Map<string, ScSignal> {
	let index = 0;
	const makeArrayed = function (name: string, defaultArray: number[]) {
		let qualifier = 1;
		const controlArray: ScSignal[] = [];
		defaultArray.forEach(function (value) {
			const qualifiedName = `${name}${qualifier}`;
			controlArray.push(localControlInput(qualifiedName, index, value));
			index += 1;
			qualifier += 1;
		});
		return controlArray;
	};
	const answer: [string, ScSignal][] = [];
	for (const [name, defaultValue] of Object.entries(dictionary)) {
		if (Array.isArray(defaultValue)) {
			answer.push([name, makeArrayed(name, defaultValue)]);
		} else {
			answer.push([name, localControlInput(name, index, defaultValue)]);
			index += 1;
		}
	}
	return new Map(answer);
}

export function isScUgen(x: unknown): x is ScUgen {
	return x instanceof ScUgen;
}

export function isScUgenByName(x: unknown): x is ScUgen {
	return isObject(x) && x.constructor.name == 'ScUgen';
}

export function scUgenCompare(i: ScUgen, j: ScUgen): number {
	return i.id - j.id;
}

// Ugens with no outputs, such as Out, set port to -1.
export const nilPort = -1;

// A Ugen is an ScUgen and a port number.
export class Ugen {
	scUgen: ScUgen;
	port: number;
	constructor(scUgen: ScUgen, port: number) {
		this.scUgen = scUgen;
		this.port = port;
	}
}

export function isLocalControl(x: Ugen): boolean {
	return x.scUgen.localControl !== null;
}

export function isUgen(x: unknown): x is Ugen {
	return x instanceof Ugen;
}

export function isUgenByName(x: unknown): x is Ugen {
	return isObject(x) && x.constructor.name == 'Ugen';
}

export function isUgenInput(x: unknown): x is UgenInput {
	return isNumber(x) || isBigInt(x) || isFraction(x) || isUgen(x);
}

export function isScUgenInput(x: unknown): x is ScUgenInput {
	return isNumber(x) || isUgen(x);
}

//export function isSignal(x: unknown): x is Signal {
//	return isUgenInput(x) ||
//		(isArray(x) && arrayEvery(x, isSignal));
//}

/* Output signals should be either a Ugen or an array of Ugens.
Not all signals are appropriate as outputs. */
export function isOutputSignal(x: unknown): boolean {
	return isUgen(x) || (isArray(x) && arrayEvery(x, isUgen));
}

export function inputBranch<T>(
	input: ScUgenInput,
	onUgen: (aUgen: Ugen) => T,
	onNumber: (aNumber: number) => T,
	onError: () => T,
): T {
	if (isUgen(input)) {
		return onUgen(input);
	} else if (isNumber(input)) {
		return onNumber(Number(input));
	} else {
		onError();
		throw new Error(
			`inputBranch: unknown input type: ${input}, ${typeof input}`,
		);
	}
}

export function inputRate(input: ScUgenInput): number {
	// console.debug(`inputRate: ${input}`);
	return inputBranch(
		input,
		(port) => port.scUgen.rate,
		(_unusedNumber) => rateIr,
		() => -1,
	);
}

export type RateSpec = number | number[];

/** Derive operating rate.
 *
 * If scalar it is the operating rate.
 * If an array it is indices into the inputs telling how to derive the rate.
 */
export function deriveRate(
	rateOrFilterUgenInputs: RateSpec,
	inputArray: ScUgenInput[],
): number {
	// console.debug(`deriveRate: ${rateOrFilterUgenInputs} ${inputArray}`);
	if (isNumber(rateOrFilterUgenInputs)) {
		return Number(rateOrFilterUgenInputs);
	} else {
		return arrayMaxItem(
			arrayMap(
				inputRate,
				arrayAtIndices(inputArray, <number[]> rateOrFilterUgenInputs),
			),
		);
	}
}

export function requiresMce(x: ScSignal[]) {
	return arrayContainsArray(x);
}

export function mceInputTransform(
	atLeast: number,
	signalArray: ScSignal[],
): ScSignal[] {
	return arrayTranspose(arrayExtendToBeOfEqualSize(atLeast, signalArray));
}

export function makeUgen(
	name: string,
	numChannels: ScalarOrArray<number>,
	rateSpec: RateSpec,
	specialIndex: number,
	signalArray: Signal[],
): ScSignal {
	const scSignalArray = signalArray.map(narrowSignal);
	// console.debug(`makeUgen: ${name} ${numChannels} ${rateSpec} ${specialIndex} ${signalArray}`);
	if (isArray(numChannels) || requiresMce(scSignalArray)) {
		const atLeast = scalarOrArraySize(numChannels);
		const expandedScSignalArray = mceInputTransform(atLeast, scSignalArray);
		const expandedSize = expandedScSignalArray.length;
		const expandedNumChannels = arrayExtendCyclically(
			asArray(numChannels),
			expandedSize,
		);
		// console.debug('Mce', expandedSize, expandedNumChannels);
		return expandedScSignalArray.map((item, index) =>
			makeUgen(
				name,
				expandedNumChannels[index],
				rateSpec,
				specialIndex,
				<Signal[]> item,
			)
		);
	} else {
		const inputArray = <ScUgenInput[]> scSignalArray;
		const derivedRate = deriveRate(rateSpec, inputArray);
		const scUgen = new ScUgen(
			name,
			numChannels,
			derivedRate,
			specialIndex,
			inputArray,
		);
		// console.debug('No-Mce', derivedRate);
		switch (numChannels) {
			case 0:
				return new Ugen(scUgen, nilPort);
			case 1:
				return new Ugen(scUgen, 0);
			default:
				return arrayFillWithIndex(
					numChannels,
					(item) => new Ugen(scUgen, item),
				);
		}
	}
}

// MultipleRootGraph

// inputFirstUgen([0, SinOsc([440, 441], 0), SinOsc(442, 0)])
export function inputFirstUgen(input: Signal): ScUgen | null {
	if (isArray(input)) {
		// console.debug(`inputFirstUgen: array: ${input}`);
		return arrayFind(arrayMap(inputFirstUgen, input), isScUgen) || null;
	} else if (isUgen(input)) {
		// console.debug(`inputFirstUgen: port: ${input}`);
		return input.scUgen;
	} else {
		// console.debug(`inputFirstUgen: number: ${input}`);
		return null;
	}
}

export function multipleRootGraph(lhs: Signal, rhs: Signal): Signal {
	const ugen = inputFirstUgen(lhs);
	// console.debug(`multipleRootGraph: ${lhs}, ${rhs}, ${ugen}`);
	if (ugen && ugen.multipleRootGraph) {
		if (isArray(rhs)) {
			const multipleRootGraphSet = <Set<UgenInput>> (ugen.multipleRootGraph);
			arrayForEach(rhs, (item) => setAdd(multipleRootGraphSet, item));
		} else {
			setAdd(ugen.multipleRootGraph, rhs);
		}
	} else {
		throw new Error(
			`multipleRootGraph: no ugen or ugen.multipleRootGraph is null: ${lhs}, ${rhs}`,
		);
	}
	return lhs;
}

// Kr

export function krMutateInPlace(input: Tree<ScUgenInput | ScUgen>): void {
	if (isUgen(input)) {
		const inputPort = input;
		// console.debug(`kr: port: ${inputPort}`);
		krMutateInPlace(inputPort.scUgen);
	} else if (isScUgen(input)) {
		const inputUgen = input;
		// console.debug(`kr: ugen: ${inputUgen}`);
		if (inputUgen.rate === rateAr) {
			inputUgen.rate = rateKr;
		}
		arrayForEach(inputUgen.inputArray, (item) => krMutateInPlace(item));
	} else if (isArray(input)) {
		// console.debug(`kr: array: ${input}`);
		arrayForEach(input, (item) => krMutateInPlace(item));
	} else {
		if (!isNumber(input)) {
			throw new Error(`krMutateInPlace: ${input} ${typeof input}`);
		}
	}
}

export function kr(x: Signal): ScSignal {
	const s = narrowSignal(x);
	krMutateInPlace(s);
	return s;
}

// Operators

export function UnaryOpWithConstantOptimiser(
	specialIndex: number,
	input: ScSignal,
): ScSignal {
	if (isNumber(input)) {
		input = Number(input);
		switch (specialIndex) {
			case 0:
				return 0 - input;
			case 5:
				return Math.abs(input);
			case 8:
				return Math.ceil(input);
			case 9:
				return Math.floor(input);
			case 12:
				return input * input;
			case 13:
				return input * input * input;
			case 14:
				return Math.sqrt(input);
			case 15:
				return Math.exp(input);
			case 16:
				return 1 / input;
			case 17:
				return scMath.midiCps(input);
			case 18:
				return scMath.cpsMidi(input);
			case 19:
				return scMath.midiRatio(input);
			case 20:
				return scMath.ratioMidi(input);
			case 21:
				return scMath.dbAmp(input);
			case 22:
				return scMath.ampDb(input);
			case 23:
				return scMath.octCps(input);
			case 24:
				return scMath.cpsOct(input);
			case 25:
				return Math.log(input);
			case 26:
				return Math.log2(input);
			case 27:
				return Math.log10(input);
			case 28:
				return Math.sin(input);
			case 29:
				return Math.cos(input);
			case 30:
				return Math.tan(input);
			case 31:
				return Math.asin(input);
			case 32:
				return Math.acos(input);
			case 33:
				return Math.atan(input);
			case 34:
				return Math.sinh(input);
			case 35:
				return Math.cosh(input);
			case 36:
				return Math.tanh(input);
			case 42:
				return scMath.distort(input);
			case 43:
				return scMath.softClip(input);
			case 44:
				return scMath.coin(input) ? 1.0 : 0.0;
		}
	}
	return makeUgen('UnaryOpUGen', 1, [0], specialIndex, [input]);
}

// [1, [], [1], [1, 2], [1, null], SinOsc(440, 0), [SinOsc(440, 0)]].map(isArrayConstant)
export function isArrayConstant(x: unknown): x is Array<number> {
	return isArray(x) && arrayEvery(x, isNumber);
}

export function UnaryOp(specialIndex: number, inputSignal: Signal): ScSignal {
	const input = narrowSignal(inputSignal);
	if (isArrayConstant(input)) {
		return arrayMap(
			(item) => UnaryOpWithConstantOptimiser(specialIndex, Number(item)),
			input,
		);
	} else {
		return UnaryOpWithConstantOptimiser(specialIndex, input);
	}
}

export function BinaryOpWithConstantOptimiser(
	specialIndex: number,
	lhs: ScUgenInput,
	rhs: ScUgenInput,
): ScSignal {
	if (isNumber(lhs) && isNumber(rhs)) {
		switch (specialIndex) {
			case 0:
				return lhs + rhs;
			case 1:
				return lhs - rhs;
			case 2:
				return lhs * rhs;
			case 4:
				return lhs / rhs;
			case 8:
				return lhs < rhs ? 1 : 0;
			case 9:
				return lhs > rhs ? 1 : 0;
			case 10:
				return lhs <= rhs ? 1 : 0;
			case 11:
				return lhs >= rhs ? 1 : 0;
			case 12:
				return Math.min(lhs, rhs);
			case 13:
				return Math.max(lhs, rhs);
			case 23:
				return scMath.hypot(lhs, rhs);
			case 25:
				return scMath.pow(lhs, rhs);
			case 34:
				return scMath.difSqr(lhs, rhs);
			case 38:
				return scMath.absDif(lhs, rhs);
			case 40:
				return scMath.amClip(lhs, rhs);
			case 42:
				return scMath.clip2(lhs, rhs);
		}
	}
	return makeUgen('BinaryOpUGen', 1, [0, 1], specialIndex, [lhs, rhs]);
}

export function BinaryOp(
	specialIndex: number,
	lhsSignal: Signal,
	rhsSignal: Signal,
): ScSignal {
	const lhs = narrowSignal(lhsSignal);
	const rhs = narrowSignal(rhsSignal);
	if (isArray(lhs) || isArray(rhs)) {
		const expanded = mceInputTransform(1, [asArray(lhs), asArray(rhs)]);
		// console.debug(`BinaryOp: array constant: ${expanded}`);
		return arrayMap(
			(item) => BinaryOpWithConstantOptimiser(specialIndex, item[0], item[1]),
			<ScUgenInput[][]> expanded,
		);
	} else {
		return BinaryOpWithConstantOptimiser(specialIndex, lhs, rhs);
	}
}

// isOutUgen(Out(0, mul(SinOsc(440, 0), 0.1)))
export function isOutUgen(x: Signal): boolean {
	if (!isUgen(x)) {
		return false;
	} else {
		return ['Out', 'OffsetOut', 'ReplaceOut', 'XOut'].includes(
			x.scUgen.name,
		);
	}
}

export function isOutUgenList(x: Signal): boolean {
	if (isArray(x)) {
		if (arrayEvery(x, isOutUgen)) {
			return true;
		}
	}
	return false;
}

// isControlRateUgen(MouseX(0, 1, 0, 0.2))
// export function isControlRateUgen(aValue: unknown): boolean {
// 	return isUgenInput(aValue) && (inputRate(aValue) == rateKr);
// }
