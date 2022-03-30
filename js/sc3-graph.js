'use strict';

// p : port | [port], c & w : {number | ugen} ; traverse graph from p adding leaf nodes to the set c ; w protects from loops in mrg
function ugenTraverseCollecting(p, c, w) {
    if(Array.isArray(p)) {
        console.debug('ugenTraverseCollecting: array', p);
        p.forEach(item => ugenTraverseCollecting(item, c, w));
    } else if(isPort(p)) {
        console.debug('ugenTraverseCollecting: port', p);
        if(!w.has(p.ugen)) {
            c.add(p.ugen);
            p.ugen.inputValues.forEach(item => isNumber(item) ? c.add(item)  : ugenTraverseCollecting(item, c, w));
            p.ugen.mrg.forEach(item => isNumber(item) ? c.add(item) : ugenTraverseCollecting(item, c, c));
        }
    } else {
        console.error('ugenTraverseCollecting', p, c, w);
    }
}

// all leaf nodes of p
function ugenGraphLeafNodes(p) {
    var c = new Set();
    ugenTraverseCollecting(p, c, new Set());
    return Array.from(c);
}

// ugens are sorted by id, which is in applicative order. a maxlocalbufs ugen is always present.
class Graph {
    constructor(name, graph) {
        var leafNodes = ugenGraphLeafNodes(graph);
        var ugens = leafNodes.filter(item => isUgen(item)).sort((i, j) => i.ugenId - j.ugenId);
        var constants = leafNodes.filter(item => isNumber(item));
        var numLocalBufs = ugens.filter(item => isUgen(item) && item.ugenName === 'LocalBuf').length;
        this.graphName = name;
        this.ugenSeq = [MaxLocalBufs(numLocalBufs).ugen].concat(ugens);
        this.constantSeq = arrayNub([numLocalBufs].concat(constants)).sort((i, j) => i - j);
    }
}

function isGraph(obj) {
    return obj.constructor === Graph;
}

Graph.prototype.constantIndex = function(k) {
    return this.constantSeq.indexOf(k);
};

// lookup ugen index at graph given ugenId
Graph.prototype.ugenIndex = function(k) {
    return this.ugenSeq.findIndex(u => u.ugenId === k);
};

// port|num -> [int, int]
Graph.prototype.inputSpec = function(i) {
    return isPort(i) ? [this.ugenIndex(i.ugen.ugenId), i.index] : [-1, this.constantIndex(i)];
};

Graph.prototype.printUgenSpec = function(u) {
    console.log(
        u.ugenName,
        u.ugenRate,
        u.inputValues.length,
        u.numChan,
        u.specialIndex,
        u.inputValues.map(i => this.inputSpec(i)),
        arrayReplicate(u.numChan, u.ugenRate)
    );
};

var SCgf = Number(1396926310);

Graph.prototype.printSyndef = function() {
    console.log(SCgf, 2, 1, this.graphName, this.constantSeq.length, this.constantSeq, 0, [], 0, [], this.ugenSeq.length);
    this.ugenSeq.forEach(item => this.printUgenSpec(item));
    console.log(0, []);
};

Graph.prototype.encodeUgenSpec = function(u) {
    return [
        encodePascalString(u.ugenName),
        encodeInt8(u.ugenRate),
        encodeInt32(u.inputValues.length),
        encodeInt32(u.numChan),
        encodeInt16(u.specialIndex),
        u.inputValues.map(i => this.inputSpec(i).map(ix => encodeInt32(ix))),
        arrayReplicate(u.numChan, encodeInt8(u.ugenRate))
    ];
};

Graph.prototype.encodeSyndef = function() {
    return flattenByteEncoding([
        encodeInt32(SCgf),
        encodeInt32(2), // file version
        encodeInt16(1), // # synth definitions
        encodePascalString(this.graphName), // pstring
        encodeInt32(this.constantSeq.length),
        this.constantSeq.map(item => encodeFloat32(item)),
        encodeInt32(0), // # param
        encodeInt32(0), // # param names
        encodeInt32(this.ugenSeq.length),
        this.ugenSeq.map(item => this.encodeUgenSpec(item)),
        encodeInt16(0) // # variants
    ]);
};

// Print

function printSyndefOf(u) {
    var g = new Graph('sc3.js', Out(0, u));
    g.printSyndef(g);
}

// Pretty print

Graph.prototype.inputDisplayName = function(i) {
    if(isPort(i)) {
        var id = String(this.ugenIndex(i.ugen.ugenId));
        var nm = i.ugen.displayName();
        var ix = i.ugen.numChan > 1 ? ('[' + String(i.index) + ']') : '';
        return id + '_' + nm + ix;
    } else if(isNumber(i)) {
        return String(i);
    } else {
        console.error('inputDisplayName', i);
    }
};

Graph.prototype.prettyPrintUgen = function(u) {
    console.log(
        this.ugenIndex(u.ugenId) + '_' + u.displayName(),
        rateSelector(u.ugenRate),
        '[' + String(u.inputValues.map(i => this.inputDisplayName(i))) + ']'
    );
};

Graph.prototype.prettyPrintSyndef = function() {
    this.ugenSeq.forEach(item => this.prettyPrintUgen(item));
};

function prettyPrintSyndefOf(u) {
    var g = new Graph('sc3.js', Out(0, u));
    g.prettyPrintSyndef(g);
}
