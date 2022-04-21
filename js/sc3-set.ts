// sc3-set.ts

export function setNew(): Set<any> {
    return new Set();
}

export function setAdd(aSet: Set<any>, aValue: any): void {
    aSet.add(aValue);
}

export var setPut = setAdd;

export function setHas(aSet: Set<any>, aValue: any): boolean {
    return aSet.has(aValue);
}

export function setFromArray(anArray: Array<any>): Set<any> {
    return new Set(anArray);
}

export function setToArray(aSet: Set<any>): Array<any> {
    return Array.from(aSet);
}
