import { isArray, arrayAppend, arrayFilter, arrayFindIndex, arrayForEach, arrayIndexOf, arrayLength, arrayMap, arrayNub, arrayReplicate, arraySort } from '../kernel/array.ts'
import { encodeInt8, encodeInt16, encodeInt32, encodeFloat32, encodePascalString } from '../kernel/encode.ts'
import { isNumber } from '../kernel/number.ts'
import { setIncludes, setNew, setAdd, setAsArray } from '../kernel/set.ts'

import { Tree } from '../stdlib/tree.ts'
import { flattenByteEncoding } from '../stdlib/u8.ts'

import { rateIr, rateKr } from './rate.ts'
import { LocalControl, UgenInput, Ugen, ScUgen, Signal, scUgenCompare, isUgen, isLocalControl, localControlCompare, isScUgen } from './ugen.ts'

// traverse graph from p adding leaf nodes to the set c
// w protects from loops in mrg (when recurring in traversing mrg elements w is set to c).
export function ugenTraverseCollecting(p: Tree<Ugen>, c: Set<number | ScUgen>, w: Set<number | ScUgen>): void {
	// console.debug(`ugenTraverseCollecting: ${p}, ${c}, ${w}`);
	if(isArray(p)) {
		// console.debug(`ugenTraverseCollecting: array: ${p}`);
		arrayForEach(p, item => ugenTraverseCollecting(item, c, w));
	} else if(isUgen(p)) {
		const mrgArray = setAsArray(p.scUgen.mrg);
		// console.debug(`ugenTraverseCollecting: port: ${p}`);
		if(!setIncludes(w, p.scUgen)) {
			setAdd(c, p.scUgen);
			arrayForEach(p.scUgen.inputArray, item => isNumber(item) ? setAdd(c, item)  : ugenTraverseCollecting(item, c, w));
			arrayForEach(mrgArray, item => isNumber(item) ? setAdd(c, item) : ugenTraverseCollecting(item, c, c));
		}
	} else {
		console.error('ugenTraverseCollecting: unknown type', p, c, w);
	}
}

export function ugenTreeLeafNodes(p: Tree<Ugen>): Array<number | ScUgen> {
	// console.debug(`ugenTreeLeafNodes: ${p}`);
	const c = <Set<number | ScUgen>>setNew();
	ugenTraverseCollecting(p, c, setNew());
	return setAsArray(c);
}

export class UgenGraph {
	name: string;
	ugenArray: ScUgen[];
	constantArray: number[];
	controlArray: LocalControl[];
	constructor(name: string, ugenArray: ScUgen[], constantArray: number[], controlArray: LocalControl[]) {
		this.name = name;
		this.ugenArray = ugenArray;
		this.constantArray = constantArray;
		this.controlArray = controlArray;
	}
}

export function isScUgenControl(scUgen: ScUgen): boolean {
	return ['Control', 'LagControl', 'TrigControl'].includes(scUgen.name);
}

// This should check that signal is not a tree of numbers...
export function signalToUgenTree(signal: Signal): Tree<Ugen> {
	// console.debug(`signalToUgenTree: ${signal}`);
	return <Tree<Ugen>>signal;
}

// ugens are sorted by id, which is in applicative order.
export function makeUgenGraph(name: string, signal: Signal): UgenGraph {
	// console.debug(`makeUgenGraph: ${name}, ${signal}`);
	const tree = signalToUgenTree(signal);
	const leafNodes = ugenTreeLeafNodes(tree);
	const constantNodes = <number[]>arrayFilter(leafNodes, isNumber);
	const controlUgenNodes = <ScUgen[]>arrayFilter(leafNodes, item => isScUgen(item) && item.localControl !== null);
	const controlNodes = <LocalControl[]>arrayMap(item => item.localControl, controlUgenNodes);
	const controlArray = arraySort(controlNodes, localControlCompare);
	const ugenNodes = <ScUgen[]>arrayFilter(leafNodes, item => isScUgen(item) && item.localControl === null);
	const ugenArray = arraySort(ugenNodes, scUgenCompare);
	const numLocalBufs = arrayLength(arrayFilter(ugenArray, item => item.name === 'LocalBuf'));
	const MaxLocalBufs = function(count: number): ScUgen {
		return new ScUgen('MaxLocalBufs', 1, rateIr, 0, [count]);
	};
	const numControls = controlArray.length;
	const Control = function(count: number): ScUgen {
		// The special-index holds the accumulated offset where multiple Control Ugens (at different rates) are present.
		return new ScUgen('Control', controlArray.length, rateKr, 0, []);
	}
	if(numLocalBufs > 0) {
		ugenArray.unshift(MaxLocalBufs(numLocalBufs));
	}
	if(numControls > 0) {
		ugenArray.unshift(Control(numControls));
	}
	return new UgenGraph(
		name,
		ugenArray,
		arraySort(arrayNub(arrayAppend([numLocalBufs], constantNodes)), (i, j) => i - j),
		controlArray
	);
}

export function graphConstantIndex(graph: UgenGraph, constantValue: number): number {
	return arrayIndexOf(graph.constantArray, constantValue);
}

export function graphUgenIndex(graph: UgenGraph, id: number): number {
	return arrayFindIndex(graph.ugenArray, ugen => ugen.id === id);
}

export function graphUgenInputSpec(graph: UgenGraph, input: UgenInput): number[] {
	if(isUgen(input)) {
		if(isLocalControl(input)) {
			// Since only kr LocalControls are allowed, if there is such a control the Ugen index is zero.
			return [0, input.scUgen.localControl!.index];
		} else {
			return [graphUgenIndex(graph, input.scUgen.id), input.port];
		}
	} else {
		return [-1, graphConstantIndex(graph, input)];
	}
}

export const SCgf = Number(1396926310);

export function graphEncodeUgenSpec(graph: UgenGraph, ugen: ScUgen): Tree<Uint8Array> {
	return [
		encodePascalString(ugen.name),
		encodeInt8(ugen.rate),
		encodeInt32(arrayLength(ugen.inputArray)),
		encodeInt32(ugen.numChan),
		encodeInt16(ugen.specialIndex),
		arrayMap(input => arrayMap(index => encodeInt32(index), graphUgenInputSpec(graph, input)), ugen.inputArray),
		arrayReplicate(ugen.numChan, encodeInt8(ugen.rate))
	];
}

// Encodes version two files.
export function graphEncodeSyndef(graph: UgenGraph): Uint8Array {
	return flattenByteEncoding([
		encodeInt32(SCgf), // magic number
		encodeInt32(2), // file version
		encodeInt16(1), // # synth definitions
		encodePascalString(graph.name), // name
		encodeInt32(arrayLength(graph.constantArray)), // # constants
		arrayMap(item => encodeFloat32(item), graph.constantArray), // constants
		encodeInt32(arrayLength(graph.controlArray)), // # controls
		arrayMap(item => encodeFloat32(item.defaultValue), graph.controlArray), // control default values
		encodeInt32(arrayLength(graph.controlArray)), // # controls
		arrayMap(item => [encodePascalString(item.name), encodeInt32(item.index)], graph.controlArray), // controls
		encodeInt32(arrayLength(graph.ugenArray)), // # ugen
		arrayMap(item => graphEncodeUgenSpec(graph, item), graph.ugenArray), // ugens
		encodeInt16(0) // # variants
	]);
}

export function encodeUgen(name: string, ugen: Signal): Uint8Array {
	// console.debug(`encodeUgen: ${name}, ${ugen}`);
	return graphEncodeSyndef(makeUgenGraph(name, ugen));
	//const graph = makeUgenGraph(name, ugen);
	//return graphEncodeSyndef(graph);
}
