import { isArray, arrayAppend, arrayMap, arrayMaxItem, arraySize } from '../kernel/array.ts'

export type Tree<T> = T | Tree<T>[];

export function treeVisit<T>(aTree: Tree<T>, visitFunction: (x: T) => void): void {
	if(isArray(aTree)) {
		aTree.forEach(item => treeVisit(item, visitFunction));
	} else {
		visitFunction(aTree);
	}
}

export function treeFlattenIntoArray<T>(aTree: Tree<T>, anArray: T[]): void {
	treeVisit(aTree, item => anArray.push(item));
}

// treeFlatten(1) //= [1]
// treeFlatten([1, [2, [3, 4], 5], 6]) //= [1, 2, 3, 4, 5, 6]
export function treeFlatten<T>(aTree: Tree<T>): T[] {
	const anArray: T[] = [];
	treeFlattenIntoArray(aTree, anArray);
	return anArray;
}

export function treeDepthFrom<T>(aTree: Tree<T>, depth: number): number {
	if(isArray(aTree)) {
		return arrayMaxItem(arrayMap(item => treeDepthFrom(item, depth + 1), aTree));
	} else {
		return depth;
	}
}

// t.treeDepth(1) === 0
// t.treeDepth([1, [2, [3]]]) === 3
export function treeDepth<T>(aTree: Tree<T>): number {
	return treeDepthFrom(aTree, 0);
}

export function treeRank(aTree: Tree<unknown>): number {
	return isArray(aTree) ? (1 + treeRank(aTree[0])) : 0;
}

export function treeShape(aTree: Tree<unknown>): number[] {
	return isArray(aTree) ? (arrayAppend([arraySize(aTree)], treeShape(aTree[0]))) : [];
}

export type Forest<T> = Tree<T>[];

export function forestFlatten<T>(aForest: Forest<T>): T[] {
	return treeFlatten(aForest);
}

// forestEq([1, 2, [3, [4, 5]]], [1, 2, [3, [4, 5]]])
export function forestEq<T>(lhs: Forest<T>, rhs: Forest<T>): boolean {
	if (lhs === rhs) {
		return true;
	}
	if (!isArray(rhs) || (lhs.length !== rhs.length)) {
		return false;
	}
	for (let i = 0; i < lhs.length; i++) {
		if(isArray(lhs[i])) {
			if (!forestEq(<Forest<T>>lhs[i], <Forest<T>>rhs[i])) {
				return false;
			}
		} else {
			if (lhs[i] !== rhs[i]) {
				return false;
			}
		}
	}
	return true;
}
