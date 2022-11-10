import { connect_button_to_input, setter_for_inner_html_of, url_get_param } from '../kernel/dom.js'
import { consoleDebug } from '../kernel/error.js'
import { load_utf8_and_then } from '../kernel/io.js'

import { ScsynthWasm } from '../sc3/scsynth-wasm.js'

import { actions_menu_init } from './actions.js'
import { editor } from './editor.js'
import { LoadProc, graph_menu_init } from './graph.js'
import { sc3_mouse_init } from './mouse.js'
import { notation } from './notation.js'
import { user_program_menu_init, user } from './user.js'

export type UiInitOptions = {
	subDir: string,
	hasProgramMenu: boolean,
	hasHelpMenu: boolean,
	hasGuideMenu: boolean,
	hasEssayMenu: boolean,
	fileExt: string | null,
	storageKey: string,
	loadProc: LoadProc,
	initMouse: boolean,
	hardwareBufferSize: number,
	blockSize: number
};

export const defaultUiInitOptions = {
	subDir: '',
	hasProgramMenu: false,
	hasHelpMenu: false,
	hasGuideMenu: false,
	hasEssayMenu: false,
	fileExt: null,
	storageKey: '',
	loadProc: null,
	initMouse: true,
	hardwareBufferSize: 4096,
	blockSize: 48
};

// Id: programMenu, helpMenu, guideMenu, essayMenu ; subDir should be empty or should end with a '/'
export function sc3_ui_init(scsynth: ScsynthWasm, options: UiInitOptions) {
	if(options.hasProgramMenu) {
		graph_menu_init('programMenu', options.subDir + 'graph', options.fileExt, options.loadProc);
		load_utf8_and_then('html/' + options.subDir + 'program-menu.html', setter_for_inner_html_of('programMenu'));
	}
	if(options.hasHelpMenu) {
		graph_menu_init('helpMenu', options.subDir + 'ugen', options.fileExt, options.loadProc);
		load_utf8_and_then('html/' + options.subDir + 'help-menu.html', setter_for_inner_html_of('helpMenu'));
	}
	if(options.hasGuideMenu) {
		graph_menu_init('guideMenu', options.subDir + 'guide', options.fileExt, options.loadProc);
		load_utf8_and_then('html/' + options.subDir + 'guide-menu.html', setter_for_inner_html_of('guideMenu'));
	}
	if(options.hasEssayMenu) {
		graph_menu_init('essayMenu', options.subDir + 'essay', options.fileExt, options.loadProc);
		load_utf8_and_then('html/' + options.subDir + 'essay-menu.html', setter_for_inner_html_of('essayMenu'));
	}
	notation.format = '.stc';
	user.storage_key = options.storageKey;
	user_program_menu_init(editor.set_data);
	actions_menu_init(scsynth, editor.get_selected_text, editor.set_data);
	if(options.initMouse) {
		sc3_mouse_init(scsynth);
	}
	scsynth.options.hardwareBufferSize = options.hardwareBufferSize;
	scsynth.options.blockSize = options.blockSize;
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
