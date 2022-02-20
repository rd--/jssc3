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

function Voicer(numVoices, voiceFunc) {
    var k0 = 13000;
    var stp = 10;
    var c0 = 0;
    return arrayFromTo(0, numVoices - 1).map(c => voiceFunc(new EventParam(c + c0, ControlIn(9, k0 + ((c + c0) * stp)))));
}

function voiceAddr(voiceNumber) {
    var eventAddr = 13000;
    var eventIncr = 10;
    var eventZero = 0;
    return eventAddr + (voiceNumber + eventZero * eventIncr);
}

// Kyma keyboard names, all values are 0-1
function KeyDown(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 0, 1); }
function KeyTimbre(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 2, 1); }
function KeyVelocity(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 3, 1); }
function KeyPitch(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 7, 1); }

// Kyma pen names, all values are 0-1
function PenDown(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 0, 1); }
function PenX(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 1, 1); }
function PenY(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 2, 1); }
function PenZ(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 3, 1); }
function PenAngle(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 4, 1); }
function PenRadius(voiceNumber) { return ControlIn(voiceAddr(voiceNumber) + 5, 1); }
