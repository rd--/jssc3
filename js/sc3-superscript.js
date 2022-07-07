// sc3-superscript.js ; requires quill
'use strict';

// https://quilljs.com/
var quill_text_editor;

var quill_toolbar_config = [
	['bold', 'italic', 'underline'],
	['link'],
	['blockquote', 'code-block'],
	[{ 'header': 1 }, { 'header': 2 }],
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ 'script': 'sub'}, { 'script': 'super' }],
	['clean']
];

var quill_options = {
	modules: { toolbar: quill_toolbar_config },
	theme: 'snow'
};

function sc3_superscript_init() {
	quill_text_editor = new Quill('#text_editor', quill_options);
	quill_text_editor.root.setAttribute('spellcheck', false);
	consoleDebug('sc3_superscript_init: finished');
}

function sc3_superscript_get_selected_text() {
	var range = quill_text_editor.getSelection();
	var emptyString = '';
	if (range) {
		if (range.length === 0) {
			return emptyString;
		} else {
			var text = quill_text_editor.getText(range.index, range.length);
			return text;
		}
	} else {
		return emptyString;
	}
}

function sc3_superscript_set_text(programText) {
	quill_text_editor.root.innerHTML = programText;
}

function editor_get_js_notation_and_then(proc) {
	translate_if_required_and_then(sc3_superscript_get_selected_text(), proc);
}

function sc3_superscript_get_html() {
	return quill_text_editor.root.innerHTML;
}

function sc3_superscript_set_html(htmlText) {
	quill_text_editor.root.innerHTML = htmlText;
}
