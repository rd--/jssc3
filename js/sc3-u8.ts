// sc3-u8.ts ; requires sc3-queue sc3-tree

function isUint8Array(x : any) : boolean {
    return (x instanceof Uint8Array);
}

function uint8ArrayIntoQueue(u8Array : Uint8Array, numberQueue : Queue<number>) : void {
    u8Array.forEach(aNumber => queuePush(numberQueue, aNumber));
}

// Flatten a tree of Uint8Array to an queue of U8
function flattenByteEncodingIntoQueue(aTree : Tree<Uint8Array>, numberQueue : Queue<number> ) : void {
    treeVisit(aTree, item => uint8ArrayIntoQueue(item, numberQueue));
}

function flattenByteEncoding(aTree : Tree<Uint8Array>) :  Uint8Array {
    var numberQueue = queueNew();
    flattenByteEncodingIntoQueue(aTree, numberQueue);
    return new Uint8Array(queueToArray(numberQueue));
}
