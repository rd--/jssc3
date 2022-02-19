'use strict';

function PointerW(n) {
    return ControlIn(1, 15001 + (n * 10));
}

function PointerX(n) {
    return ControlIn(1, 15002 + (n * 10));
}

function PointerY(n) {
    return ControlIn(1, 15003 + (n * 10));
}

/*
Web Assembly scsynth does not include the Mouse unit generators.
Overwrite the sc3-bindings definitions.
*/

MouseX = function(minval, maxval, warp, lag) {
    switch(warp) {
    case 0: return LinLin(Lag(PointerX(0), lag), 0, 1, minval, maxval);
    case 1: return LinExp(Lag(PointerX(0), lag), 0, 1, minval, maxval);
    default: console.error('MouseX: unknown warp', warp);
    }
};

MouseY = function(minval, maxval, warp, lag) {
    switch(warp) {
    case 0: return LinLin(Lag(PointerY(0), lag), 0, 1, minval, maxval);
    case 1: return LinExp(Lag(PointerY(0), lag), 0, 1, minval, maxval);
    default: console.error('MouseY: unknown warp', warp);
    }
};

MouseButton = function(minval, maxval, lag) {
    return LinLin(Lag(PointerW(0), lag), 0, 1, minval, maxval);
};
