export type Queue<T> = {
	typeString: string,
	queue: Array<T>
};

export function isQueue<T>(aValue: Queue<T> | unknown): aValue is Queue<T> {
	return (aValue as Queue<T>).typeString ===  'queue';
}

export function queueNew<T>():Queue<T> {
	return {
		typeString: 'queue',
		queue: []
	};
}

export function queuePush<T>(aQueue: Queue<T>, aValue: T): void {
	aQueue.queue.push(aValue);
}

export function queuePop<T>(aQueue: Queue<T>): (T | undefined) {
	return aQueue.queue.pop();
}

// q = queueNew(); [1, 2, 3].forEach(item => queuePush(q, item)); queueAsArray(q) //= [1, 2, 3]
export function queueAsArray<T>(aQueue: Queue<T>): Array<T> {
	return aQueue.queue;
}
