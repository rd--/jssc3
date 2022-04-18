// sc3-u8.ts ; requires sc3-tree

function isUint8Array(x : any) : boolean {
    return (x instanceof Uint8Array);
}

function uint8ArrayIntoArray(u8Array : Uint8Array, numberArray : number[]) : void {
    u8Array.forEach(aNumber => numberArray.push(aNumber));
}

// Flatten a tree of Uint8Array to an array of U8
function flattenByteEncodingToArray(aTree : Tree<Uint8Array>, anArray : number[] ) : void {
    treeVisit(aTree, item => uint8ArrayIntoArray(item, anArray));
}

function flattenByteEncoding(aTree : Tree<Uint8Array>) :  Uint8Array {
    var anArray : number[] = [];
    flattenByteEncodingToArray(aTree, anArray);
    return new Uint8Array(anArray);
}
