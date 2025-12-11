import { createClient } from "@/lib/utils/database/supabase/client";
import type {
	Professor,
	CourseReview,
	ProfessorReviewWithCourseInfo,
} from "@/types";

export async function searchProfessors(query: string): Promise<Professor[]> {
	const client = createClient();

	if (!query.trim()) {
		// Return top 5 professors when no query
		const { data, error } = await client
			.from("professors")
			.select("*")
			.limit(5)
			.order("first_name", { ascending: true });

		if (error) {
			console.error("Error fetching professors:", error);
			return [];
		}

		return (data || []).map((prof) => ({
			id: prof.id,
			first_name: prof.first_name,
			last_name: prof.last_name,
			bio: prof.bio,
			name: `${prof.first_name} ${prof.last_name}`,
			initials: `${prof.first_name[0]}${prof.last_name[0]}`.toUpperCase(),
		}));
	}

	// Search by first name + last name concatenation
	const { data, error } = await client
		.from("professors")
		.select("*")
		.or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
		.limit(5)
		.order("first_name", { ascending: true });

	if (error) {
		console.error("Error searching professors:", error);
		return [];
	}

	return (data || []).map((prof) => ({
		id: prof.id,
		first_name: prof.first_name,
		last_name: prof.last_name,
		bio: prof.bio,
		name: `${prof.first_name} ${prof.last_name}`,
		initials: `${prof.first_name[0]}${prof.last_name[0]}`.toUpperCase(),
	}));
}

export async function getProfessorCommonTags(
	professorId: string,
): Promise<string[]> {
	const client = createClient();

	// Get reviews for a professor and extract most common tags
	const { data: reviews, error } = await client
		.from("course_reviews")
		.select("review_tags")
		.eq("professor_id", professorId)
		.not("review_tags", "is", null);

	if (error) {
		console.error("Error fetching professor tags:", error);
		return [];
	}

	// Aggregate tags and count frequency
	const tagFrequency: { [key: string]: number } = {};
	(reviews || []).forEach((review) => {
		const tags = review.review_tags || [];
		tags.forEach((tag: string) => {
			tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
		});
	});

	// Get top 3 tags by frequency
	return Object.entries(tagFrequency)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 3)
		.map(([tag]) => tag);
}

export async function getProfessorsWithTags(): Promise<
	Array<Professor & { commonTags: string[] }>
> {
	const professors = await searchProfessors("");
	const professorsWithTags = await Promise.all(
		professors.map(async (prof) => ({
			...prof,
			commonTags: await getProfessorCommonTags(prof.id),
		})),
	);
	return professorsWithTags;
}

export async function getProfessor(
	professorId: string,
): Promise<Professor | null> {
	const client = createClient();

	const { data, error } = await client
		.from("professors")
		.select("*")
		.eq("id", professorId)
		.single();

	if (error) {
		console.error("Error fetching professor:", error);
		return null;
	}

	if (!data) {
		return null;
	}

	return {
		id: data.id,
		first_name: data.first_name,
		last_name: data.last_name,
		bio: data.bio,
		name: `${data.first_name} ${data.last_name}`,
		initials: `${data.first_name[0]}${data.last_name[0]}`.toUpperCase(),
	};
}

export async function getProfessorReviews(
	professorId: string,
): Promise<ProfessorReviewWithCourseInfo[]> {
	const client = createClient();

	const { data, error } = await client
		.from("course_reviews")
		.select("*")
		.select("*, courses(course_code, name)")
		.eq("professor_id", professorId)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching reviews:", error);
		return [];
	}

	return data || [];
}

export async function getProfessorAverageRating(
	professorId: string,
): Promise<number> {
	const client = createClient();

	const { data, error } = await client
		.from("course_reviews")
		.select("rating")
		.eq("professor_id", professorId)
		.not("rating", "is", null);

	if (error) {
		console.error("Error calculating average rating:", error);
		return 0;
	}

	if (!data || data.length === 0) {
		return 0;
	}

	const sum = data.reduce((acc, review) => acc + review.rating, 0);
	return Math.round((sum / data.length) * 10) / 10;
}
