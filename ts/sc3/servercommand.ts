import { OscData, OscMessage, encodeOscPacket, oscBlob, oscInt32, oscFloat, oscString } from '../stdlib/opensoundcontrol.ts'

// k = constant

export const kAddToHead = 0;
export const kAddToTail = 1;

// b = buffer

export function b_alloc_then(bufferNumber: number, numberOfFrames: number, numberOfChannels: number, onCompletion: Uint8Array): OscMessage {
	return {
		address: '/b_alloc',
		args: [oscInt32(bufferNumber), oscInt32(numberOfFrames), oscInt32(numberOfChannels), oscBlob(onCompletion)]
	};
}

// b_gen memcpy is in sc3-rdu
export function b_memcpy(bufferNumber: number, numFrames: number, numChannels: number, sampleRate: number, bufferData: Uint8Array): OscMessage {
	return {
		address: '/b_gen',
		args: [
		    oscInt32(bufferNumber),
		    oscString('memcpy'),
		    oscInt32(numFrames),
		    oscInt32(numChannels),
		    oscFloat(sampleRate),
		    oscBlob(bufferData)]
	};
}

export function b_alloc_then_memcpy(bufferNumber: number, numberOfFrames: number, numberOfChannels: number, sampleRate: number, bufferData: Uint8Array): OscMessage {
	const allocBytes = numberOfFrames * numberOfChannels * 4;
	if(allocBytes != bufferData.length) {
		console.error('b_alloc_then_memcpy: array size error', allocBytes, bufferData.length);
	}
	return b_alloc_then(
		bufferNumber,
		numberOfFrames,
		numberOfChannels,
		encodeOscPacket(b_memcpy(bufferNumber, numberOfFrames, numberOfChannels, sampleRate, bufferData))
	);
}

export function b_getn1(bufferNumber: number, startIndex: number, count: number): OscMessage {
	return {
		address: '/b_getn',
		args: [oscInt32(bufferNumber), oscInt32(startIndex), oscInt32(count)]
	};
}

export function b_query1(bufferNumber: number): OscMessage {
	return {
		address: '/b_query',
		args: [oscInt32(bufferNumber)]
	};
}

// c = control

export function c_set1(busIndex: number, controlValue: number): OscMessage {
	return {
		address: '/c_set',
		args: [oscInt32(busIndex), oscFloat(controlValue)]
	};
}

export function c_setn1(busIndex: number, controlArray: number[]): OscMessage {
	return {
		address: '/c_setn',
		args: [oscInt32(busIndex), oscInt32(controlArray.length)].concat(controlArray.map(oscFloat))
	};
}

// d = (synth) definition

export function d_recv(syndefArray: Uint8Array): OscMessage {
	return {
		address: '/d_recv',
		args: [oscBlob(syndefArray)]
	};
}

export function d_recv_then(syndefArray: Uint8Array, onCompletion: Uint8Array): OscMessage {
	return {
		address: '/d_recv',
		args: [oscBlob(syndefArray), oscBlob(onCompletion)]
	};
}

// g = group

export type G_new = [groupId: number, addAction: number, nodeId: number];

export function g_new(groups: G_new[]): OscMessage {
	return {
		address: '/g_new',
		args: groups.map(group => group.map(oscInt32)).flat()
	};
}

export function g_new1(groupId: number, addAction: number, nodeId: number): OscMessage {
	return g_new([[groupId, addAction, nodeId]]);
}

export function g_freeAll(groupIdArray: number[]): OscMessage {
	return {
		address: '/g_freeAll',
		args: groupIdArray.map(groupId => oscInt32(groupId))
	};
}

export function g_freeAll1(groupId: number): OscMessage {
	return g_freeAll([groupId]);
}

// m = meta

export const m_status: OscMessage = {address: '/status', args: []};

export function m_dumpOsc(code: number): OscMessage {
	return {
		address: '/dumpOSC',
		args: [oscInt32(code)]
	};
}

export function m_notify(status: number, clientId: number): OscMessage {
	return {
		address: '/notify',
		args: [oscInt32(status), oscInt32(clientId)]
	};
}

export type ScSynthStatus = {
	ugenCount: number,
	synthCount: number,
	groupCount: number,
	synthdefCount: number,
	cpuAverage: number,
	cpuPeak: number,
	sampleRateNominal: number,
	sampleRateActual: number
};

export const defaultScSynthStatus = {
	ugenCount: 0,
	synthCount: 0,
	groupCount: 0,
	synthdefCount: 0,
	cpuAverage: 0,
	cpuPeak: 0,
	sampleRateNominal: 48000,
	sampleRateActual: 48000
};

export function m_parseStatusReply(msg: OscMessage, status: ScSynthStatus): void {
	if(msg.address === '/status.reply') {
		status.ugenCount = <number>msg.args[1].value;
		status.synthCount = <number>msg.args[2].value;
		status.groupCount = <number>msg.args[3].value;
		status.synthdefCount = <number>msg.args[4].value;
		status.cpuAverage = <number>msg.args[5].value;
		status.cpuPeak = <number>msg.args[6].value;
		status.sampleRateNominal = <number>msg.args[7].value;
		status.sampleRateActual = Math.round(<number>msg.args[8].value);
	} else {
		throw(`m_statusReply: not /status.reply: ${msg.address}`);
	}
}

// s = synth

export function s_new0(name: string, nodeId: number, addAction: number, target: number): OscMessage {
	return {
		address: '/s_new',
		args: [oscString(name), oscInt32(nodeId), oscInt32(addAction), oscInt32(target)]
	};
}
