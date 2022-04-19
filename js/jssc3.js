'use strict';

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
