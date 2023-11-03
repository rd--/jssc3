export type Maybe<T> = T | null;

export function fromMaybe<T>(maybeValue: Maybe<T>, defaultValue: T): T {
	if(maybeValue === null) {
		return defaultValue;
	} else {
		return maybeValue
	}
}
