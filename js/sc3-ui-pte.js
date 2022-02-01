'use strict';

var text_editor;

function text_editor_init() {
    text_editor = ace.edit("text_editor", { wrap: true, indentedSoftWrap: true });
    text_editor.setTheme("ace/theme/solarized_light");
    text_editor.session.setMode("ace/mode/javascript");
    text_editor.setOption("highlightActiveLine", false)
    text_editor.renderer.setShowGutter(false);
    text_editor.setShowPrintMargin(false);
};

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
