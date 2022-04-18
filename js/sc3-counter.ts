// sc3-counter.ts

type Counter = (() => number);

function counterNewFromBy(start: number, by: number): Counter {
    var x = start;
    return function() {
        x = x + by;
        return x;
    }
}

function counterNew(): Counter {
    return counterNewFromBy(0, 1);
}
