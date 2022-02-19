'use strict';

// Rate.kr === 1
var Rate = { ir: 0, kr: 1, ar: 2, dr: 3 };

// rateSelector(1) === 'kr'
function rateSelector(r) {
    return objectKeyFromValue(Rate, r);
}
