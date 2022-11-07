'use strict';

function jssc3_supercalc_init(numCol, numRow) {
	sc3_supercalc_init (numCol, numRow);
	editor_get_selected_text = function() { return ''; };
	editor_get_data = sc3_supercalc_get_json;
	editor_set_data = sc3_supercalc_set_json;
}
