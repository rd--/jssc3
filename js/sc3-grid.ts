import { isNumber } from './sc3-number.js'
import { isString } from './sc3-string.js'

// column_index_to_letter(6) === 'g'
function column_index_to_letter(column_index: number): string {
    if(isNumber(column_index)) {
        var column_letter = String.fromCharCode(column_index + 97); // 0 -> a
        return column_letter;
    } else {
        console.error('column_index_to_letter: not a number?', column_index);
        return '?';
    }
}

// column_letter_to_index('g') === 6
function column_letter_to_index(column_letter: string): number {
    if(isString(column_letter)) {
        var column_index = column_letter.charCodeAt(0) - 97;
        return column_index;
    } else {
        console.error('sc3_supercalc_column_letter_to_index: not a string?', column_letter);
        return -1;
    }
}

// cellref_to_bus(10, 'a', 4)
function cellref_to_linear_index(number_of_columns: number, column_letter: string, row_number: number): number {
    var column_index = column_letter_to_index(column_letter);
    return ((row_number - 1) * number_of_columns) + column_index;
}

// apply proc (column_letter, row_number) for each cell in evaluation order (right to left in each row descending)
function all_cellref_do(number_of_columns: number, number_of_rows: number, proc: (aColumn: string, aRow: number) => void): void {
    for(var row_number = 1; row_number <= number_of_rows; row_number++) {
        for(var column_index = 0; column_index < number_of_columns; column_index++) {
            var column_letter = column_index_to_letter(column_index);
            proc(column_letter, row_number);
        }
    }
}
