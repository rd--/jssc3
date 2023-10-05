import { ScSynth, setPointerControls } from './scsynth.ts'

// w is button state, x and y are unit scaled co-ordinates within window where y points up.
const sc3Mouse = { w: 0, x: 0, y: 0 };

// Install mouse event handler.
export function sc3_mouse_init(scSynth: ScSynth) {
	const onMouseEvent = function(event: MouseEvent): void {
		sc3Mouse.x = event.pageX / window.innerWidth;
		sc3Mouse.y = 1 - (event.pageY / window.innerHeight);
		sc3Mouse.w = event.buttons === 1 ? 1 : 0;
		setPointerControls(scSynth, 0, sc3Mouse.w, sc3Mouse.x, sc3Mouse.y);
	};
	document.onmousedown = onMouseEvent;
	document.onmousemove = onMouseEvent;
	document.onmouseup = onMouseEvent;
}
