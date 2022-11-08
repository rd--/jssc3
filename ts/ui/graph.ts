import { consoleLogMessageFrom, consoleWarn } from '../kernel/error.js'
import { url_append_timestamp, fetch_url_and_then } from '../kernel/io.js'

import { editor } from './editor.js'
import { resolve_file_type } from './notation.js'

export type LoadProc = (graphDir: string, graphName: string, fileType: string) => void;

export function graph_load(graphDir: string, graphName: string, fileType: string): void {
	const graphFileName = `help/${graphDir}/${graphName}${resolve_file_type(fileType)}`;
	const graphUrl = url_append_timestamp(graphFileName);
	consoleLogMessageFrom('load_graph', graphName);
	fetch_url_and_then(graphUrl, 'text', (programText: string) => editor.set_data(programText));
}

export function graph_menu_init(menuId: string, graphDir: string, fileType: string | null, loadProc: (dir: string, name: string, fileType: string) => void) {
	const menu = document.getElementById(menuId);
	if(menu) {
		menu.addEventListener('change', function(anEvent: Event) {
			const target = <HTMLSelectElement>anEvent.target;
			if(target && target.value) {
				loadProc(graphDir, target.value, resolve_file_type(fileType));
			}
		});
	} else {
		consoleWarn(`graph_menu_init: no element: ${menuId}`);
	}
}

