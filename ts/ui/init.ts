import { connect_button_to_input, setter_for_inner_html_of, url_get_param } from '../kernel/dom.js'
import { consoleDebug } from '../kernel/error.js'
import { load_utf8_and_then } from '../kernel/io.js'

import { Scsynth } from '../sc3/scsynth.js'

import { actions_menu_init } from './actions.js'
import { editor } from './editor.js'
import { LoadProc, graph_menu_init } from './graph.js'
import { sc3_mouse_init } from './mouse.js'
import { notation } from './notation.js'
import { user_program_menu_init, user } from './user.js'

// Id: programMenu, helpMenu, guideMenu, essayMenu ; subDir should be empty or should end with a '/'
export function sc3_ui_init(scsynth: Scsynth, subDir: string, hasProgramMenu: boolean, hasHelpMenu: boolean, hasGuideMenu: boolean, hasEssayMenu: boolean, fileExt: string, storageKey: string, loadProc: LoadProc, initMouse: boolean, hardwareBufferSize: number, blockSize: number) {
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
	notation.format = '.stc';
	user.storage_key = storageKey;
	user_program_menu_init(editor.set_data);
	actions_menu_init(editor.get_selected_text, editor.set_data);
	if(initMouse) {
		sc3_mouse_init();
	}
	scsynth.options.hardwareBufferSize = hardwareBufferSize;
	scsynth.options.blockSize = blockSize;
}

// Id: programInputFileSelect, programInputFile
export function jssc3_init(fileNameParamKey: string, defaultFileName: string, codeParamKey: string) {
	const fileName = url_get_param(fileNameParamKey) || defaultFileName;
	const code = codeParamKey ? url_get_param(codeParamKey) : null;
	connect_button_to_input('programInputFileSelect', 'programInputFile');
	consoleDebug(`jssc3_init: ${fileName}, ${code}`);
	if(fileName) {
		load_utf8_and_then(fileName , editor.set_data);
	}
	if(code) {
		editor.set_data(code);
	}
}
