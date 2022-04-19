// sc3-set.ts

function setNew(): Set<any> {
    return new Set();
}

function setAdd(aSet: Set<any>, aValue: any): void {
    aSet.add(aValue);
}

var setPut = setAdd;

function setHas(aSet: Set<any>, aValue: any): boolean {
    return aSet.has(aValue);
}

function setFromArray(anArray: Array<any>): Set<any> {
    return new Set(anArray);
}

function setToArray(aSet: Set<any>): Array<any> {
    return Array.from(aSet);
}
