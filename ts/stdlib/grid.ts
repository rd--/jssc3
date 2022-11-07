import { isNumber } from '../kernel/number.js'
import { isString } from '../kernel/string.js'

// column_index_to_letter(6) === 'g'
export function column_index_to_letter(column_index: number): string {
	if(isNumber(column_index)) {
		const column_letter = String.fromCharCode(column_index + 97); // 0 -> a
		return column_letter;
	} else {
		console.error(`column_index_to_letter: not a number: ${column_index}`);
		return '?';
	}
}

// column_letter_to_index('g') === 6
export function column_letter_to_index(column_letter: string): number {
	if(isString(column_letter)) {
		const column_index = column_letter.charCodeAt(0) - 97;
		return column_index;
	} else {
		console.error(`column_letter_to_index: not a string: ${column_letter}`);
		return -1;
	}
}

// cellref_to_bus(10, 'a', 4)
export function cellref_to_linear_index(number_of_columns: number, column_letter: string, row_number: number): number {
	const column_index = column_letter_to_index(column_letter);
	return ((row_number - 1) * number_of_columns) + column_index;
}

// apply proc (column_letter, row_number) for each cell in evaluation order (right to left in each row descending)
export function all_cellref_do(number_of_columns: number, number_of_rows: number, proc: (aColumn: string, aRow: number) => void): void {
	for(let row_number = 1; row_number <= number_of_rows; row_number++) {
		for(let column_index = 0; column_index < number_of_columns; column_index++) {
			const column_letter = column_index_to_letter(column_index);
			proc(column_letter, row_number);
		}
	}
}
