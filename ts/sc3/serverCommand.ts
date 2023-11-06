import { encodeFloat32Array } from '../kernel/encode.ts'

import { OscData, OscMessage, encodeOscPacket, oscBlob, oscInt32, oscFloat, oscString } from '../stdlib/openSoundControl.ts'

// k = constant

export const kAddToHead = 0;
export const kAddToTail = 1;

// b = buffer

// b_alloc, with optional completion message
export function b_alloc(
	bufferNumber: number,
	numberOfFrames: number,
	numberOfChannels: number,
	onCompletion: Uint8Array | null
): OscMessage {
	return {
		address: '/b_alloc',
		args: [
			oscInt32(bufferNumber),
			oscInt32(numberOfFrames),
			oscInt32(numberOfChannels),
		].concat(onCompletion ? [oscBlob(onCompletion)] : [])
	};
}

// b_gen memcpy is in sc3-rdu
export function b_memcpy(
	bufferNumber: number,
	numFrames: number,
	numChannels: number,
	sampleRate: number,
	bufferData: Uint8Array,
	byteSwap: number
): OscMessage {
	return {
		address: '/b_gen',
		args: [
		    oscInt32(bufferNumber),
		    oscString('memcpy'),
		    oscInt32(numFrames),
		    oscInt32(numChannels),
		    oscFloat(sampleRate),
		    oscBlob(bufferData),
		    oscInt32(byteSwap)]
	};
}

export function b_allocMemcpy(
	bufferNumber: number,
	numberOfFrames: number,
	numberOfChannels: number,
	sampleRate: number,
	bufferData: Uint8Array,
	byteSwap: number
): OscMessage {
	const allocBytes = numberOfFrames * numberOfChannels * 4;
	if(allocBytes != bufferData.length) {
		console.error('b_allocMemcpy: array size error', allocBytes, bufferData.length);
	}
	const memcpyMessage = b_memcpy(
		bufferNumber,
		numberOfFrames,
		numberOfChannels,
		sampleRate,
		bufferData,
		byteSwap
	);
	return b_alloc(
		bufferNumber,
		numberOfFrames,
		numberOfChannels,
		encodeOscPacket(memcpyMessage)
	);
}

export function b_allocMemcpyFloat32Array(
	bufferNumber: number,
	numberOfFrames: number,
	numberOfChannels: number,
	sampleRate: number,
	data: Float32Array
): OscMessage {
	const littleEndian = true; /* arm64 is LittleEndian */
	const byteSwap = 0; /* do not byte-swap */
	return b_allocMemcpy(
		bufferNumber,
		numberOfFrames,
		numberOfChannels,
		sampleRate,
		encodeFloat32Array(data, littleEndian),
		byteSwap
	);
}

export function b_allocMemcpyArray(
	bufferNumber: number,
	sampleRate: number,
	data: number[]
): OscMessage {
	const numberOfFrames = data.length;
	const numberOfChannels = 1;
	return b_allocMemcpyFloat32Array(
		bufferNumber, numberOfFrames, numberOfChannels, sampleRate, new Float32Array(data)
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

export function d_recv(
	syndefArray: Uint8Array,
	onCompletion: Uint8Array | null
): OscMessage {
	return {
		address: '/d_recv',
		args: [
			oscBlob(syndefArray)
		].concat(onCompletion ? [oscBlob(onCompletion)] : [])
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

export function m_parseStatusReplyInto(msg: OscMessage, status: ScSynthStatus): void {
	if(msg.address === '/status.reply') {
		status.ugenCount = <number>msg.args[1].value;
		status.synthCount = <number>msg.args[2].value;
		status.groupCount = <number>msg.args[3].value;
		status.synthdefCount = <number>msg.args[4].value;
		status.cpuAverage = Math.round(<number>msg.args[5].value);
		status.cpuPeak = Math.round(<number>msg.args[6].value);
		status.sampleRateNominal = <number>msg.args[7].value;
		status.sampleRateActual = Math.round(<number>msg.args[8].value);
	} else {
		throw(`m_statusReply: not /status.reply: ${msg.address}`);
	}
}

// s = synth

export function s_new(
	name: string,
	nodeId: number,
	addAction: number,
	target: number,
	parameterArray: [string, number][]
): OscMessage {
	const oscParameters: OscData[] = [];
	parameterArray.forEach(function(each) {
		oscParameters.push(oscString(each[0]));
		oscParameters.push(oscFloat(each[1]));
	});
	return {
		address: '/s_new',
		args: [
			oscString(name),
			oscInt32(nodeId),
			oscInt32(addAction),
			oscInt32(target)
		].concat(oscParameters)
	};
}

export function s_new0(name: string, nodeId: number, addAction: number, target: number): OscMessage {
	return s_new(name, nodeId, addAction, target, []);
}

export function n_set(nodeId: number, parameterArray: [string, number][]): OscMessage {
	const oscParameters: OscData[] = [oscInt32(nodeId)];
	parameterArray.forEach(function(each) {
		oscParameters.push(oscString(each[0]));
		oscParameters.push(oscFloat(each[1]));
	});
	return {
		address: '/n_set',
		args: oscParameters
	};
}

export function n_set1(nodeId: number, controlName: string, controlValue: number): OscMessage {
	return n_set(nodeId, [[controlName, controlValue]]);
}
