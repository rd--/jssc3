'use strict';

var editor_get_selected_text;
var editor_get_data;
var editor_set_data;

function jssc3_read_input_program() {
    read_text_file_from_file_input_and_then('programInputFile', 0, editor_set_data);
}

function jssc3_init(fileNameParamKey, defaultFileName, codeParamKey) {
    var fileName = url_get_param(fileNameParamKey) || defaultFileName;
    var code = codeParamKey ? url_get_param(codeParamKey) : null;
    connect_button_to_input('programInputFileSelect', 'programInputFile');
    consoleDebug('jssc3_init', fileName, code);
    if(fileName) {
        load_utf8_and_then(fileName , editor_set_data);
    }
    if(code) {
        editor_set_data(code);
    }
}

function jssc3_plaintext_init(parentId) {
    sc3_plaintext_init_in(parentId);
    editor_get_selected_text = sc3_plaintext_get_selected_text;
    editor_get_data = sc3_plaintext_get_complete_text;
    editor_set_data = sc3_plaintext_set_text;
}

function jssc3_superscript_init() {
    sc3_superscript_init();
    editor_get_selected_text = sc3_superscript_get_selected_text;
    editor_get_data = sc3_superscript_get_html;
    editor_set_data = sc3_superscript_set_html;
}

function jssc3_supercalc_init(numCol, numRow) {
    sc3_supercalc_init (numCol, numRow);
    editor_get_selected_text = function() => '';
    editor_get_data = sc3_supercalc_get_json;
    editor_set_data = sc3_supercalc_set_json;
}
