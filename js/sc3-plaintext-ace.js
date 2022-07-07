// https://ace.c9.io
var sc3_ace;

function sc3_ace_init_in(parentElement) {
	var containerElement = document.createElement('div');
	containerElement.setAttribute('id', 'text_editor');
	parentElement.appendChild(containerElement);
	sc3_ace = ace.edit('text_editor', { wrap: true, indentedSoftWrap: true });
	sc3_ace.setTheme('ace/theme/solarized_light');
	sc3_ace.session.setMode('ace/mode/javascript');
	sc3_ace.setOption('highlightActiveLine', false);
	sc3_ace.renderer.setShowGutter(false);
	sc3_ace.setShowPrintMargin(false);
	consoleDebug('sc3_ace_init: finished');
}

function sc3_ace_init() {
	var parentElement = document.getElementById('jsContainer');
	sc3_ace_init_in(parentElement);
}

function sc3_ace_get_text() {
	return sc3_ace.getValue();
}

function sc3_ace_get_selected_text() {
	var currentText = sc3_ace.getSelectedText();
	if(currentText.trim().length === 0) {
		console.warn('sc3_ace_get_selected_text: empty text');
	}
	return currentText;
}

function sc3_ace_set_text(programText) {
	sc3_ace.getSession().setValue(programText);
}

function editor_get_js_notation_and_then(proc) {
	translate_if_required_and_then(sc3_ace_get_selected_text(), proc);
}
