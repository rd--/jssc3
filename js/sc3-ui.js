'use strict';

var user_programs;
var user_storage_key;

function load_graph(graphDir, graphName, fileType) {
    var graphFileName = 'help/' + graphDir + '/' + graphName + fileType;
    var graphUrl = url_append_timestamp(graphFileName);
    console.log(graphName);
    fetch_url_and_then(graphUrl, 'text', programText => text_editor_set_text(programText));
}

function menu_init(menuId, graphDir, fileType) {
    var menu = document.getElementById(menuId);
    if(menu) {
        menu.addEventListener('change', e => e.target.value ? load_graph(graphDir, e.target.value, fileType) : null);
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
        user_programs[programName] = text_editor_get_data();
        localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
        select_add_option('userMenu', programName, programName);
    }
}

function user_program_load(programName) {
    text_editor_set_data(user_programs[programName]);
}

function user_program_clear() {
    if (window.confirm("Clear user program storage?")) {
        select_clear_from('userMenu', 1);
        localStorage.removeItem(user_storage_key);
    }
}

function action_user_backup() {
    navigator.clipboard.writeText(JSON.stringify(user_programs));
}

function action_user_restore() {
    console.warn('actions_user_restore: not implemented');
}

function actions_menu_do(menu, entryName) {
    console.log('actions_menu_do', entryName);
    switch(entryName) {
    case 'userBackup': action_user_backup(); break;
    case 'userRestore': action_user_restore(); break;
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

function sc3_init(hasProgramMenu, hasHelpMenu, storageKey) {
    if(hasProgramMenu) {
        menu_init('programMenu', 'graph', '.js');
        load_utf8_and_then('html/program-menu.html', set_inner_html_of('programMenu'));
    }
    if(hasHelpMenu) {
        menu_init('helpMenu', 'ugen', '.js');
        load_utf8_and_then('html/help-menu.html', set_inner_html_of('helpMenu'));
    }
    user_storage_key = storageKey;
    user_program_menu_init();
    actions_menu_init();
}

function setStatusDisplay(text) {
    var status = document.getElementById('statusText');
    if(status) {
        statusText.innerHTML = text;
    } else {
        console.log(text);
    }
}

function prettyPrintSyndef() {
    prettyPrintSyndefOf(eval(text_editor_get_text()));
}
