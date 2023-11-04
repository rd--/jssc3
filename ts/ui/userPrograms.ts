import { click_input, select_add_keys_as_options, select_add_option_at_id, select_clear_from, select_on_change } from '../kernel/dom.ts'

import { get_file_input_file } from './inputFile.ts'

export type UserPrograms = {
	programs: { [key: string]: string },
	storage_key: string
};

export const userPrograms: UserPrograms = {
	programs: {},
	storage_key: ''
};

export function user_program_menu_init(selectId: string, set_program: (text: string) => void): void {
	const stored = localStorage.getItem(userPrograms.storage_key);
	userPrograms.programs = stored ? JSON.parse(stored) : {};
	select_on_change(selectId, (_menuElement, programName) => set_program(userPrograms.programs[programName]));
	select_add_keys_as_options(selectId, Object.keys(userPrograms.programs));
}

export function user_program_save_to(selectId: string, program_text: string, with_prompt: boolean): void {
	const timeStamp = (new Date()).toISOString();
	const programName = with_prompt ? window.prompt('Set program name', timeStamp) : timeStamp;
	if(programName) {
		userPrograms.programs[programName] = program_text;
		localStorage.setItem(userPrograms.storage_key, JSON.stringify(userPrograms.programs));
		select_add_option_at_id(selectId, programName, programName);
	}
}

export function user_program_clear(selectId: string): void {
	if (window.confirm("Clear user program storage?")) {
		select_clear_from(selectId, 1);
		localStorage.removeItem(userPrograms.storage_key);
	}
}

export function user_storage_sync(selectId: string): void {
	localStorage.setItem(userPrograms.storage_key, JSON.stringify(userPrograms.programs));
	select_clear_from(selectId, 1);
	select_add_keys_as_options(selectId, Object.keys(userPrograms.programs));
}

export function user_program_read_archive(inputId: string, selectId: string): void {
	const jsonFile = get_file_input_file(inputId, 0);
	// console.debug(`user_program_read_archive: ${jsonFile}`);
	if(jsonFile) {
		jsonFile.text().then(function(jsonText) {
			const jsonValue = JSON.parse(jsonText);
			// console.debug(`user_program_read_archive: ${jsonValue}`);
			Object.assign(userPrograms.programs, jsonValue);
			user_storage_sync(selectId);
		});
	} else {
		console.error('user_program_read_archive');
	}
}

// Copy user programs as .json to clipboard
export function user_backup(): void {
	navigator.clipboard.writeText(JSON.stringify(userPrograms.programs));
}

export function user_action_do(actionName: string, selectId: string, inputId: string): boolean {
	switch(actionName) {
		case 'userBackup': user_backup(); return true;
		case 'userClear': user_program_clear(selectId); return true;
		case 'userRestore': click_input(inputId); return true;
		default: return false;
	}
}
