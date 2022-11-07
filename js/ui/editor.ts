import { read_text_file_from_file_input_and_then } from '../kernel/io.js'
import { window_url_set_param } from '../kernel/dom.js'

import { Scsynth, playUgen } from '../sc3/scsynth.js'
import { prettyPrintSyndefOf } from '../sc3/graph-print.js'
import { translate_if_required_and_then } from './notation.js'

export type Editor = {
	get_selected_text: () => string,
	get_data: () => string,
	set_data: (aString: string) => void
};

export const editor: Editor = <Editor>{};

export function editor_get_js_notation_and_then(proc: (aString: string) => void): void {
	translate_if_required_and_then(editor.get_selected_text(), proc);
}

export function jssc3_read_input_program(): void {
	read_text_file_from_file_input_and_then('programInputFile', 0, editor.set_data);
}

export function prettyPrintSyndef(): void {
	editor_get_js_notation_and_then(function(programText) {
		prettyPrintSyndefOf(eval(programText));
	});
}

export function evalJsProgram(): void {
	editor_get_js_notation_and_then(function(programText) {
		var result = eval(programText);
		console.log(result);
	});
}

export function playJsProgram(scsynth: Scsynth) {
	editor_get_js_notation_and_then(function(programText) {
		var result = eval(programText);
		playUgen(scsynth, result);
	});
}

// Sets the 's' url parameter of the window to the encoded form of the selected text.
export function set_url_to_encode_selection() {
	window_url_set_param('s', editor.get_selected_text());
}
