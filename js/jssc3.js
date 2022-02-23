'use strict';

function jssc3_read_input_program() {
    read_text_file_from_file_input_and_then('programInputFile', 0, text_editor_set_text);
}

function jssc3_init(fileParamKey, defaultFileName) {
    var fileName = url_get_param(fileParamKey) || defaultFileName;
    connect_button_to_input('programInputFileSelect', 'programInputFile');
    if(fileName) {
        load_utf8_and_then(fileName , editor_set_data);
    }
}
