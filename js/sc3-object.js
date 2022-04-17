'use strict';
// Find key at object that holds value.
function objectKeyFromValue(anObject, value) {
    var predicate = function (key) { return anObject[key] === value; };
    return Object.keys(anObject).find(predicate);
}
// Make a new object having only the indicated fields copied from the input object.
// copy_keys_from_object({a: 1, b: 2, c: 3}, ['a', 'c']) //= {a: 1, c: 3}
function copy_keys_from_object(anObject, keysArray) {
    var answer = {};
    keysArray.forEach(key => answer[key] = anObject[key]);
    return answer;
}
