import { createClient } from "@/lib/utils/database/supabase/client";
import type { Course } from "@/types";

export async function searchCourses(query: string): Promise<Course[]> {
	const client = createClient();

	if (!query.trim()) {
		// Return top 5 courses when no query
		const { data, error } = await client
			.from("courses")
			.select("*")
			.limit(5)
			.order("course_code", { ascending: true });

		if (error) {
			console.error("Error fetching courses:", error);
			return [];
		}

		return data || [];
	}

	// Search by course name or course code
	const { data, error } = await client
		.from("courses")
		.select("*")
		.or(`name.ilike.%${query}%,course_code.ilike.%${query}%`)
		.limit(5)
		.order("course_code", { ascending: true });

	if (error) {
		console.error("Error searching courses:", error);
		return [];
	}

	return data || [];
}
