'use strict';

// https://ace.c9.io
var ui_pte_ace;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
var ui_pte_textarea;

function ui_pte_ace_init(parentElement) {
    var containerElement = document.createElement('div');
    containerElement.setAttribute('id', 'text_editor');
    parentElement.appendChild(containerElement);
    ui_pte_ace = ace.edit('text_editor', { wrap: true, indentedSoftWrap: true });
    ui_pte_ace.setTheme('ace/theme/solarized_light');
    ui_pte_ace.session.setMode('ace/mode/javascript');
    ui_pte_ace.setOption('highlightActiveLine', false);
    ui_pte_ace.renderer.setShowGutter(false);
    ui_pte_ace.setShowPrintMargin(false);
    console.debug('ui_pte_ace_init: finished');
}

function ui_pte_textarea_init(parentElement) {
    ui_pte_textarea = document.createElement('textarea');
    ui_pte_textarea.setAttribute("id", "jsProgram");
    parentElement.appendChild(ui_pte_textarea);
    console.debug('ui_pte_textarea_init: finished');
}

function ui_pte_init() {
    var parentElement = document.getElementById('jsContainer');
    var useAce = typeof ace !== 'undefined';
    if(useAce) {
        ui_pte_ace_init(parentElement);
    }  else {
        ui_pte_textarea_init(parentElement);
    }
}

// Get editor text (complete text, for storage)
function ui_pte_get_text() {
    var editorText = ui_pte_ace ? ui_pte_ace.getValue() : ui_pte_textarea.value;
    console.debug('ui_pte_get_text', editorText);
    return editorText;
}

// Get selected text, or all text if there is no selection.
function ui_pte_get_selected_text() {
    var currentText = ui_pte_ace ? ui_pte_ace.getValue() : textarea_get_selection_or_contents(ui_pte_textarea);
    console.debug('ui_pte_get_selected_text', currentText);
    if(currentText.trim().length === 0) {
        console.warn('ui_pte_get_selected_text: empty text');
    }
    return currentText;
}

function ui_pte_set_text(programText) {
    if(ui_pte_ace) {
        ui_pte_ace.getSession().setValue(programText);
    } else {
        ui_pte_textarea.value = programText;
    }
}

function editor_get_js_notation_and_then(proc) {
    translate_if_required_and_then(ui_pte_get_selected_text(), proc);
}

var text_editor_get_selected_text = ui_pte_get_selected_text;

var editor_get_data = ui_pte_get_text;

var editor_set_data = ui_pte_set_text;
