import { clickInput, selectAddKeysAsOptions, selectAddOptionAtId, selectClearFrom, selectOnChange } from '../kernel/dom.ts'

import { getFileInputFile } from './inputFile.ts'

export type UserPrograms = {
	programs: { [key: string]: string },
	storageKey: string
};

export const userPrograms: UserPrograms = {
	programs: {},
	storageKey: ''
};

export function userProgramMenuInit(selectId: string, setProgram: (text: string) => void): void {
	const stored = localStorage.getItem(userPrograms.storageKey);
	userPrograms.programs = stored ? JSON.parse(stored) : {};
	selectOnChange(selectId, (MenuElement, programName) => setProgram(userPrograms.programs[programName]));
	selectAddKeysAsOptions(selectId, Object.keys(userPrograms.programs));
}

export function userProgramSaveTo(selectId: string, programText: string, withPrompt: boolean): void {
	const timeStamp = (new Date()).toISOString();
	const programName = withPrompt ? window.prompt('Set program name', timeStamp) : timeStamp;
	if(programName) {
		userPrograms.programs[programName] = programText;
		localStorage.setItem(userPrograms.storageKey, JSON.stringify(userPrograms.programs));
		selectAddOptionAtId(selectId, programName, programName);
	}
}

export function userProgramClear(selectId: string): void {
	if (window.confirm("Clear user program storage?")) {
		selectClearFrom(selectId, 1);
		localStorage.removeItem(userPrograms.storageKey);
	}
}

export function userStorageSync(selectId: string): void {
	localStorage.setItem(userPrograms.storageKey, JSON.stringify(userPrograms.programs));
	selectClearFrom(selectId, 1);
	selectAddKeysAsOptions(selectId, Object.keys(userPrograms.programs));
}

export function userProgramReadArchive(inputId: string, selectId: string): void {
	const jsonFile = getFileInputFile(inputId, 0);
	// console.debug(`userProgramReadArchive: ${jsonFile}`);
	if(jsonFile) {
		jsonFile.text().then(function(jsonText) {
			const jsonValue = JSON.parse(jsonText);
			// console.debug(`userProgramReadArchive: ${jsonValue}`);
			Object.assign(userPrograms.programs, jsonValue);
			userStorageSync(selectId);
		});
	} else {
		console.error('userProgramReadArchive');
	}
}

// Copy user programs as .json to clipboard
export function userBackup(): void {
	navigator.clipboard.writeText(JSON.stringify(userPrograms.programs));
}

export function userActionDo(actionName: string, selectId: string, inputId: string): boolean {
	switch(actionName) {
		case 'userBackup': userBackup(); return true;
		case 'userClear': userProgramClear(selectId); return true;
		case 'userRestore': clickInput(inputId); return true;
		default: return false;
	}
}
