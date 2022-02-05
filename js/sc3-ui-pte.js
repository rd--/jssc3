'use strict';

// https://ace.c9.io
var ace_text_editor;

// textarea
var textarea_editor;

function ace_text_editor_init(parent) {
    var container = document.createElement('div');
    container.setAttribute("id", "text_editor");
    parent.appendChild(container);
    ace_text_editor = ace.edit("text_editor", { wrap: true, indentedSoftWrap: true });
    ace_text_editor.setTheme("ace/theme/solarized_light");
    ace_text_editor.session.setMode("ace/mode/javascript");
    ace_text_editor.setOption("highlightActiveLine", false);
    ace_text_editor.renderer.setShowGutter(false);
    ace_text_editor.setShowPrintMargin(false);
}

function text_editor_init() {
    var parent = document.getElementById('jsContainer');
    var useAce = typeof ace !== 'undefined';
    if(useAce) {
        ace_text_editor_init(parent);
    }  else {
        textarea_editor = document.createElement('textarea');
        textarea_editor.setAttribute("id", "jsProgram");
        parent.appendChild(textarea_editor);
    }
}

function text_editor_get_text() {
    if(ace_text_editor) {
        return ace_text_editor.getValue();
    } else {
        return textarea_editor.value;
    }
}

function text_editor_set_text(programText) {
    if(ace_text_editor) {
        ace_text_editor.getSession().setValue(programText);
    } else {
        textarea_editor.value = programText;
    }
}

function editor_get_js_notation_and_then(proc) {
    translate_if_required_and_then(text_editor_get_text(), proc);
}

var editor_get_data = text_editor_get_text;

var editor_set_data = text_editor_set_text;
