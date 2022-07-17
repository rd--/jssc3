import { get_select_element_and_then } from './sc3-dom.js'
import { stc_to_js_and_then } from './sc3-stc.js'

export let notation_format: string;

export function resolve_file_type(fileType: string | null) {
	return fileType ? fileType : notation_format;
}

export function set_notation_format(): void {
	get_select_element_and_then('notationFormat', selectElement => notation_format = selectElement.value);
}

export function translate_if_required_and_then(userText: string, proc: (aString: string) => void): void {
	switch(notation_format) {
		case '.js': proc(userText); break;
		case '.stc': stc_to_js_and_then(userText, proc); break;
		default: console.error('translate_if_required_and_then: unknown format', notation_format);
	}
}
