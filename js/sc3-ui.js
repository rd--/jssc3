'use strict';

function load_graph(graphDir, graphName, fileType) {
    var graphFileName = 'help/' + graphDir + '/' + graphName + fileType;
    var graphUrl = url_append_timestamp(graphFileName);
    console.log(graphName);
    fetch_url_and_then(graphUrl, 'text', programText => document.getElementById('jsProgram').value = programText);
}

function menu_init(menuId, graphDir, fileType) {
    document.getElementById(menuId).addEventListener('change', e => e.target.value ? load_graph(graphDir, e.target.value, fileType) : null);
}

function sc3_init() {
    menu_init('programsMenu', 'graph', '.js');
    menu_init('helpMenu', 'ugen', '.js');
    load_utf8_and_then('html/graph-menu.html', set_inner_html_of('programsMenu'));
    load_utf8_and_then('html/help-menu.html', set_inner_html_of('helpMenu'));
}
