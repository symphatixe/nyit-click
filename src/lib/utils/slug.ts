/**
 * Generates a slug from student first_name, last_name, and id
 * Format: first_name-last_name-uuid
 */
export function generateStudentSlug(
	firstName: string,
	lastName: string,
	id: string,
): string {
	return `${firstName}-${lastName}-${id}`;
}

/**
 * Parses a student slug to extract firstName, lastName, and uuid
 * Format: first_name-last_name-uuid
 * Returns null if format is invalid
 */
export function parseStudentSlug(slug: string): {
	firstName: string;
	lastName: string;
	uuid: string;
} | null {
	const parts = slug.split("-");

	// UUID format check (36 chars including hyphens)
	const lastPart = parts[parts.length - 1];

	// Simple UUID validation (should be around 36 chars when full)
	if (!lastPart || lastPart.length < 8) {
		return null;
	}

	// Join last parts to handle UUIDs that might split on hyphens
	// UUIDs have format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
	const potentialUuids = [];
	for (let i = parts.length - 1; i >= 2; i--) {
		potentialUuids.unshift(parts[i]);
		const testUuid = potentialUuids.join("-");

		// Check if this looks like a valid UUID (36 chars)
		if (testUuid.length === 36 && testUuid.match(/^[0-9a-f-]+$/i)) {
			const firstName = parts[0];
			const lastName = parts[1];

			if (firstName && lastName) {
				return {
					firstName,
					lastName,
					uuid: testUuid,
				};
			}
		}
	}

	return null;
}

/**
 * Validates that parsed slug data matches database student data
 */
export function validateSlugMatch(
	parsedSlug: ReturnType<typeof parseStudentSlug>,
	dbFirstName: string,
	dbLastName: string,
	dbUuid: string,
): boolean {
	if (!parsedSlug) return false;

	// Case-sensitive comparison as requested
	return (
		parsedSlug.firstName === dbFirstName &&
		parsedSlug.lastName === dbLastName &&
		parsedSlug.uuid === dbUuid
	);
}
