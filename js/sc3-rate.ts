'use strict';

var rateIr = 0;
var rateKr = 1;
var rateAr = 2;
var rateDr = 3;

var rateSelectorTable : { [key: string]: string; } = { 0: 'ir', 1: 'kr', 2: 'ar', 3: 'dr' };

// rateSelector(rateKr) === 'kr'
function rateSelector(aRate : number) : string | undefined {
    return rateSelectorTable[String(aRate)];
}

var rate = {
    ir: rateIr,
    kr: rateKr,
    ar: rateAr,
    dr: rateDr,
    selectorTable: rateSelectorTable,
    selector: rateSelector
};
