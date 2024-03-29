import {
	arrayForEach,
	arrayLength,
	arrayMap,
	arrayReplicate,
} from '../kernel/array.ts';
import { isNumber } from '../kernel/number.ts';

import {
	graphUgenIndex,
	graphUgenInputSpec,
	makeUgenGraph,
	SCgf,
	UgenGraph,
} from './graph.ts';
import { wrapOut } from './pseudo.ts';
import { rateSelector } from './rate.ts';
import {
	isLocalControl,
	isUgen,
	ScUgen,
	Signal,
	Ugen,
} from './ugen.ts';

export function ugenGraphPrintUgenSpec(graph: UgenGraph, ugen: ScUgen): void {
	console.log(
		ugen.name,
		ugen.rate,
		arrayLength(ugen.inputArray),
		ugen.numChannels,
		ugen.specialIndex,
		arrayMap((input) => graphUgenInputSpec(graph, input), ugen.inputArray),
		arrayReplicate(ugen.numChannels, ugen.rate),
	);
}

export function ugenGraphPrintSyndef(graph: UgenGraph): void {
	console.log(
		SCgf,
		2,
		1,
		graph.name,
		arrayLength(graph.constantArray),
		graph.constantArray,
		0,
		[],
		0,
		[],
		arrayLength(graph.ugenArray),
	);
	arrayForEach(graph.ugenArray, (item) => ugenGraphPrintUgenSpec(graph, item));
	console.log(0, []);
}

export function printSyndefOfAt(ugen: Signal, bus: number): void {
	const graph = makeUgenGraph('sc3.js', wrapOut(bus, ugen));
	ugenGraphPrintSyndef(graph);
}

export function printSyndefOf(ugen: Signal): void {
	printSyndefOfAt(ugen, 0);
}

export function ugenGraphInputDisplayName(
	graph: UgenGraph,
	input: Ugen | number,
): string {
	if (isUgen(input)) {
		if (isLocalControl(input)) {
			const ctl = input.scUgen.localControl!;
			return `LocalControl(${ctl.name}, ${ctl.index}, ${ctl.defaultValue})`;
		} else {
			const id = String(graphUgenIndex(graph, input.scUgen.id));
			const nm = input.scUgen.displayName();
			const ix = input.scUgen.numChannels > 1
				? (`[${String(input.port)}]`)
				: '';
			return `${id}_${nm}${ix}`;
		}
	} else if (isNumber(input)) {
		return String(input);
	} else {
		console.error('ugenGraphInputDisplayName', input);
		return '?';
	}
}

export function ugenGraphPrettyPrintUgen(graph: UgenGraph, ugen: ScUgen): void {
	console.log(
		`${graphUgenIndex(graph, ugen.id)}_${ugen.displayName()}`,
		rateSelector(ugen.rate),
		`[${
			String(arrayMap((input) =>
				ugenGraphInputDisplayName(graph, input), ugen.inputArray))
		}]`,
	);
}

export function ugenGraphPrettyPrintSyndef(graph: UgenGraph): void {
	arrayForEach(
		graph.ugenArray,
		(item) => ugenGraphPrettyPrintUgen(graph, item),
	);
}

export function prettyPrintSyndefOf(ugen: Signal): void {
	const graph = makeUgenGraph('sc3.js', wrapOut(0, ugen));
	ugenGraphPrettyPrintSyndef(graph);
}
