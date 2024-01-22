const quill = {
	options: {
		modules: {
			toolbar: [
				['bold', 'italic', 'underline'],
				['link'],
				['blockquote', 'code-block'],
				[{ 'header': 1 }, { 'header': 2 }],
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ 'script': 'sub'}, { 'script': 'super' }],
				['clean']
			]
		},
		theme: 'snow'
	}
};

export function sc3_superscript_init(editor) {
	quill.editor = new Quill('#text_editor', quill.options);
	quill.editor.root.setAttribute('spellcheck', false);
	editor.get_selected_text = sc3_superscript_get_selected_text;
	editor.get_data = sc3_superscript_get_html;
	editor.set_data = sc3_superscript_set_html;
}

function sc3_superscript_get_selected_text() {
	const range = quill.editor.getSelection();
	const emptyString = '';
	if (range) {
		if (range.length === 0) {
			return emptyString;
		} else {
			const text = quill.editor.getText(range.index, range.length);
			return text;
		}
	} else {
		return emptyString;
	}
}

function sc3_superscript_get_html() {
	return quill.editor.root.innerHTML;
}

function sc3_superscript_set_html(htmlText) {
	quill.editor.root.innerHTML = htmlText;
}
