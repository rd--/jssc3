'use strict';

function jssc3_read_input_program() {
    read_text_file_from_file_input_and_then('programInputFile', 0, text_editor_set_text);
}

function jssc3_init() {
    connect_button_to_input('programInputFileSelect', 'programInputFile');
}
