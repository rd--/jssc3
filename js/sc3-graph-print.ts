// sc3-graph-print.ts ; requires: sc3-graph sc3-pseudo sc3-ugen

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
    var graph = Graph('sc3.js', wrapOut(0, ugen));
    graphPrettyPrintSyndef(graph);
}
