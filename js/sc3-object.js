'use strict';

// Find key at object that holds value.
function objectKeyFromValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
