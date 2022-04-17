'use strict';

// Find key at object that holds value.
function objectKeyFromValue(anObject : { [key: string]: any }, value : any) : string | undefined {
    var predicate : (x : string) => boolean = function(key) { return anObject[key] === value; };
    return Object.keys(anObject).find(predicate);
}

// Make a new object having only the indicated fields copied from the input object.
// copy_keys_from_object({a: 1, b: 2, c: 3}, ['a', 'c']) //= {a: 1, c: 3}
function copy_keys_from_object(anObject : { [key: string]: any }, keysArray : string[]) : { [key: string]: any } {
    var answer : { [key: string]: any } = {};
    keysArray.forEach(key => answer[key] = anObject[key]);
    return answer;
}
