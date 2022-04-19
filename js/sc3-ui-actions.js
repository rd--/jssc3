function action_set_hardware_buffer_size() {
    var replyText = window.prompt('Set hardware buffer size', String(scsynth_hardware_buffer_size));
    if(replyText) {
        scsynth_block_size = parse_int_or_alert(replyText, 'Hardware buffer size not an integer', scsynth_hardware_buffer_size);
    }
}

function action_set_block_size() {
    var replyText = window.prompt('Set block size', String(scsynth_block_size));
    if(replyText) {
        scsynth_block_size = parse_int_or_alert(replyText, 'Block size not an integer', scsynth_block_size);
    }
}

function action_set_num_inputs() {
    var replyText = window.prompt('Set number of inputs', String(scsynth_num_inputs));
    if(replyText) {
        scsynth_num_inputs = parse_int_or_alert(replyText, 'Number of inputs not an integer', scsynth_num_inputs);
    }
}

// Copy user programs as .json to clipboard
function action_user_backup() {
    navigator.clipboard.writeText(JSON.stringify(user_programs));
}

// Click (invisible) file select input.
function action_user_restore() {
    document.getElementById('userProgramArchiveFile').click();
}

function actions_menu_do(menu, entryName) {
    console.log('actions_menu_do', entryName);
    switch(entryName) {
    case 'setBlockSize': action_set_block_size(); break;
    case 'setHardwareBufferSize': action_set_hardware_buffer_size(); break;
    case 'setNumInputs': action_set_num_inputs(); break;
    case 'userBackup': action_user_backup(); break;
    case 'userRestore': action_user_restore(); break;
    case 'userPurge': user_program_clear(); break;
    case 'documentVisit': load_utf8_and_then(text_editor_get_selected_text(), editor_set_data); break;
    case 'midiMpeStart': sc3_midi_mpe_init(); break;
    default: console.error('actions_menu_do: unknown action', entryName);
    }
    menu.selectedIndex = 0;
}

function actions_menu_init() {
    var menu = document.getElementById('actionsMenu');
    if(menu) {
        menu.addEventListener('change', e => e.target.value ? actions_menu_do(menu, e.target.value) : null);
    }
}
