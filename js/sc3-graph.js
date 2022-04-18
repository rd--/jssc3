'use strict';

// p : port | [port], c & w : {number | ugen} ; traverse graph from p adding leaf nodes to the set c
// w protects from loops in mrg (when recurring in traversing mrg elements w is set to c).
function ugenTraverseCollecting(p, c, w) {
    if(isArray(p)) {
        console.debug('ugenTraverseCollecting: array', p);
        arrayForEach(p, item => ugenTraverseCollecting(item, c, w));
    } else if(isPort(p)) {
        console.debug('ugenTraverseCollecting: port', p);
        if(!setHas(w, p.ugen)) {
            setAdd(c, p.ugen);
            arrayForEach(p.ugen.inputValues, item => isNumber(item) ? setAdd(c, item)  : ugenTraverseCollecting(item, c, w));
            arrayForEach(p.ugen.mrg, item => isNumber(item) ? setAdd(c, item) : ugenTraverseCollecting(item, c, c));
        }
    } else {
        console.error('ugenTraverseCollecting', p, c, w);
    }
}

// all leaf nodes of p
function ugenGraphLeafNodes(p) {
    var c = setNew();
    ugenTraverseCollecting(p, c, setNew());
    return setToArray(c);
}

function ugenCompare(i, j) {
    return  i.ugenId - j.ugenId;
}

// ugens are sorted by id, which is in applicative order. a maxlocalbufs ugen is always present.
function Graph(name, graph) {
    var leafNodes = ugenGraphLeafNodes(graph);
    var ugens = arraySort(arrayFilter(leafNodes, isUgen), ugenCompare);
    var constants = arrayFilter(leafNodes, isNumber);
    var numLocalBufs = arrayLength(arrayFilter(ugens, item => item.ugenName === 'LocalBuf'));
    return {
        graphName: name,
        ugenSeq: arrayAppend([MaxLocalBufs(numLocalBufs).ugen], ugens),
        constantSeq: arraySort(arrayNub(arrayAppend([numLocalBufs], constants)), (i, j) => i - j)
    };
}

function graphConstantIndex(graph, constantIndex) {
    return arrayIndexOf(graph.constantSeq, constantIndex);
}

// lookup ugen index at graph given ugenId
function graphUgenIndex(graph, ugenId) {
    return arrayFindIndex(graph.ugenSeq, ugen => ugen.ugenId === ugenId);
}

// port|num -> [int, int]
function graphInputSpec(graph, input) {
    return isPort(input) ? [graphUgenIndex(graph, input.ugen.ugenId), input.index] : [-1, graphConstantIndex(graph, input)];
}

function graphPrintUgenSpec(graph, ugen) {
    console.log(
        ugen.ugenName,
        ugen.ugenRate,
        arrayLength(ugen.inputValues),
        ugen.numChan,
        ugen.specialIndex,
        arrayMap(ugen.inputValues, input => graphInputSpec(graph, input)),
        arrayReplicate(ugen.numChan, ugen.ugenRate)
    );
}

var SCgf = Number(1396926310);

function graphPrintSyndef(graph) {
    console.log(SCgf, 2, 1, graph.graphName, arrayLength(graph.constantSeq), graph.constantSeq, 0, [], 0, [], arrayLength(graph.ugenSeq));
    arrayForEach(graph.ugenSeq, item => graphPrintUgenSpec(graph, item));
    console.log(0, []);
}

function graphEncodeUgenSpec(graph, ugen) {
    return [
        encodePascalString(ugen.ugenName),
        encodeInt8(ugen.ugenRate),
        encodeInt32(arrayLength(ugen.inputValues)),
        encodeInt32(ugen.numChan),
        encodeInt16(ugen.specialIndex),
        arrayMap(ugen.inputValues, input => arrayMap(graphInputSpec(graph, input), index => encodeInt32(index))),
        arrayReplicate(ugen.numChan, encodeInt8(ugen.ugenRate))
    ];
}

function graphEncodeSyndef(graph) {
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

// Print

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
