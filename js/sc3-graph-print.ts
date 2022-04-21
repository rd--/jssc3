// sc3-graph-print.ts

import { arrayForEach, arrayLength, arrayMap, arrayReplicate } from './sc3-array.js'
import { consoleLog } from './sc3-error.js'
import { Graph, graphUgenIndex, graphUgenInputSpec, makeGraph, SCgf } from './sc3-graph.js'
import { isNumber } from './sc3-number.js'
import { wrapOut } from './sc3-pseudo.js'
import { rateSelector } from './sc3-rate.js'
import { Signal, UgenOutput, UgenPrimitive, isUgenOutput, ugenDisplayName } from './sc3-ugen.js'

function graphPrintUgenSpec(graph: Graph, ugen: UgenPrimitive): void {
    consoleLog(
        ugen.ugenName,
        ugen.ugenRate,
        arrayLength(ugen.inputValues),
        ugen.numChan,
        ugen.specialIndex,
        arrayMap(ugen.inputValues, input => graphUgenInputSpec(graph, input)),
        arrayReplicate(ugen.numChan, ugen.ugenRate)
    );
}

function graphPrintSyndef(graph: Graph): void {
    console.log(SCgf, 2, 1, graph.graphName, arrayLength(graph.constantSeq), graph.constantSeq, 0, [], 0, [], arrayLength(graph.ugenSeq));
    arrayForEach(graph.ugenSeq, item => graphPrintUgenSpec(graph, item));
    console.log(0, []);
}

function printSyndefOf(ugen: Signal): void {
    var graph = makeGraph('sc3.js', wrapOut(0, ugen));
    graphPrintSyndef(graph);
}

function graphInputDisplayName(graph: Graph, input: UgenOutput): string {
    if(isUgenOutput(input)) {
        var id = String(graphUgenIndex(graph, input.ugen.ugenId));
        var nm = ugenDisplayName(input.ugen);
        var ix = input.ugen.numChan > 1 ? ('[' + String(input.index) + ']') : '';
        return id + '_' + nm + ix;
    } else if(isNumber(input)) {
        return String(input);
    } else {
        console.error('graphInputDisplayName', input);
        return '?';
    }
}

function graphPrettyPrintUgen(graph: Graph, ugen: UgenPrimitive): void {
    console.log(
        graphUgenIndex(graph, ugen.ugenId) + '_' + ugenDisplayName(ugen),
        rateSelector(ugen.ugenRate),
        '[' + String(arrayMap(ugen.inputValues, input => graphInputDisplayName(graph, input))) + ']'
    );
}

function graphPrettyPrintSyndef(graph: Graph): void {
    arrayForEach(graph.ugenSeq, item => graphPrettyPrintUgen(graph, item));
}

function prettyPrintSyndefOf(ugen: Signal): void {
    var graph = makeGraph('sc3.js', wrapOut(0, ugen));
    graphPrettyPrintSyndef(graph);
}
