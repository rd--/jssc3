// sc3-tree.ts

export type Tree<T> = T | Tree<T>[];

export function treeVisit<T>(aTree: Tree<T>, visitFunction: (x: T) => void): void {
	if(Array.isArray(aTree)) {
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

export type Forest<T> = Tree<T>[];

export function forestFlatten<T>(aForest: Forest<T>): T[] {
	return treeFlatten(aForest);
}
