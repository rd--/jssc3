// sc3-queue.ts

export type Queue<T> = Array<T>;

export function isQueue(aValue: any): boolean {
    return Array.isArray(aValue);
}

export function queueNew():Queue<any> {
    return [];
}

export function queuePush(aQueue: Queue<any>, aValue: any): void {
    aQueue.push(aValue);
}

export function queuePop(aQueue: Queue<any>): any {
    return aQueue.pop;
}

// q = queueNew(); [1, 2, 3].forEach(item => queuePush(q, item)); queueAsArray(q) //= [1, 2, 3]
export function queueAsArray(aQueue: Queue<any>): Array<any> {
    return aQueue;
}
