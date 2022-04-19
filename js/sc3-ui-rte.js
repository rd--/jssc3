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

function ui_rte_init() {
    quill_text_editor = new Quill('#text_editor', quill_options);
    quill_text_editor.root.setAttribute('spellcheck', false);
    consoleDebug('ui_rte_init: finished');
}

function ui_rte_get_selected_text() {
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

function ui_rte_set_text(programText) {
    quill_text_editor.root.innerHTML = programText;
}

function editor_get_js_notation_and_then(proc) {
    translate_if_required_and_then(ui_rte_get_selected_text(), proc);
}

var text_editor_get_selected_text = ui_rte_get_selected_text;

// Get text (as .html)
function editor_get_data() {
    return quill_text_editor.root.innerHTML;
}

// Set text (from .html)
function editor_set_data(programData) {
    quill_text_editor.root.innerHTML = programData;
}
