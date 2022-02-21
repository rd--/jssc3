'use strict';

var user_programs;
var user_storage_key;
var notation_format;
var scsynth_block_size;

function resolve_file_type(fileType) {
    return fileType ? fileType : notation_format;
}

function load_graph(graphDir, graphName, fileType) {
    var graphFileName = 'help/' + graphDir + '/' + graphName + resolve_file_type(fileType);
    var graphUrl = url_append_timestamp(graphFileName);
    console.log(graphName);
    fetch_url_and_then(graphUrl, 'text', programText => text_editor_set_text(programText));
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

function action_set_block_size() {
    var blockSizeText = window.prompt('Set block size', String(scsynth_block_size));
    if(blockSizeText) {
        var blockSize = Number.parseInt(blockSizeText, 10);
        if(blockSize) {
            scsynth_block_size = blockSize;
        } else {
            window.alert('Block size not an integer: ' + blockSizeText);
        }
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
    // console.log('user_program_read_archive', jsonFile);
    if (jsonFile) {
        read_json_file_and_then(jsonFile, function(obj) {
            // console.log('user_program_read_archive', obj);
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
    case 'userBackup': action_user_backup(); break;
    case 'userRestore': action_user_restore(); break;
    case 'userPurge': user_program_clear(); break;
    case 'startMpeMidi': sc3_midi_mpe_init(); break;
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

function sc3_ui_init(hasProgramMenu, hasHelpMenu, hasGuideMenu, hasEssayMenu, fileExt, storageKey, loadProc, initMouse, blockSize) {
    if(hasProgramMenu) {
        menu_init('programMenu', 'graph', fileExt, loadProc);
        load_utf8_and_then('html/program-menu.html', setter_for_inner_html_of('programMenu'));
    }
    if(hasHelpMenu) {
        menu_init('helpMenu', 'ugen', fileExt, loadProc);
        load_utf8_and_then('html/help-menu.html', setter_for_inner_html_of('helpMenu'));
    }
    if(hasGuideMenu) {
        menu_init('guideMenu', 'guide', fileExt, loadProc);
        load_utf8_and_then('html/guide-menu.html', setter_for_inner_html_of('guideMenu'));
    }
    if(hasEssayMenu) {
        menu_init('essayMenu', 'essay', fileExt, loadProc);
        load_utf8_and_then('html/essay-menu.html', setter_for_inner_html_of('essayMenu'));
    }
    user_storage_key = storageKey;
    notation_format = '.stc';
    user_program_menu_init();
    actions_menu_init();
    if(initMouse) {
        sc3_mouse_init();
    }
    scsynth_block_size = blockSize;
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
