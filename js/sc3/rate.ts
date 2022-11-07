export const rateIr = 0;
export const rateKr = 1;
export const rateAr = 2;
export const rateDr = 3;

export const rateSelectorTable : { [key: string]: string } = {
	0: 'ir',
	1: 'kr',
	2: 'ar',
	3: 'dr'
};

// rateSelector(rateKr) === 'kr'
export function rateSelector(aRate : number) : string | undefined {
	return rateSelectorTable[String(aRate)];
}
