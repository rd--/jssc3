'use strict';

function emptySet(): Set<any> {
    return new Set();
}

function setAdd(aSet: Set<any>, aValue: any): void {
    aSet.add(aValue);
}

function setHas(aSet: Set<any>, aValue: any): boolean {
    return aSet.has(aValue);
}

function setToArray(aSet: Set<any>): Array<any> {
    return Array.from(aSet);
}
