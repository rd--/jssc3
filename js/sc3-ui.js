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

// subDir should be empty or should end with a '/'
function sc3_ui_init(scsynth, subDir, hasProgramMenu, hasHelpMenu, hasGuideMenu, hasEssayMenu, fileExt, storageKey, loadProc, initMouse, hardwareBufferSize, blockSize) {
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
	user_program_menu_init(editor_set_data);
	actions_menu_init(editor_get_selected_text, editor_set_data);
	if(initMouse) {
		sc3_mouse_init();
	}
	scsynth.options.hardwareBufferSize = hardwareBufferSize;
	scsynth.options.blockSize = blockSize;
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

function playJsProgram(scsynth) {
	editor_get_js_notation_and_then(function(programText) {
		var result = eval(programText);
		playUgen(scsynth, result);
	});
}

// Sets the 's' url parameter of the window to the encoded form of the selected text.
function set_url_to_encode_selection() {
	window_url_set_param('s', editor_get_selected_text());
}

function ui_save_program() {
	user_program_save_to(editor_get_data());
}
