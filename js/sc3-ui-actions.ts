import { prompt_for_int_and_then, select_on_change } from 'sc3-dom.js'
import { load_utf8_and_then } from 'sc3-io.js'
import { scsynth_options } from 'sc3-ui-state.js'
import { user_programs, user_program_clear } from 'sc3-ui-user.js'

export function action_set_hardware_buffer_size(): void {
    prompt_for_int_and_then(
        'Set hardware buffer size',
        scsynth_options.hardwareBufferSize,
        function(aNumber) { scsynth_options.hardwareBufferSize = aNumber; }
    );
}

export function action_set_block_size(): void {
    prompt_for_int_and_then(
        'Set block size',
        scsynth_options.blockSize,
        function(aNumber) { scsynth_options.blockSize = aNumber; }
    );
}

export function action_set_num_inputs(): void {
    prompt_for_int_and_then(
        'Set number of inputs',
        scsynth_options.numInputs,
        function(aNumber) { scsynth_options.numInputs = aNumber; }
    );
}

// Copy user programs as .json to clipboard
export function action_user_backup(): void {
    navigator.clipboard.writeText(JSON.stringify(user_programs));
}

// Click (invisible) file select input.
export function action_user_restore(): void {
    var inputElement = <HTMLInputElement>document.getElementById('userProgramArchiveFile');
    inputElement.click();
}

export function actions_menu_do(editor_get_selected: () => string, editor_set: (aString: string) => void, menuElement: HTMLSelectElement, entryName: string): void {
    console.log('actions_menu_do', entryName);
    switch(entryName) {
    case 'setBlockSize': action_set_block_size(); break;
    case 'setHardwareBufferSize': action_set_hardware_buffer_size(); break;
    case 'setNumInputs': action_set_num_inputs(); break;
    case 'userBackup': action_user_backup(); break;
    case 'userRestore': action_user_restore(); break;
    case 'userPurge': user_program_clear(); break;
    case 'documentVisit': load_utf8_and_then(editor_get_selected(), editor_set); break;
    // case 'midiMpeStart': sc3_midi_mpe_init(); break;
    default: console.error('actions_menu_do: unknown action', entryName);
    }
    menuElement.selectedIndex = 0;
}

export function actions_menu_init(editor_get_selected: () => string, editor_set: (aString: string) => void) {
    select_on_change('actionsMenu', (menuElement, entryName) => actions_menu_do(editor_get_selected, editor_set, menuElement, entryName));
}
