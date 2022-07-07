import { consoleDebug } from './sc3-error.js'
import { select_add_keys_as_options, select_add_option_at_id, select_clear_from, select_on_change } from './sc3-dom.js'
import { read_json_file_and_then } from './sc3-io.js'

export var user_programs: { [key: string]: string };
export var user_storage_key: string;

export function user_program_menu_init(editor_set_program: (text: string) => void): void {
	var stored = localStorage.getItem(user_storage_key);
	user_programs = stored ? JSON.parse(stored) : {};
	select_on_change('userMenu', (menuElement, programName) => editor_set_program(user_programs[programName]));
	select_add_keys_as_options('userMenu', Object.keys(user_programs));
}

export function user_program_save_to(program_text: string): void {
	var timeStamp = (new Date()).toISOString();
	var programName = window.prompt('Set program name', timeStamp);
	if(programName) {
		user_programs[programName] = program_text;
		localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
		select_add_option_at_id('userMenu', programName, programName);
	}
}

export function user_program_clear(): void {
	if (window.confirm("Clear user program storage?")) {
		select_clear_from('userMenu', 1);
		localStorage.removeItem(user_storage_key);
	}
}

export function user_storage_sync(): void {
	localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
	select_clear_from('userMenu', 1);
	select_add_keys_as_options('userMenu', Object.keys(user_programs));
}

// Read selected .json user program archive file.
export function user_program_read_archive(): void {
	var fileInput = <HTMLInputElement>document.getElementById('userProgramArchiveFile');
	var fileList = <FileList>fileInput.files;
	var jsonFile = fileList[0];
	if(fileInput && fileList && jsonFile) {
		consoleDebug('user_program_read_archive', jsonFile);
		read_json_file_and_then(jsonFile, function(obj) {
			consoleDebug('user_program_read_archive', obj);
			Object.assign(user_programs, obj);
			user_storage_sync();
		});
	} else {
		console.error('user_program_read_archive');
	}
}
