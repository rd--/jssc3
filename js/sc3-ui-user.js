var user_programs;
var user_storage_key;

function user_program_menu_init() {
    var stored = localStorage.getItem(user_storage_key);
    user_programs = stored ? JSON.parse(stored) : {};
    select_on_change('userMenu', user_program_load);
    select_add_keys_as_options('userMenu', Object.keys(user_programs));
}

function user_program_save_to() {
    var timeStamp = (new Date()).toISOString();
    var programName = window.prompt('Set program name', timeStamp);
    if(programName) {
        user_programs[programName] = editor_get_data();
        localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
        select_add_option_at_id('userMenu', programName, programName);
    }
}

function user_program_load(programName) {
    editor_set_data(user_programs[programName]);
}

function user_program_clear() {
    if (window.confirm("Clear user program storage?")) {
        select_clear_from('userMenu', 1);
        localStorage.removeItem(user_storage_key);
    }
}

function user_storage_sync() {
    localStorage.setItem(user_storage_key, JSON.stringify(user_programs));
    select_clear_from('userMenu', 1);
    select_add_keys_as_options('userMenu', Object.keys(user_programs));
}

// Read selected .json user program archive file.
function user_program_read_archive() {
    var jsonFile = document.getElementById('userProgramArchiveFile').files[0];
    consoleDebug('user_program_read_archive', jsonFile);
    if (jsonFile) {
        read_json_file_and_then(jsonFile, function(obj) {
            consoleDebug('user_program_read_archive', obj);
            Object.assign(user_programs, obj);
            user_storage_sync();
        });
    }
}
