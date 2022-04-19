var notation_format;
var scsynth_hardware_buffer_size;
var scsynth_block_size;
var scsynth_num_inputs;
var scsynth_num_outputs;

function resolve_file_type(fileType) {
    return fileType ? fileType : notation_format;
}

function graph_load(graphDir, graphName, fileType) {
    var graphFileName = 'help/' + graphDir + '/' + graphName + resolve_file_type(fileType);
    var graphUrl = url_append_timestamp(graphFileName);
    consoleLogMessageFrom('load_graph', graphName);
    fetch_url_and_then(graphUrl, 'text', programText => editor_set_data(programText));
}

function graph_menu_init(menuId, graphDir, fileType, loadProc) {
    var menu = document.getElementById(menuId);
    if(menu) {
        menu.addEventListener('change', e => e.target.value ? loadProc(graphDir, e.target.value, resolve_file_type(fileType)) : null);
    } else {
        consoleWarn('graph_menu_init: no element', menuId);
    }
}

function set_notation_format() {
    var notationFormat = document.getElementById('notationFormat');
    notation_format = notationFormat.value;
    consoleLogMessageFrom('set_notation_format', notation_format);
}

// subDir should be empty or should end with a '/'
function sc3_ui_init(subDir, hasProgramMenu, hasHelpMenu, hasGuideMenu, hasEssayMenu, fileExt, storageKey, loadProc, initMouse, hardwareBufferSize, blockSize) {
    if(hasProgramMenu) {
        graph_menu_init('programMenu', subDir + 'graph', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'program-menu.html', setter_for_inner_html_of('programMenu'));
    }
    if(hasHelpMenu) {
        graph_menu_init('helpMenu', subDir + 'ugen', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'help-menu.html', setter_for_inner_html_of('helpMenu'));
    }
    if(hasGuideMenu) {
        graph_menu_init('guideMenu', subDir + 'guide', fileExt, loadProc);
        load_utf8_and_then('html/' + subDir + 'guide-menu.html', setter_for_inner_html_of('guideMenu'));
    }
    if(hasEssayMenu) {
        graph_menu_init('essayMenu', subDir + 'essay', fileExt, loadProc);
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
    default: consoleError('translate_if_required_and_then: unknown format', notation_format);
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
