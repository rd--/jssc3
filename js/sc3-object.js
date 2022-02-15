'use strict';

// Find key at object that holds value.
function objectKeyFromValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

// Make a new object having only the indicated fields copied from the input object.
// copy_keys_from_object({a: 1, b: 2, c: 3}, ['a', 'c']) // => {a: 1, c: 3}
function copy_keys_from_object(object, keysArray) {
    var answer = {};
    keysArray.forEach(key => answer[key] = object[key]);
    return answer;
}
