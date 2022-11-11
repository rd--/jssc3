import { isArray, arrayAppend, arrayFilter, arrayFindIndex, arrayForEach, arrayIndexOf, arrayLength, arrayMap, arrayNub, arrayReplicate, arraySort } from '../kernel/array.ts'
import { encodeInt8, encodeInt16, encodeInt32, encodeFloat32, encodePascalString } from '../kernel/encode.ts'
import { consoleDebug } from '../kernel/error.ts'
import { isNumber } from '../kernel/number.ts'
import { setIncludes, setNew, setAdd, setAsArray } from '../kernel/set.ts'

import { Tree } from '../stdlib/tree.ts'
import { flattenByteEncoding } from '../stdlib/u8.ts'

import { rateIr } from './rate.ts'
import { UgenInput, Ugen, ScUgen, Signal, scUgenCompare, isUgen, isScUgen } from './ugen.ts'

// traverse graph from p adding leaf nodes to the set c
// w protects from loops in mrg (when recurring in traversing mrg elements w is set to c).
export function ugenTraverseCollecting(p: Tree<Ugen>, c: Set<number | ScUgen>, w: Set<number | ScUgen>): void {
	consoleDebug(`ugenTraverseCollecting: ${p}, ${c}, ${w}`);
	if(isArray(p)) {
		consoleDebug(`ugenTraverseCollecting: array: ${p}`);
		arrayForEach(p, item => ugenTraverseCollecting(item, c, w));
	} else if(isUgen(p)) {
		const mrgArray = setAsArray(p.scUgen.mrg);
		consoleDebug(`ugenTraverseCollecting: port: ${p}`);
		if(!setIncludes(w, p.scUgen)) {
			setAdd(c, p.scUgen);
			arrayForEach(p.scUgen.inputArray, item => isNumber(item) ? setAdd(c, item)  : ugenTraverseCollecting(item, c, w));
			arrayForEach(mrgArray, item => isNumber(item) ? setAdd(c, item) : ugenTraverseCollecting(item, c, c));
		}
	} else {
		console.error('ugenTraverseCollecting: unknown type', p, c, w);
	}
}

export function ugenGraphLeafNodes(p: Tree<Ugen>): Array<number | ScUgen> {
	consoleDebug(`ugenGraphLeafNodes: ${p}`);
	const c = <Set<number | ScUgen>>setNew();
	ugenTraverseCollecting(p, c, setNew());
	return setAsArray(c);
}

export class Graph {
	name: string;
	ugenSeq: ScUgen[];
	constantSeq: number[];
	constructor(name: string, ugenSeq: ScUgen[], constantSeq: number[]) {
		this.name = name;
		this.ugenSeq = ugenSeq;
		this.constantSeq = constantSeq;
	}
}

// This should check that signal is not a tree of numbers...
export function signalToUgenGraph(signal: Signal): Tree<Ugen> {
	consoleDebug(`signalToUgenGraph: ${signal}`);
	return <Tree<Ugen>>signal;
}

// ugens are sorted by id, which is in applicative order. a maxlocalbufs ugen is always present.
export function makeGraph(name: string, signal: Signal): Graph {
	consoleDebug(`makeGraph: ${name}, ${signal}`);
	const graph = signalToUgenGraph(signal);
	const leafNodes = ugenGraphLeafNodes(graph);
	const constantNodes = <number[]>arrayFilter(leafNodes, isNumber);
	const ugenNodes = <ScUgen[]>arrayFilter(leafNodes, isScUgen);
	const ugenSeq = arraySort(ugenNodes, scUgenCompare);
	const numLocalBufs = arrayLength(arrayFilter(ugenSeq, item => item.name === 'LocalBuf'));
	const MaxLocalBufs = function(count: number): ScUgen {
		return new ScUgen('MaxLocalBufs', 1, rateIr, 0, [count]);
	};
	return new Graph(
		name,
		arrayAppend([MaxLocalBufs(numLocalBufs)], ugenSeq),
		arraySort(arrayNub(arrayAppend([numLocalBufs], constantNodes)), (i, j) => i - j)
	);
}

export function graphConstantIndex(graph: Graph, constantValue: number): number {
	return arrayIndexOf(graph.constantSeq, constantValue);
}

export function graphUgenIndex(graph: Graph, id: number): number {
	return arrayFindIndex(graph.ugenSeq, ugen => ugen.id === id);
}

export function graphUgenInputSpec(graph: Graph, input: UgenInput): number[] {
	if(isUgen(input)) {
		return [graphUgenIndex(graph, input.scUgen.id), input.port];
	} else {
		return [-1, graphConstantIndex(graph, input)];
	}
}

export const SCgf = Number(1396926310);

export function graphEncodeUgenSpec(graph: Graph, ugen: ScUgen): Tree<Uint8Array> {
	return [
		encodePascalString(ugen.name),
		encodeInt8(ugen.rate),
		encodeInt32(arrayLength(ugen.inputArray)),
		encodeInt32(ugen.numChan),
		encodeInt16(ugen.specialIndex),
		arrayMap(ugen.inputArray, input => arrayMap(graphUgenInputSpec(graph, input), index => encodeInt32(index))),
		arrayReplicate(ugen.numChan, encodeInt8(ugen.rate))
	];
}

export function graphEncodeSyndef(graph: Graph): Uint8Array {
	return flattenByteEncoding([
		encodeInt32(SCgf), // magic number
		encodeInt32(2), // file version
		encodeInt16(1), // # synth definitions
		encodePascalString(graph.name), // pstring
		encodeInt32(arrayLength(graph.constantSeq)),
		arrayMap(graph.constantSeq, item => encodeFloat32(item)),
		encodeInt32(0), // # param
		encodeInt32(0), // # param names
		encodeInt32(arrayLength(graph.ugenSeq)),
		arrayMap(graph.ugenSeq, item => graphEncodeUgenSpec(graph, item)),
		encodeInt16(0) // # variants
	]);
}

export function encodeUgen(name: string, ugen: Signal): Uint8Array {
	consoleDebug(`encodeUgen: ${name}, ${ugen}`);
	return graphEncodeSyndef(makeGraph(name, ugen));
	//const graph = makeGraph(name, ugen);
	//return graphEncodeSyndef(graph);
}
