/**
 * Rounds a value to at most 2 decimal places.
 */
export function round(value) {
	// see https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
	return Math.round((value + Number.EPSILON) * 100) / 100;
}

export default { round };
