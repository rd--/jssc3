// sc3-graph-print.ts

import { arrayForEach, arrayLength, arrayMap, arrayReplicate } from './sc3-array.js'
import { Graph, graphUgenIndex, graphUgenInputSpec, makeGraph, SCgf } from './sc3-graph.js'
import { isNumber } from './sc3-number.js'
import { wrapOut } from './sc3-pseudo.js'
import { rateSelector } from './sc3-rate.js'
import { Signal, Ugen, ScUgen, isUgen, ugenDisplayName } from './sc3-ugen.js'

export function graphPrintUgenSpec(graph: Graph, ugen: ScUgen): void {
	console.log(
		ugen.name,
		ugen.rate,
		arrayLength(ugen.inputArray),
		ugen.numChan,
		ugen.specialIndex,
		arrayMap(ugen.inputArray, input => graphUgenInputSpec(graph, input)),
		arrayReplicate(ugen.numChan, ugen.rate)
	);
}

export function graphPrintSyndef(graph: Graph): void {
	console.log(SCgf, 2, 1, graph.name, arrayLength(graph.constantSeq), graph.constantSeq, 0, [], 0, [], arrayLength(graph.ugenSeq));
	arrayForEach(graph.ugenSeq, item => graphPrintUgenSpec(graph, item));
	console.log(0, []);
}

export function printSyndefOf(ugen: Signal): void {
	const graph = makeGraph('sc3.js', wrapOut(0, ugen));
	graphPrintSyndef(graph);
}

export function graphInputDisplayName(graph: Graph, input: (Ugen | number)): string {
	if(isUgen(input)) {
		const inputUgen = <Ugen>input;
		const id = String(graphUgenIndex(graph, inputUgen.scUgen.id));
		const nm = ugenDisplayName(inputUgen.scUgen);
		const ix = inputUgen.scUgen.numChan > 1 ? ('[' + String(inputUgen.port) + ']') : '';
		return id + '_' + nm + ix;
	} else if(isNumber(input)) {
		return String(<number>input);
	} else {
		console.error('graphInputDisplayName', input);
		return '?';
	}
}

export function graphPrettyPrintUgen(graph: Graph, ugen: ScUgen): void {
	console.log(
		graphUgenIndex(graph, ugen.id) + '_' + ugenDisplayName(ugen),
		rateSelector(ugen.rate),
		'[' + String(arrayMap(ugen.inputArray, input => graphInputDisplayName(graph, input))) + ']'
	);
}

export function graphPrettyPrintSyndef(graph: Graph): void {
	arrayForEach(graph.ugenSeq, item => graphPrettyPrintUgen(graph, item));
}

export function prettyPrintSyndefOf(ugen: Signal): void {
	const graph = makeGraph('sc3.js', wrapOut(0, ugen));
	graphPrettyPrintSyndef(graph);
}
