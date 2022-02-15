'use strict';

function oscData(t, x) { return {type: t, value: x}; }
function oscInt32(x) { return oscData('i', x); }
function oscFloat(x) { return oscData('f', x); }
function oscString(x) { return oscData('s', x); }
function oscBlob(x) { return oscData('b', x); }
