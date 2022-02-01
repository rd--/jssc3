'use strict';

var user_programs;
var text_editor;

function load_graph(graphDir, graphName, fileType) {
    var graphFileName = 'help/' + graphDir + '/' + graphName + fileType;
    var graphUrl = url_append_timestamp(graphFileName);
    console.log(graphName);
    fetch_url_and_then(graphUrl, 'text', programText => text_editor_set_text(programText));
}

function menu_init(menuId, graphDir, fileType) {
    document.getElementById(menuId).addEventListener('change', e => e.target.value ? load_graph(graphDir, e.target.value, fileType) : null);
}

function user_program_menu_init() {
    var stored = localStorage.getItem('jssc3UserPrograms');
    user_programs = stored ? JSON.parse(stored) : {};
    select_on_change('userMenu', user_program_load);
    select_add_keys_as_options('userMenu', Object.keys(user_programs));
}

function user_program_save_to() {
    var timeStamp = (new Date()).toISOString();
    var programName = window.prompt('Set program name', timeStamp);
    if(programName) {
        user_programs[programName] = text_editor_get_text();
        localStorage.setItem('jssc3UserPrograms', JSON.stringify(user_programs));
        select_add_option('userMenu', programName, programName);
    }
}

function user_program_load(programName) {
    text_editor_set_text(user_programs[programName]);
}

function user_program_clear() {
    if (window.confirm("Clear user program storage?")) {
        select_clear_from('userMenu', 1);
        localStorage.removeItem('jssc3UserPrograms');
    }
}

function sc3_init() {
    menu_init('programMenu', 'graph', '.js');
    menu_init('helpMenu', 'ugen', '.js');
    load_utf8_and_then('html/program-menu.html', set_inner_html_of('programMenu'));
    load_utf8_and_then('html/help-menu.html', set_inner_html_of('helpMenu'));
    user_program_menu_init();
}

function setStatusDisplay(text) {
    var status = document.getElementById('statusText');
    if(status) {
            statusText.innerHTML = text;
    }
}

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

function prettyPrintSyndef() {
    prettyPrintSyndefOf(eval(text_editor_get_text()));
}
