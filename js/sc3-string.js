'use strict';
// isString('string') === true
function isString(x) {
    return typeof x === 'string';
}
function stringLines(aString) {
    return aString.split('\n');
}
function stringIsPrefixOf(lhs, rhs) {
    return rhs.slice(0, lhs.length) === lhs;
}
