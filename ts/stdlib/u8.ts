import { Queue, queueNew, queuePush, queueAsArray } from './queue.js'
import { Tree, treeVisit } from './tree.js'

export function isUint8Array(aValue: unknown) : aValue is Uint8Array {
	return (aValue instanceof Uint8Array);
}

export function uint8ArrayIntoQueue(u8Array : Uint8Array, numberQueue : Queue<number>) : void {
	u8Array.forEach(aNumber => queuePush(numberQueue, aNumber));
}

// Flatten a tree of Uint8Array to an queue of U8
export function flattenByteEncodingIntoQueue(aTree : Tree<Uint8Array>, numberQueue : Queue<number> ) : void {
	treeVisit(aTree, item => uint8ArrayIntoQueue(item, numberQueue));
}

export function flattenByteEncoding(aTree: Tree<Uint8Array>) :  Uint8Array {
	const numberQueue = queueNew<number>();
	flattenByteEncodingIntoQueue(aTree, numberQueue);
	return new Uint8Array(queueAsArray(numberQueue));
}
