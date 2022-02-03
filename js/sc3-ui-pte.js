'use strict';

var text_editor;

function text_editor_init() {
    var container = document.getElementById('jsContainer');
    var not_using_ace = typeof ace === 'undefined';
    var editor;
    if(not_using_ace) {
        editor = document.createElement('textarea');
        editor.setAttribute("id", "jsProgram");
        container.appendChild(editor);
    } else {
        editor = document.createElement('div');
        editor.setAttribute("id", "text_editor");
        container.appendChild(editor);
        text_editor = ace.edit("text_editor", { wrap: true, indentedSoftWrap: true });
        text_editor.setTheme("ace/theme/solarized_light");
        text_editor.session.setMode("ace/mode/javascript");
        text_editor.setOption("highlightActiveLine", false);
        text_editor.renderer.setShowGutter(false);
        text_editor.setShowPrintMargin(false);
    }
}

function text_editor_get_text() {
    if(text_editor) {
        return text_editor.getValue();
    } else {
        return document.getElementById('jsProgram').value;
    }
}

function text_editor_set_text(programText) {
    // console.log('text_editor_set_text', programText);
    if(text_editor) {
        text_editor.getSession().setValue(programText);
    } else {
        document.getElementById('jsProgram').value = programText;
    }
}

var editor_get_data = text_editor_get_text;

var editor_set_data = text_editor_set_text;
