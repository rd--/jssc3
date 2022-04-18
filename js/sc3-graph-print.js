'use strict';

function printSyndefOf(ugen) {
    var graph = Graph('sc3.js', Out(0, ugen));
    graphPrintSyndef(graph);
}

// Pretty print

function graphInputDisplayName(graph, input) {
    if(isPort(input)) {
        var id = String(graphUgenIndex(graph, input.ugen.ugenId));
        var nm = ugenDisplayName(input.ugen);
        var ix = input.ugen.numChan > 1 ? ('[' + String(input.index) + ']') : '';
        return id + '_' + nm + ix;
    } else if(isNumber(input)) {
        return String(input);
    } else {
        console.error('graphInputDisplayName', input);
    }
}

function graphPrettyPrintUgen(graph, ugen) {
    console.log(
        graphUgenIndex(graph, ugen.ugenId) + '_' + ugenDisplayName(ugen),
        rateSelector(ugen.ugenRate),
        '[' + String(arrayMap(ugen.inputValues, input => graphInputDisplayName(graph, input))) + ']'
    );
}

function graphPrettyPrintSyndef(graph) {
    arrayForEach(graph.ugenSeq, item => graphPrettyPrintUgen(graph, item));
}

function prettyPrintSyndefOf(ugen) {
    var graph = Graph('sc3.js', Out(0, ugen));
    graphPrettyPrintSyndef(graph);
}
