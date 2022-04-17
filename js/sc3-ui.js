'use strict';

var user_programs;
var user_storage_key;
var notation_format;
var scsynth_hardware_buffer_size;
var scsynth_block_size;
var scsynth_num_inputs;
var scsynth_num_outputs;

function resolve_file_type(fileType) {
    return fileType ? fileType : notation_format;
}

function load_graph(graphDir, graphName, fileType) {
    var graphFileName = 'help/' + graphDir + '/' + graphName + resolve_file_type(fileType);
    var graphUrl = url_append_timestamp(graphFileName);
    console.log(graphName);
    fetch_url_and_then(graphUrl, 'text', programText => editor_set_data(programText));
}

function menu_init(menuId, graphDir, fileType, loadProc) {
    var menu = document.getElementById(menuId);
    if(menu) {
        menu.addEventListener('change', e => e.target.value ? loadProc(graphDir, e.target.value, resolve_file_type(fileType)) : null);
    } else {
        console.warn('menu_init: no element', menuId);
    }
}

function user_program_menu_init() {
    var stored = localStorage.getItem(user_storage_key);
    user_programs = stored ? JSON.parse(stored) : {};
    select_on_change('userMenu', user_program_load);
    select_add_keys_as_options('userMenu', Object.keys(user_programs));
}

function user_program_save_to() {
    var timeStamp = (new Date()).toISOString();
    var programName = window.prompt('Set program name', timeStamp);
    if(programName) {
        user_programs[programName] = editor_get_data();
        localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
        select_add_option_at_id('userMenu', programName, programName);
    }
}

function user_program_load(programName) {
    editor_set_data(user_programs[programName]);
}

function user_program_clear() {
    if (window.confirm("Clear user program storage?")) {
        select_clear_from('userMenu', 1);
        localStorage.removeItem(user_storage_key);
    }
}

function parse_int_or_alert(integerText, errorText, defaultAnswer) {
    var answer = Number.parseInt(integerText, 10);
    if(isNaN(answer)) {
        window.alert(errorText);
        return defaultAnswer;
    } else {
        return answer;
    }
}

function action_set_hardware_buffer_size() {
    var replyText = window.prompt('Set hardware buffer size', String(scsynth_hardware_buffer_size));
    if(replyText) {
        scsynth_block_size = parse_int_or_alert(replyText, 'Hardware buffer size not an integer', scsynth_hardware_buffer_size);
    }
}

function action_set_block_size() {
    var replyText = window.prompt('Set block size', String(scsynth_block_size));
    if(replyText) {
        scsynth_block_size = parse_int_or_alert(replyText, 'Block size not an integer', scsynth_block_size);
    }
}

function action_set_num_inputs() {
    var replyText = window.prompt('Set number of inputs', String(scsynth_num_inputs));
    if(replyText) {
        scsynth_num_inputs = parse_int_or_alert(replyText, 'Number of inputs not an integer', scsynth_num_inputs);
    }
}

// Copy user programs as JSON to clipboard
function action_user_backup() {
    navigator.clipboard.writeText(JSON.stringify(user_programs));
}

function user_storage_sync() {
    localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
    select_clear_from('userMenu', 1);
    select_add_keys_as_options('userMenu', Object.keys(user_programs));
}

// Read selected .json user program archive file.
function user_program_read_archive() {
    var jsonFile = document.getElementById('userProgramArchiveFile').files[0];
    console.debug('user_program_read_archive', jsonFile);
    if (jsonFile) {
        read_json_file_and_then(jsonFile, function(obj) {
            console.debug('user_program_read_archive', obj);
            Object.assign(user_programs, obj);
            user_storage_sync();
        });
    }
}

// Click (invisible) file select input.
function action_user_restore() {
    document.getElementById('userProgramArchiveFile').click();
}

function actions_menu_do(menu, entryName) {
    console.log('actions_menu_do', entryName);
    switch(entryName) {
    case 'setBlockSize': action_set_block_size(); break;
    case 'setHardwareBufferSize': action_set_hardware_buffer_size(); break;
    case 'setNumInputs': action_set_num_inputs(); break;
    case 'userBackup': action_user_backup(); break;
    case 'userRestore': action_user_restore(); break;
    case 'userPurge': user_program_clear(); break;
    case 'documentVisit': load_utf8_and_then(text_editor_get_selected_text(), editor_set_data); break;
    case 'midiMpeStart': sc3_midi_mpe_init(); break;
    default: console.error('actions_menu_do: unknown action', entryName);
    }
    menu.selectedIndex = 0;
}

function actions_menu_init() {
    var menu = document.getElementById('actionsMenu');
    if(menu) {
        menu.addEventListener('change', e => e.target.value ? actions_menu_do(menu, e.target.value) : null);
    }
}

function set_notation_format() {
    var notationFormat = document.getElementById('notationFormat');
    notation_format = notationFormat.value;
    console.log('set_notation_format', notation_format);
}

// subDir should be empty or should end with a '/'
function sc3_ui_init(subDir, hasProgramMenu, hasHelpMenu, hasGuideMenu, hasEssayMenu, fileExt, storageKey, loadProc, initMouse, hardwareBufferSize, blockSize) {
    if(hasProgramMenu) {
        menu_init('programMenu', subDir + 'graph', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'program-menu.html', setter_for_inner_html_of('programMenu'));
    }
    if(hasHelpMenu) {
        menu_init('helpMenu', subDir + 'ugen', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'help-menu.html', setter_for_inner_html_of('helpMenu'));
    }
    if(hasGuideMenu) {
        menu_init('guideMenu', subDir + 'guide', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'guide-menu.html', setter_for_inner_html_of('guideMenu'));
    }
    if(hasEssayMenu) {
        menu_init('essayMenu', subDir + 'essay', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'essay-menu.html', setter_for_inner_html_of('essayMenu'));
    }
    user_storage_key = storageKey;
    notation_format = '.stc';
    user_program_menu_init();
    actions_menu_init();
    if(initMouse) {
        sc3_mouse_init();
    }
    scsynth_hardware_buffer_size = hardwareBufferSize;
    scsynth_block_size = blockSize;
    scsynth_num_inputs = 0;
    scsynth_num_outputs = 2;
}

function setStatusDisplay(text) {
    var status = document.getElementById('statusText');
    if(status) {
        statusText.innerHTML = text;
    } else {
        console.log(text);
    }
}

function translate_if_required_and_then(userText, proc) {
    switch(notation_format) {
    case '.js': proc(userText); break;
    case '.stc': stc_to_js_and_then(userText, proc); break;
    default: console.error('translate_if_required_and_then: unknown format', notation_format);
    }
}

function prettyPrintSyndef() {
    editor_get_js_notation_and_then(function(programText) {
        prettyPrintSyndefOf(eval(programText));
    });
}

function evalJsProgram() {
    editor_get_js_notation_and_then(function(programText) {
        var result = eval(programText);
        console.log(result);
    });
}

function playJsProgram() {
    editor_get_js_notation_and_then(function(programText) {
        var result = eval(programText);
        playUgen(result);
    });
}

// Sets the 's' url parameter of the window to the encdoded form of the selected text.
function set_url_to_encode_selection() {
    window_url_set_param('s', text_editor_get_selected_text());
}

function ui_boot_scsynth() {
    bootScsynth(scsynth_num_inputs, scsynth_num_outputs, scsynth_hardware_buffer_size, scsynth_block_size);
}
