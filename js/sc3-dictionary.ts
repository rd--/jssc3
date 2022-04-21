// sc3-dictionary.ts

export type Dictionary = { [key: string]: any };

export function isDictionary(aValue: any): boolean {
    return (typeof aValue) == 'object';
}

export function dictionaryNew(): Dictionary {
    return {};
}

export function dictionaryAt(aDictionary: Dictionary, aKey: string): any {
    return aDictionary[aKey];
}

export function dictionaryPut(aDictionary: Dictionary, aKey: string, aValue: any): void {
    aDictionary[aKey] = aValue;
}

export function dictionaryHasKey(aDictionary: Dictionary, aKey: string): boolean {
    return aDictionary[aKey] !== undefined;
}

// Copy all entries from sourceDictionary to destinationDictionary.
export function dictionaryCopyAllFromTo(sourceDictionary: Dictionary, destinationDictionary: Dictionary): void {
    Object.entries(sourceDictionary).forEach(([key, value]) => destinationDictionary[key] = value);
}

// Find key at aDictionary that holds aValue.
export function dictionaryFindKeyOfValue(aDictionary: Dictionary, aValue: any): string | undefined {
    var predicateFunction: (aKey: string) => boolean = function(aKey) {
        return aDictionary[aKey] === aValue;
    };
    return Object.keys(aDictionary).find(predicateFunction);
}

// Make a new dictionary having only the indicated fields copied from the input.
// dictionaryCopyKeys({a: 1, b: 2, c: 3}, ['a', 'c']) //= {a: 1, c: 3}
export function dictionaryCopyKeys(aDictionary: Dictionary, keysArray: string[]): Dictionary {
    var answer = dictionaryNew();
    keysArray.forEach(key => answer[key] = aDictionary[key]);
    return answer;
}
