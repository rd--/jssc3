import { get_select_element_and_then } from '../kernel/dom.ts'
import { stc_to_js_and_then } from '../sc3/stc.ts'

export const notation = { format: '.stc' };

export function resolve_file_type(fileType: string | null) {
	return fileType ? fileType : notation.format;
}

// Id: notationFormat
export function set_notation_format(): void {
	get_select_element_and_then('notationFormat', selectElement => notation.format = selectElement.value);
}

export type AsyncTranslationProc = (text: string, proc: (translated: string) => void) => void;

export const notationTranslationTable : Record<string, AsyncTranslationProc> = {
	'.js': function(text, proc) { proc(text); },
	'.stc': stc_to_js_and_then
};

export function translate_if_required_and_then(userText: string, proc: (aString: string) => void): void {
	const translator = notationTranslationTable[notation.format];
	if(translator) {
		translator(userText, proc);
	} else {
		console.error(`translate_if_required_and_then: unknown format: ${notation.format}`);
	}
}
