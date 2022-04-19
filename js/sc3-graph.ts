// sc3-graph.ts ; requires: sc3-pseudo sc3-ugen

// traverse graph from p adding leaf nodes to the set c
// w protects from loops in mrg (when recurring in traversing mrg elements w is set to c).
function ugenTraverseCollecting(p: Tree<UgenOutput>, c: Set<number | UgenPrimitive>, w: Set<number | UgenPrimitive>): void {
    if(isArray(p)) {
        var pArray = <Forest<UgenOutput>>p;
        consoleDebug('ugenTraverseCollecting: array', pArray);
        arrayForEach(pArray, item => ugenTraverseCollecting(item, c, w));
    } else if(isUgenOutput(p)) {
        var pUgenOutput = <UgenOutput>p;
        consoleDebug('ugenTraverseCollecting: port', pUgenOutput);
        if(!setHas(w, pUgenOutput.ugen)) {
            setAdd(c, pUgenOutput.ugen);
            arrayForEach(pUgenOutput.ugen.inputValues, item => isNumber(item) ? setAdd(c, item)  : ugenTraverseCollecting(item, c, w));
            arrayForEach(pUgenOutput.ugen.mrg, item => isNumber(item) ? setAdd(c, item) : ugenTraverseCollecting(item, c, c));
        }
    } else {
        console.error('ugenTraverseCollecting', p, c, w);
    }
}

// all leaf nodes of p
function ugenGraphLeafNodes(p: Tree<UgenOutput>): Array<number | UgenPrimitive> {
    var c = setNew();
    ugenTraverseCollecting(p, c, setNew());
    return setToArray(c);
}

function ugenCompare(i: UgenPrimitive, j: UgenPrimitive): number {
    return  i.ugenId - j.ugenId;
}

type Graph = {
    graphName: string,
    ugenSeq: UgenPrimitive[],
    constantSeq: number[]
};

// This should check that signal is not a tree of numbers...
function signalToUgenGraph(signal: Signal): Tree<UgenOutput> {
    return <Tree<UgenOutput>>signal;
}

// ugens are sorted by id, which is in applicative order. a maxlocalbufs ugen is always present.
function Graph(name: string, signal: Signal): Graph {
    var graph = signalToUgenGraph(signal);
    var leafNodes = ugenGraphLeafNodes(graph);
    var ugens = arraySort(arrayFilter(leafNodes, isUgenPrimitive), ugenCompare);
    var constants = arrayFilter(leafNodes, isNumber);
    var numLocalBufs = arrayLength(arrayFilter(ugens, item => item.ugenName === 'LocalBuf'));
    var MaxLocalBufs = function(count: number): UgenPrimitive {
        return Ugen('MaxLocalBufs', 1, rateIr, 0, [count]);
    };
    return {
        graphName: name,
        ugenSeq: arrayAppend([MaxLocalBufs(numLocalBufs)], ugens),
        constantSeq: arraySort(arrayNub(arrayAppend([numLocalBufs], constants)), (i, j) => i - j)
    };
}

function graphConstantIndex(graph: Graph, constantValue: number): number {
    return arrayIndexOf(graph.constantSeq, constantValue);
}

// lookup ugen index at graph given ugenId
function graphUgenIndex(graph: Graph, ugenId: number): number {
    return arrayFindIndex(graph.ugenSeq, ugen => ugen.ugenId === ugenId);
}

function graphUgenInputSpec(graph: Graph, input: UgenInput): number[] {
    if(isUgenOutput(input)) {
        var port = <UgenOutput>input;
        return [graphUgenIndex(graph, port.ugen.ugenId), port.index];
    } else {
        return [-1, graphConstantIndex(graph, <number>input)];
    }
}

function graphPrintUgenSpec(graph: Graph, ugen: UgenPrimitive): void {
    console.log(
        ugen.ugenName,
        ugen.ugenRate,
        arrayLength(ugen.inputValues),
        ugen.numChan,
        ugen.specialIndex,
        arrayMap(ugen.inputValues, input => graphUgenInputSpec(graph, input)),
        arrayReplicate(ugen.numChan, ugen.ugenRate)
    );
}

var SCgf: number = Number(1396926310);

function graphPrintSyndef(graph: Graph): void {
    console.log(SCgf, 2, 1, graph.graphName, arrayLength(graph.constantSeq), graph.constantSeq, 0, [], 0, [], arrayLength(graph.ugenSeq));
    arrayForEach(graph.ugenSeq, item => graphPrintUgenSpec(graph, item));
    console.log(0, []);
}

function printSyndefOf(ugen: Signal): void {
    var graph = Graph('sc3.js', wrapOut(0, ugen));
    graphPrintSyndef(graph);
}

function graphEncodeUgenSpec(graph: Graph, ugen: UgenPrimitive): Tree<Uint8Array> {
    return [
        encodePascalString(ugen.ugenName),
        encodeInt8(ugen.ugenRate),
        encodeInt32(arrayLength(ugen.inputValues)),
        encodeInt32(ugen.numChan),
        encodeInt16(ugen.specialIndex),
        arrayMap(ugen.inputValues, input => arrayMap(graphUgenInputSpec(graph, input), index => encodeInt32(index))),
        arrayReplicate(ugen.numChan, encodeInt8(ugen.ugenRate))
    ];
}

function graphEncodeSyndef(graph: Graph): Uint8Array {
    return flattenByteEncoding([
        encodeInt32(SCgf),
        encodeInt32(2), // file version
        encodeInt16(1), // # synth definitions
        encodePascalString(graph.graphName), // pstring
        encodeInt32(arrayLength(graph.constantSeq)),
        arrayMap(graph.constantSeq, item => encodeFloat32(item)),
        encodeInt32(0), // # param
        encodeInt32(0), // # param names
        encodeInt32(arrayLength(graph.ugenSeq)),
        arrayMap(graph.ugenSeq, item => graphEncodeUgenSpec(graph, item)),
        encodeInt16(0) // # variants
    ]);
}
