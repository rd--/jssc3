export type Maybe<T> = T | null;

export function fromMaybe<T>(aMaybe: Maybe<T>, defaultValue: T): T {
	if(aMaybe === null) {
		return defaultValue;
	} else {
		return aMaybe
	}
}
