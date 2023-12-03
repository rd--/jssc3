import { isNumber } from '../kernel/number.ts';
import { isString } from '../kernel/string.ts';

// columnIndexToLetter(6) === 'g'
export function columnIndexToLetter(columnIndex: number): string {
	if (isNumber(columnIndex)) {
		const columnLetter = String.fromCharCode(columnIndex + 97); // 0 -> a
		return columnLetter;
	} else {
		console.error(`columnIndexToLetter: not a number: ${columnIndex}`);
		return '?';
	}
}

// columnLetterToIndex('g') === 6
export function columnLetterToIndex(columnLetter: string): number {
	if (isString(columnLetter)) {
		const columnIndex = columnLetter.charCodeAt(0) - 97;
		return columnIndex;
	} else {
		console.error(`columnLetterToIndex: not a string: ${columnLetter}`);
		return -1;
	}
}

// cellRefToBus(10, 'a', 4)
export function cellRefToLinearIndex(
	numberOfColumns: number,
	columnLetter: string,
	rowNumber: number,
): number {
	const columnIndex = columnLetterToIndex(columnLetter);
	return ((rowNumber - 1) * numberOfColumns) + columnIndex;
}

// apply proc (columnLetter, rowNumber) for each cell in evaluation order (right to left in each row descending)
export function allCellRefDo(
	numberOfColumns: number,
	numberOfRows: number,
	proc: (aColumn: string, aRow: number) => void,
): void {
	for (let rowNumber = 1; rowNumber <= numberOfRows; rowNumber++) {
		for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
			const columnLetter = columnIndexToLetter(columnIndex);
			proc(columnLetter, rowNumber);
		}
	}
}
