import { prompt_for_int_and_then, select_on_change } from '../kernel/dom.js'
import { load_utf8_and_then } from '../kernel/io.js'

import { ScsynthWasm } from '../sc3/scsynth-wasm.js'

import { user, user_program_clear } from './user.js'

// Copy user programs as .json to clipboard
export function action_user_backup(): void {
	navigator.clipboard.writeText(JSON.stringify(user.programs));
}

// Id: userProgramArchiveFile ; click (invisible) file select input
export function action_user_restore(): void {
	const inputElement = <HTMLInputElement>document.getElementById('userProgramArchiveFile');
	inputElement.click();
}

function action_set_hardware_buffer_size(scsynth: ScsynthWasm): void {
	prompt_for_int_and_then(
		'Set hardware buffer size',
		scsynth.options.hardwareBufferSize,
		function(aNumber) { scsynth.options.hardwareBufferSize = aNumber; }
	);
}

function action_set_block_size(scsynth: ScsynthWasm): void {
	prompt_for_int_and_then(
		'Set block size',
		scsynth.options.blockSize,
		function(aNumber) { scsynth.options.blockSize = aNumber; }
	);
}

function action_set_num_inputs(scsynth: ScsynthWasm): void {
	prompt_for_int_and_then(
		'Set number of inputs',
		scsynth.options.numInputs,
		function(aNumber) { scsynth.options.numInputs = aNumber; }
	);
}

export function actions_menu_do(
	scsynth: ScsynthWasm,
	editor_get_selected: () => string,
	editor_set: (aString: string) => void,
	menuElement: HTMLSelectElement, entryName: string
): void {
	console.log('actions_menu_do', entryName);
	switch(entryName) {
		case 'setBlockSize': action_set_block_size(scsynth); break;
		case 'setHardwareBufferSize': action_set_hardware_buffer_size(scsynth); break;
		case 'setNumInputs': action_set_num_inputs(scsynth); break;
		case 'userBackup': action_user_backup(); break;
		case 'userRestore': action_user_restore(); break;
		case 'userPurge': user_program_clear(); break;
		case 'documentVisit': load_utf8_and_then(editor_get_selected(), editor_set); break;
		// case 'midiMpeStart': sc3_midi_mpe_init(); break;
		default: console.error('actions_menu_do: unknown action', entryName);
	}
	menuElement.selectedIndex = 0;
}

export function actions_menu_init(scsynth: ScsynthWasm, editor_get_selected: () => string, editor_set: (aString: string) => void) {
	select_on_change('actionsMenu', (menuElement, entryName) => actions_menu_do(scsynth, editor_get_selected, editor_set, menuElement, entryName));
}
