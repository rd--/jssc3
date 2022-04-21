// sc3-rate.ts

export var rateIr = 0;
export var rateKr = 1;
export var rateAr = 2;
export var rateDr = 3;

export var rateSelectorTable : { [key: string]: string } = {
    0: 'ir',
    1: 'kr',
    2: 'ar',
    3: 'dr'
};

// rateSelector(rateKr) === 'kr'
export function rateSelector(aRate : number) : string | undefined {
    return rateSelectorTable[String(aRate)];
}
