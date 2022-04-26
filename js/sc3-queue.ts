// sc3-queue.ts ; smalltalk arrays (and r5rs scheme vectors) are of fixed size

export type Queue<T> = {
    typeString: string,
    queue: Array<T>
};

export function isQueue(aValue: any): boolean {
    return aValue.typeString === 'queue';
}

export function queueNew():Queue<any> {
    return {
        typeString: 'queue',
        queue: []
    };
}

export function queuePush(aQueue: Queue<any>, aValue: any): void {
    aQueue.queue.push(aValue);
}

export function queuePop(aQueue: Queue<any>): any {
    return aQueue.queue.pop;
}

// q = queueNew(); [1, 2, 3].forEach(item => queuePush(q, item)); queueAsArray(q) //= [1, 2, 3]
export function queueAsArray(aQueue: Queue<any>): Array<any> {
    return aQueue.queue;
}
