// sc3-number.ts

function isNumber(x : any) : boolean {
    return (typeof x === 'number');
}

var pi = Math.PI;

var inf = Infinity;

function randomInteger(minNumber : number, maxNumber : number) : number {
    var min = Math.ceil(minNumber);
    var max = Math.floor(maxNumber);
    return Math.floor(Math.random() * (max - min) + min); // the maximum is exclusive and the minimum is inclusive
}

function randomFloat(min : number, max  : number) : number {
  return Math.random() * (max - min) + min;
}

function randomBoolean() : boolean {
    return Math.random()  > 0.5;
}
