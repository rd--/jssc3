// sc3-graph.ts

import { arrayAppend, arrayFilter, arrayFindIndex, arrayForEach, arrayIndexOf, arrayLength, arrayMap, arrayNub, arrayReplicate, arraySort } from './sc3-array.js'
import { encodeInt8, encodeInt16, encodeInt32, encodeFloat32, encodePascalString } from './sc3-encode.js'
import { consoleDebug } from './sc3-error.js'
import { isNumber } from './sc3-number.js'
import { rateIr } from './sc3-rate.js'
import { setIncludes, setNew, setAdd, setAsArray } from './sc3-set.js'
import { Tree } from './sc3-tree.js'
import { flattenByteEncoding } from './sc3-u8.js'
import { UgenInput, Ugen, ScUgen, scUgenCompare, Signal, isUgen, isScUgen, ScUgen } from './sc3-ugen.js'

// traverse graph from p adding leaf nodes to the set c
// w protects from loops in mrg (when recurring in traversing mrg elements w is set to c).
export function ugenTraverseCollecting(p: Tree<Ugen>, c: Set<number | ScUgen>, w: Set<number | ScUgen>): void {
    if(Array.isArray(p)) {
        consoleDebug('ugenTraverseCollecting: array', p);
        arrayForEach(p, item => ugenTraverseCollecting(item, c, w));
    } else if(isUgen(p)) {
        var pUgen = <Ugen>p;
        var mrgArray = setAsArray(pUgen.scUgen.mrg);
        consoleDebug('ugenTraverseCollecting: port', pUgen);
        if(!setIncludes(w, pUgen.scUgen)) {
            setAdd(c, pUgen.scUgen);
            arrayForEach(pUgen.scUgen.inputArray, item => isNumber(item) ? setAdd(c, item)  : ugenTraverseCollecting(item, c, w));
            arrayForEach(mrgArray, item => isNumber(item) ? setAdd(c, item) : ugenTraverseCollecting(item, c, c));
        }
    } else {
        console.error('ugenTraverseCollecting', p, c, w);
    }
}

export function ugenGraphLeafNodes(p: Tree<Ugen>): Array<number | ScUgen> {
    var c = setNew();
    ugenTraverseCollecting(p, c, setNew());
    return setAsArray(c);
}

export type Graph = {
    name: string,
    ugenSeq: ScUgen[],
    constantSeq: number[]
};

// This should check that signal is not a tree of numbers...
export function signalToUgenGraph(signal: Signal): Tree<Ugen> {
    return <Tree<Ugen>>signal;
}

// ugens are sorted by id, which is in applicative order. a maxlocalbufs ugen is always present.
export function makeGraph(name: string, signal: Signal): Graph {
    var graph = signalToUgenGraph(signal);
    var leafNodes = ugenGraphLeafNodes(graph);
    var ugens = arraySort(arrayFilter(leafNodes, isScUgen), scUgenCompare);
    var constants = arrayFilter(leafNodes, isNumber);
    var numLocalBufs = arrayLength(arrayFilter(ugens, item => item.name === 'LocalBuf'));
    var MaxLocalBufs = function(count: number): ScUgen {
        return ScUgen('MaxLocalBufs', 1, rateIr, 0, [count]);
    };
    return {
        name: name,
        ugenSeq: arrayAppend([MaxLocalBufs(numLocalBufs)], ugens),
        constantSeq: arraySort(arrayNub(arrayAppend([numLocalBufs], constants)), (i, j) => i - j)
    };
}

export function graphConstantIndex(graph: Graph, constantValue: number): number {
    return arrayIndexOf(graph.constantSeq, constantValue);
}

export function graphUgenIndex(graph: Graph, id: number): number {
    return arrayFindIndex(graph.ugenSeq, ugen => ugen.id === id);
}

export function graphUgenInputSpec(graph: Graph, input: UgenInput): number[] {
    if(isUgen(input)) {
        var ugen = <Ugen>input;
        return [graphUgenIndex(graph, ugen.scUgen.id), ugen.port];
    } else {
        return [-1, graphConstantIndex(graph, <number>input)];
    }
}

export var SCgf: number = Number(1396926310);

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
