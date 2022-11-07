import { textarea_get_selection_or_contents } from '../kernel/dom.js'

import { editor } from './editor.js'

let sc3_plaintext: HTMLTextAreaElement;

// Id: jsProgram
export function sc3_plaintext_init_in(parentId: string): void {
	const parentElement = document.getElementById(parentId);
	if(parentElement) {
		sc3_plaintext = document.createElement('textarea');
		sc3_plaintext.setAttribute('id', 'jsProgram');
		parentElement.appendChild(sc3_plaintext);
	} else {
		console.error('sc3_plaintext_init_in');
	}
	editor.get_selected_text = sc3_plaintext_get_selected_text;
	editor.get_data = sc3_plaintext_get_complete_text;
	editor.set_data = sc3_plaintext_set_text;
}

function sc3_plaintext_get_complete_text(): string {
	return sc3_plaintext ? sc3_plaintext.value : '';
}

function sc3_plaintext_get_selected_text(): string {
	const currentText = textarea_get_selection_or_contents(sc3_plaintext).trim();
	if(currentText.length === 0) {
		console.warn('sc3_plaintext_get_selected_text: empty text');
	}
	return currentText;
}

function sc3_plaintext_set_text(programText: string): void {
	sc3_plaintext.value = programText;
}
