import { arrayForEach, arrayLength, arrayMap, arrayReplicate } from '../kernel/array.js'
import { isNumber } from '../kernel/number.js'

import { Graph, graphUgenIndex, graphUgenInputSpec, makeGraph, SCgf } from './graph.js'
import { wrapOut } from './pseudo.js'
import { rateSelector } from './rate.js'
import { Signal, Ugen, ScUgen, isUgen, ugenDisplayName } from './ugen.js'

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
		const id = String(graphUgenIndex(graph, input.scUgen.id));
		const nm = ugenDisplayName(input.scUgen);
		const ix = input.scUgen.numChan > 1 ? ('[' + String(input.port) + ']') : '';
		return id + '_' + nm + ix;
	} else if(isNumber(input)) {
		return String(input);
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
