import { consoleDebug } from '../kernel/error.js'
import { select_add_keys_as_options, select_add_option_at_id, select_clear_from, select_on_change } from '../kernel/dom.js'
import { read_json_file_and_then } from '../kernel/io.js'

import { editor } from './editor.js'

export type User = {
	programs: { [key: string]: string },
	storage_key: string
};

export const user : User = {programs: {}, storage_key: ''};

export function user_program_menu_init(editor_set_program: (text: string) => void): void {
	const stored = localStorage.getItem(user.storage_key);
	user.programs = stored ? JSON.parse(stored) : {};
	select_on_change('userMenu', (_menuElement, programName) => editor_set_program(user.programs[programName]));
	select_add_keys_as_options('userMenu', Object.keys(user.programs));
}

export function user_program_save_to(program_text: string): void {
	const timeStamp = (new Date()).toISOString();
	const programName = window.prompt('Set program name', timeStamp);
	if(programName) {
		user.programs[programName] = program_text;
		localStorage.setItem(user.storage_key, JSON.stringify(user.programs));
		select_add_option_at_id('userMenu', programName, programName);
	}
}

export function user_program_clear(): void {
	if (window.confirm("Clear user program storage?")) {
		select_clear_from('userMenu', 1);
		localStorage.removeItem(user.storage_key);
	}
}

export function user_storage_sync(): void {
	localStorage.setItem(user.storage_key, JSON.stringify(user.programs));
	select_clear_from('userMenu', 1);
	select_add_keys_as_options('userMenu', Object.keys(user.programs));
}

// Id: userProgramArchiveFile ; read selected .json user program archive file.
export function user_program_read_archive(): void {
	const fileInput = <HTMLInputElement>document.getElementById('userProgramArchiveFile');
	const fileList = <FileList>fileInput.files;
	const jsonFile = fileList[0];
	if(fileInput && fileList && jsonFile) {
		consoleDebug(`user_program_read_archive: ${jsonFile}`);
		read_json_file_and_then(jsonFile, function(obj) {
			consoleDebug(`user_program_read_archive: ${obj}`);
			Object.assign(user.programs, obj);
			user_storage_sync();
		});
	} else {
		console.error('user_program_read_archive');
	}
}

export function ui_save_program() {
	user_program_save_to(editor.get_data());
}
