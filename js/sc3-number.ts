// sc3-number.ts

function isNumber(x : any) : boolean {
    return (typeof x === 'number');
}

var pi : number = Math.PI;

var inf : number = Infinity;

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

function numberToString(aNumber: number): string {
    return Number(aNumber).toString();
}
