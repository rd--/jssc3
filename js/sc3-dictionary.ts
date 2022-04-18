// sc3-dictionary.ts

type Dictionary = { [key: string]: any };

function dictionaryNew(): Dictionary {
    return {};
}

function dictionaryAt(aDictionary: Dictionary, aKey: string): any {
    return aDictionary[aKey];
}

function dictionaryPut(aDictionary: Dictionary, aKey: string, aValue: any): void {
    aDictionary[aKey] = aValue;
}

// Find key at aDictionary that holds aValue.
function dictionaryFindKeyOfValue(aDictionary: Dictionary, aValue: any): string | undefined {
    var predicateFunction: (aKey: string) => boolean = function(aKey) {
        return aDictionary[aKey] === aValue;
    };
    return Object.keys(aDictionary).find(predicateFunction);
}

// Make a new dictionary having only the indicated fields copied from the input.
// dictionaryCopyKeys({a: 1, b: 2, c: 3}, ['a', 'c']) //= {a: 1, c: 3}
function dictionaryCopyKeys(aDictionary: Dictionary, keysArray: string[]): Dictionary {
    var answer = dictionaryNew();
    keysArray.forEach(key => answer[key] = aDictionary[key]);
    return answer;
}
