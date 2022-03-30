'use strict';

class EventParam {
    constructor(v, u) {
        this.v = v;
        this.w = u[0];
        this.x = u[1];
        this.y = u[2];
        this.z = u[3];
        this.o = u[4];
        this.rx = u[5];
        this.ry = u[6];
        this.p = u[7];
        this.px = u[8];
    }
}

function eventW(e) { return e.w; }
function eventX(e) { return e.x; }
function eventY(e) { return e.y; }
function eventZ(e) { return e.z; }
function eventO(e) { return e.o; }
function eventRx(e) { return e.rx; }
function eventRy(e) { return e.ry; }
function eventP(e) { return e.p; }

// Control bus address of voiceNumber (indexed from one).
function voiceAddr(voiceNumber) {
    var eventAddr = 13000;
    var eventIncr = 10;
    var eventZero = 0;
    var voiceAddr = eventAddr + ((voiceNumber - 1 + eventZero) * eventIncr);
    return voiceAddr;
}

function Voicer(numVoices, voiceFunc) {
    var voiceOffset = 0;
    return arrayFromTo(1, numVoices).map(c => voiceFunc(new EventParam(c + voiceOffset, ControlIn(9, voiceAddr(c + voiceOffset)))));
}

function eventParamSetMessage(e) {
    return c_setn1(voiceAddr(e.v), [e.w, e.x, e.y, e.z, e.o, e.rx, e.ry, e.p, e.px]);
}

function voiceEndMessage(voiceNumber) {
    return c_set1(voiceAddr(voiceNumber), 0);
}

// Kyma keyboard names, all values are 0-1
function KeyDown(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 0); }
function KeyTimbre(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 2); }
function KeyPressure(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 3); }
function KeyVelocity(voiceNumber) { return Latch(KeyPressure(voiceNumber), KeyDown(voiceNumber)); }
function KeyPitch(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 7); }

// Kyma pen names, all values are 0-1
function PenDown(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 0); }
function PenX(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 1); }
function PenY(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 2); }
function PenZ(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 3); }
function PenAngle(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 4); }
function PenRadius(voiceNumber) { return ControlIn(1, voiceAddr(voiceNumber) + 5); }
