'use strict';

function fetch_text_file(url) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', () => document.getElementById('jsProgram').value = request.response);
    request.open('GET', url)
    request.send();
}

// Append timestamp to URL to defeat cache
function append_timestamp(url) {
    var ext = ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime();
    return url + ext;
}

function load_graph(graphDir, graphName, fileType) {
    var graphUrl = 'help/' + graphDir + '/' + graphName + fileType;
    console.log(graphUrl);
    fetch_text_file(append_timestamp(graphUrl));
}

function menu_init(menuId, graphDir, fileType) {
    document.getElementById(menuId).addEventListener('change', e => e.target.value ? load_graph(graphDir, e.target.value, fileType) : null);
}

// Function to return a function to set the innerHTML of elemId
function set_inner_html_of(elemId) {
    var selectElem = document.getElementById(elemId);
    return function(innerHtml) {
        selectElem.innerHTML = innerHtml;
    }
}

// Throw error if response status is not .ok
function handle_fetch_error(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Log error and return default value
function log_error_and_return(from, reason, defaultValue) {
    console.debug(from, ': ', reason);
    return defaultValue;
}

// Fetch fileName and apply processFunc to the text read (stored as UTF-8).
function load_and_process_utf8(fileName, processFunc) {
    fetch(fileName, { cache: 'no-cache' })
        .then(response => handle_fetch_error(response))
        .then(response => response.text())
        .then(text => processFunc(text))
        .catch(reason => processFunc(log_error_and_return('utf8', reason, '')));
}

function sc3_init() {
    menu_init('programsMenu', 'graph', '.js');
    menu_init('helpMenu', 'ugen', '.js');
    load_and_process_utf8('html/graph-menu.html', set_inner_html_of('programsMenu'));
    load_and_process_utf8('html/help-menu.html', set_inner_html_of('helpMenu'));
}
