// sc3-graph.ts

import { arrayAppend, arrayFilter, arrayFindIndex, arrayForEach, arrayIndexOf, arrayLength, arrayMap, arrayNub, arrayReplicate, arraySort } from './sc3-array.js'
import { encodeInt8, encodeInt16, encodeInt32, encodeFloat32, encodePascalString } from './sc3-encode.js'
import { consoleDebug } from './sc3-error.js'
import { isNumber } from './sc3-number.js'
import { queueToArray } from './sc3-queue.js'
import { rateIr } from './sc3-rate.js'
import { setHas, setNew, setAdd, setToArray } from './sc3-set.js'
import { Tree } from './sc3-tree.js'
import { flattenByteEncoding } from './sc3-u8.js'
import { UgenInput, UgenOutput, UgenPrimitive, Signal, isUgenOutput, isUgenPrimitive, makeUgenPrimitive } from './sc3-ugen.js'

// traverse graph from p adding leaf nodes to the set c
// w protects from loops in mrg (when recurring in traversing mrg elements w is set to c).
export function ugenTraverseCollecting(p: Tree<UgenOutput>, c: Set<number | UgenPrimitive>, w: Set<number | UgenPrimitive>): void {
    if(Array.isArray(p)) {
        consoleDebug('ugenTraverseCollecting: array', p);
        arrayForEach(p, item => ugenTraverseCollecting(item, c, w));
    } else if(isUgenOutput(p)) {
        var pUgenOutput = <UgenOutput>p;
        var mrgArray = queueToArray(pUgenOutput.ugen.mrg);
        consoleDebug('ugenTraverseCollecting: port', pUgenOutput);
        if(!setHas(w, pUgenOutput.ugen)) {
            setAdd(c, pUgenOutput.ugen);
            arrayForEach(pUgenOutput.ugen.inputValues, item => isNumber(item) ? setAdd(c, item)  : ugenTraverseCollecting(item, c, w));
            arrayForEach(mrgArray, item => isNumber(item) ? setAdd(c, item) : ugenTraverseCollecting(item, c, c));
        }
    } else {
        console.error('ugenTraverseCollecting', p, c, w);
    }
}

// all leaf nodes of p
export function ugenGraphLeafNodes(p: Tree<UgenOutput>): Array<number | UgenPrimitive> {
    var c = setNew();
    ugenTraverseCollecting(p, c, setNew());
    return setToArray(c);
}

export function ugenCompare(i: UgenPrimitive, j: UgenPrimitive): number {
    return  i.ugenId - j.ugenId;
}

export type Graph = {
    graphName: string,
    ugenSeq: UgenPrimitive[],
    constantSeq: number[]
};

// This should check that signal is not a tree of numbers...
export function signalToUgenGraph(signal: Signal): Tree<UgenOutput> {
    return <Tree<UgenOutput>>signal;
}

// ugens are sorted by id, which is in applicative order. a maxlocalbufs ugen is always present.
export function makeGraph(name: string, signal: Signal): Graph {
    var graph = signalToUgenGraph(signal);
    var leafNodes = ugenGraphLeafNodes(graph);
    var ugens = arraySort(arrayFilter(leafNodes, isUgenPrimitive), ugenCompare);
    var constants = arrayFilter(leafNodes, isNumber);
    var numLocalBufs = arrayLength(arrayFilter(ugens, item => item.ugenName === 'LocalBuf'));
    var MaxLocalBufs = function(count: number): UgenPrimitive {
        return makeUgenPrimitive('MaxLocalBufs', 1, rateIr, 0, [count]);
    };
    return {
        graphName: name,
        ugenSeq: arrayAppend([MaxLocalBufs(numLocalBufs)], ugens),
        constantSeq: arraySort(arrayNub(arrayAppend([numLocalBufs], constants)), (i, j) => i - j)
    };
}

export function graphConstantIndex(graph: Graph, constantValue: number): number {
    return arrayIndexOf(graph.constantSeq, constantValue);
}

// lookup ugen index at graph given ugenId
export function graphUgenIndex(graph: Graph, ugenId: number): number {
    return arrayFindIndex(graph.ugenSeq, ugen => ugen.ugenId === ugenId);
}

export function graphUgenInputSpec(graph: Graph, input: UgenInput): number[] {
    if(isUgenOutput(input)) {
        var port = <UgenOutput>input;
        return [graphUgenIndex(graph, port.ugen.ugenId), port.index];
    } else {
        return [-1, graphConstantIndex(graph, <number>input)];
    }
}

export var SCgf: number = Number(1396926310);

export function graphEncodeUgenSpec(graph: Graph, ugen: UgenPrimitive): Tree<Uint8Array> {
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

export function graphEncodeSyndef(graph: Graph): Uint8Array {
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
