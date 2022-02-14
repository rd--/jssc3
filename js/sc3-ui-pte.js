'use strict';

// https://ace.c9.io
var ace_editor;

// textarea
var textarea_editor;

function ace_editor_init(parent) {
    var container = document.createElement('div');
    container.setAttribute("id", "text_editor");
    parent.appendChild(container);
    ace_editor = ace.edit("text_editor", { wrap: true, indentedSoftWrap: true });
    ace_editor.setTheme("ace/theme/solarized_light");
    ace_editor.session.setMode("ace/mode/javascript");
    ace_editor.setOption("highlightActiveLine", false);
    ace_editor.renderer.setShowGutter(false);
    ace_editor.setShowPrintMargin(false);
}

function textarea_editor_init(parent) {
    textarea_editor = document.createElement('textarea');
    textarea_editor.setAttribute("id", "jsProgram");
    parent.appendChild(textarea_editor);
}

function text_editor_init() {
    var parent = document.getElementById('jsContainer');
    var useAce = typeof ace !== 'undefined';
    if(useAce) {
        ace_editor_init(parent);
    }  else {
        textarea_editor_init(parent);
    }
}

function text_editor_get_text() {
    var currentText = ace_editor ? ace_editor.getValue() : textarea_get_selection_or_contents(textarea_editor);
    // console.log('text_editor_get_text', currentText);
    if(currentText.trim().length == 0) {
        console.warn('text_editor_get_text: empty text');
    }
    return currentText;
}

function text_editor_set_text(programText) {
    if(ace_editor) {
        ace_editor.getSession().setValue(programText);
    } else {
        textarea_editor.value = programText;
    }
}

function editor_get_js_notation_and_then(proc) {
    translate_if_required_and_then(text_editor_get_text(), proc);
}

var editor_get_data = text_editor_get_text;

var editor_set_data = text_editor_set_text;
