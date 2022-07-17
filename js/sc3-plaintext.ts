import { textarea_get_selection_or_contents } from './sc3-dom.js'
import { translate_if_required_and_then } from './sc3-ui-notation.js'

export let sc3_plaintext: HTMLTextAreaElement;

export function sc3_plaintext_init_in(parentId: string): void {
	const parentElement = document.getElementById(parentId);
	if(parentElement) {
		sc3_plaintext = document.createElement('textarea');
		sc3_plaintext.setAttribute("id", "jsProgram");
		parentElement.appendChild(sc3_plaintext);
	} else {
		console.error('sc3_plaintext_init_in');
	}
}

export function sc3_plaintext_get_complete_text(): string {
	return sc3_plaintext ? sc3_plaintext.value : '';
}

export function sc3_plaintext_get_selected_text(): string {
	const currentText = textarea_get_selection_or_contents(sc3_plaintext).trim();
	if(currentText.length === 0) {
		console.warn('sc3_plaintext_get_selected_text: empty text');
	}
	return currentText;
}

export function sc3_plaintext_set_text(programText: string): void {
	sc3_plaintext.value = programText;
}

export function editor_get_js_notation_and_then(proc: (aString: string) => void): void {
	translate_if_required_and_then(sc3_plaintext_get_selected_text(), proc);
}
