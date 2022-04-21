// sc3-event.ts

import { arrayFromTo } from './sc3-array.js'
import { Latch } from './sc3-bindings.js'
import { ControlIn } from './sc3-pseudo.js'
import { ServerMessage, c_set1, c_setn1 } from './sc3-servercommand.js'
import { Signal } from './sc3-ugen.js'

type event<T> = { v: number, w: T, x: T, y: T, z: T, o: T, rx: T, ry: T, p: T, px: T };

function EventParam(v: number, u: any[]): event<any> {
    return {
        v: v,
        w: u[0],
        x: u[1],
        y: u[2],
        z: u[3],
        o: u[4],
        rx: u[5],
        ry: u[6],
        p: u[7],
        px: u[8]
    };
}

function eventV(e: event<any>): number { return e.v; }
function eventW(e: event<any>): any { return e.w; }
function eventX(e: event<any>): any { return e.x; }
function eventY(e: event<any>): any { return e.y; }
function eventZ(e: event<any>): any { return e.z; }
function eventO(e: event<any>): any { return e.o; }
function eventRx(e: event<any>): any { return e.rx; }
function eventRy(e: event<any>): any { return e.ry; }
function eventP(e: event<any>): any { return e.p; }

// Control bus address of voiceNumber (indexed from one).
function voiceAddr(voiceNumber: number): number {
    var eventAddr = 13000;
    var eventIncr = 10;
    var eventZero = 0;
    var voiceAddr = eventAddr + ((voiceNumber - 1 + eventZero) * eventIncr);
    return voiceAddr;
}

function Voicer(numVoices: number, voiceFunc: (e: event<Signal>) => Signal): Signal[] {
    var voiceOffset = 0;
    return arrayFromTo(1, numVoices).map(function(c) {
        var controlArray = <Signal[]>ControlIn(9, voiceAddr(c + voiceOffset));
        return voiceFunc(EventParam(c + voiceOffset, controlArray));
    });
}

function eventParamSetMessage(e: event<number>): ServerMessage {
    return c_setn1(voiceAddr(e.v), [e.w, e.x, e.y, e.z, e.o, e.rx, e.ry, e.p, e.px]);
}

function voiceEndMessage(voiceNumber: number): ServerMessage {
    return c_set1(voiceAddr(voiceNumber), 0);
}

// Kyma keyboard names, all values are 0-1
function KeyDown(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 0); }
function KeyTimbre(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 2); }
function KeyPressure(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 3); }
function KeyVelocity(voiceNumber: number): Signal { return Latch(KeyPressure(voiceNumber), KeyDown(voiceNumber)); }
function KeyPitch(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 7); }

// Kyma pen names, all values are 0-1
function PenDown(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 0); }
function PenX(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 1); }
function PenY(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 2); }
function PenZ(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 3); }
function PenAngle(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 4); }
function PenRadius(voiceNumber: number): Signal { return ControlIn(1, voiceAddr(voiceNumber) + 5); }
