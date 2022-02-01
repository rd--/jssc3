'use strict';

// * -> bool
function isString(x) {
    return typeof x == 'string';
}

// string -> [string]
function stringLines(string) {
    return string.split('\n');
}

// string -> string -> bool
function stringIsPrefixOf(lhs, rhs) {
    return rhs.slice(0, lhs.length) === lhs;
}
