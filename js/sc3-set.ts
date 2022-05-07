// sc3-set.ts

export function isSet(aValue: (aValue: any) => boolean) {
    return aValue.toString() == '[object Set]';
}

export function setNew(): Set<any> {
    return new Set();
}

export function setFromArray(anArray: Array<any>): Set<any> {
    return new Set(anArray);
}

export function setAdd(aSet: Set<any>, aValue: any): void {
    aSet.add(aValue);
}

export function setIncludes(aSet: Set<any>, aValue: any): boolean {
    return aSet.has(aValue);
}

export function setAsArray(aSet: Set<any>): Array<any> {
    return Array.from(aSet);
}
