'use strict';

var text_editor;

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

function text_editor_init() {
    text_editor = new Quill('#text_editor', quill_options);
    text_editor.root.setAttribute('spellcheck', false);
}

function text_editor_get_selected_text() {
    var range = text_editor.getSelection();
    var emptyString = '';
    if (range) {
        if (range.length == 0) {
            return emptyString;
        } else {
            var text = text_editor.getText(range.index, range.length);
            return text;
        }
    } else {
        return emptyString;
    }
}

function text_editor_get_text() {
    return text_editor_get_selected_text();
}

function text_editor_get_data() {
    return text_editor.root.innerHTML;
}

function text_editor_set_text(programText) {
    text_editor.root.innerHTML = programText;
}

function text_editor_set_data(programData) {
    return text_editor.root.innerHTML = programData;
}

