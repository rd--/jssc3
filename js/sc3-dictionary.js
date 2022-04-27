// sc3-dictionary.js

class Dictionary extends Obj {
    constructor(aDictionary) {
        super(aDictionary);
        this.dictionary = aDictionary;
    }
    isDictionary() {
        return new Bool(true);
    }
    at(aKey) {
        return aKey.isSymbol().boolean ? (this.dictionary[aKey.string] || nil()) : nil();
    }
    put(aKey, aValue) {
        if(aKey.isSymbol().boolean) {
            this.dictionary[aKey.string] = aValue;
        }
    }
    size() {
        return new Int(Object.keys(this.dictionary).length);
    }
}

function dictionary(aDictionary) {
    return new Dictionary(aDictionary);
}
