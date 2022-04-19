// sc3-queue.ts

type Queue<T> = Array<T>;

function isQueue(aValue: any): boolean {
    return Array.isArray(aValue);
}

function queueNew():Queue<any> {
    return [];
}

function queuePush(aQueue: Queue<any>, aValue: any): void {
    aQueue.push(aValue);
}

function queuePop(aQueue: Queue<any>): any {
    return aQueue.pop;
}

// q = queueNew(); [1, 2, 3].forEach(item => queuePush(q, item)); queueToArray(q) //= [1, 2, 3]
function queueToArray(aQueue: Queue<any>): Array<any> {
    return aQueue;
}
