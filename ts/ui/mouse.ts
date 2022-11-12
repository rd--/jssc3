import { ScsynthWasm, setPointerControlsWasm } from '../sc3/scsynth-wasm.ts'

// w is button state, x and y are unit scaled co-ordinates within window where y points up.
const sc3_mouse = { w: 0, x: 0, y: 0 };

// Install mouse event handler.
export function sc3_mouse_init(scsynth: ScsynthWasm) {
	const recv_document_mouse_event = function(event: MouseEvent): void {
		sc3_mouse.x = event.pageX / window.innerWidth;
		sc3_mouse.y = 1 - (event.pageY / window.innerHeight);
		sc3_mouse.w = event.buttons === 1 ? 1 : 0;
		setPointerControlsWasm(scsynth, 0, sc3_mouse.w, sc3_mouse.x, sc3_mouse.y);
	};
	document.onmousedown = recv_document_mouse_event;
	document.onmousemove = recv_document_mouse_event;
	document.onmouseup = recv_document_mouse_event;
}
