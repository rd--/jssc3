'use strict';
function emptySet() {
    return new Set();
}
function setAdd(aSet, aValue) {
    aSet.add(aValue);
}
function setHas(aSet, aValue) {
    return aSet.has(aValue);
}
function setToArray(aSet) {
    return Array.from(aSet);
}
