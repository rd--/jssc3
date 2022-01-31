'use strict';

// * -> bool
function isNumber(x) {
    return (typeof x === 'number');
}

var pi = Math.PI;

var inf = Infinity;

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // the maximum is exclusive and the minimum is inclusive
}
