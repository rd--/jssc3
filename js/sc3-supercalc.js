'use strict';

var sc3_supercalc_num_col;
var sc3_supercalc_num_row;
var sc3_supercalc_bus_offset;
var sc3_supercalc_data;

// eval_or_zero('referenceToUndefinedName')
function eval_or_zero(text) {
    if(text == "") {
        return 0;
    } else {
        try {
            return eval(text);
        } catch (e) {
            console.log('eval_or_zero: error!');
            return 0;
        }
    }
}

function sc3_supercalc_eval_cell(col, row, cell_text) {
    stc_to_js_and_then(cell_text, function (js_text) {
        var cell_value = js_text === "" ? 0 : eval_or_zero(js_text);
        var cell_ugen = isNumber(cell_value) ? DC(cell_value) : cell_value;
        var cell_packet = sc3_supercalc_cell_ugen_to_osc_packet(col, row, cell_ugen);
        console.debug('sc3_supercalc_eval_cell', col, row, '"' + cell_text + '"', '"' + js_text + '"');
        sendOsc(cell_packet);
    });
}

function sc3_supercalc_on_change (instance, cell, col, row, cell_text) {
    var col_letter = sc3_supercalc_col_letter(Number(col));
    var row_number = Number(row) + 1;
    console.debug('sc3_supercalc_on_change', col_letter, row_number, cell_text);
    sc3_supercalc_eval_cell(col_letter, row_number, cell_text.trim());
}

function sc3_supercalc_init (numCol, numRow) {
    sc3_supercalc_data = arrayReplicate(numCol, arrayReplicate(numRow, ''));
    sc3_supercalc_num_col = numCol;
    sc3_supercalc_num_row = numRow;
    sc3_supercalc_bus_offset = 24;
    jspreadsheet(document.getElementById('sc3_supercalc'), {
        data: sc3_supercalc_data,
        columns: arrayReplicate(numCol, { type: 'text', width: 200 }),
        onchange: sc3_supercalc_on_change,
        allowInsertRow: false,
        allowInsertColumn: false,
        defaultColAlign:'left'
    });
}

// sc3_supercalc_col_letter(6) === 'g'
function sc3_supercalc_col_letter(col) {
    if(isNumber(col)) {
        var str = String.fromCharCode(col + 97);
        console.debug('sc3_supercalc_col_letter', col, '"' + str + '"');
        return str;
    } else {
        console.error('sc3_supercalc_col_letter: not a number?', col);
    }
}

// sc3_supercalc_cellref_to_bus('a', 1)
function sc3_supercalc_cellref_to_bus(col, row) {
    console.debug('sc3_supercalc_cellref_to_bus', col, row);
    var col_code = col.charCodeAt(0) - 97;
    return sc3_supercalc_bus_offset + ((row - 1) * sc3_supercalc_num_col) + col_code;
}

// sc3_supercalc_gen_cell_reader_bus_declaration('a', 1)
function sc3_supercalc_gen_cell_reader_bus_declaration(col, row) {
    return ('var ' + col + String(row) + ' = InFeedback(1, ' + String(sc3_supercalc_cellref_to_bus(col, row)) + ');');
}

// sc3_supercalc_define_cell_variables(8, 8)
function sc3_supercalc_define_cell_variables(numCol, numRow) {
    for(var j = 1; j <= numRow; j++) {
        for(var i = 0; i < numCol; i++) {
            var code_text = sc3_supercalc_gen_cell_reader_bus_declaration(sc3_supercalc_col_letter(i), j);
            var global_eval = eval; // https://262.ecma-international.org/5.1/#sec-10.4.2
            console.debug(code_text);
            global_eval(code_text);
        }
    }
}

// sc3_supercalc_cellref_to_group('g', 4)
function sc3_supercalc_cellref_to_group(col, row) {
    return sc3_supercalc_cellref_to_bus(col, row);
}

function sc3_supercalc_cell_ugen_to_osc_packet(col, row, ugen) {
    var cell_name = col + String(row);
    var bus_index = sc3_supercalc_cellref_to_bus(col, row);
    var graph = new Graph(cell_name, wrapOut(bus_index, ugen));
    var syndef = graph.encodeSyndef();
    var group_id = sc3_supercalc_cellref_to_group(col, row);
    var g_free_msg = g_freeAll1(group_id);
    var s_new_msg = s_new0(cell_name, -1, kAddToHead, group_id);
    var d_recv_msg = d_recv_then(syndef, osc.writePacket(s_new_msg));
    var bundle = {
        timeTag: 1,
        packets: [g_free_msg, d_recv_msg]
    };
    console.debug('sc3_supercalc_cell_ugen_to_osc_message', col, row, cell_name, bus_index, group_id, bundle);
    return bundle;
}

// sc3_supercalc_create_and_init_cell_groups(8, 8)
function sc3_supercalc_create_and_init_cell_groups(numCol, numRow) {
    for(var j = 1; j <= numRow; j++) {
        for(var i = numCol - 1; i >= 0; i--) {
            var col = sc3_supercalc_col_letter(i);
            var row = j;
            var group_id = sc3_supercalc_cellref_to_group(col, row);
            var g_new_msg = g_new1(group_id, kAddToTail, 0);
            sendOsc(g_new_msg);
            sendOsc(sc3_supercalc_cell_ugen_to_osc_packet(col, row, DC(0)));
        }
    }
}

function sc3_supercalc_server_setup() {
    sc3_supercalc_define_cell_variables(sc3_supercalc_num_col, sc3_supercalc_num_row);
    sc3_supercalc_create_and_init_cell_groups(sc3_supercalc_num_col, sc3_supercalc_num_row);
}
