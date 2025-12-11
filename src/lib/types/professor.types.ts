// Database types matching Supabase schema
export interface CourseReview {
	id: string;
	user_id: string;
	course_id: string;
	professor_id: string;
	rating: number;
	review_text: string;
	created_at: string;
	review_tags: string[];
}

export interface Professor {
	id: string;
	first_name: string;
	last_name: string;
	bio?: string;
	initials?: string;
	commonTags?: string[];
	// Legacy fields for backwards compatibility
	name?: string;
}

// Legacy type for backwards compatibility
export interface ProfessorReview {
	id: string;
	professorId: string;
	studentName: string;
	courseCode: string;
	workloadRating: number;
	contentRating: number;
	professorRating: number;
	feedback: string;
	tags: string[];
	date: string;
}

export type ProfessorReviewWithCourseInfo = CourseReview & {
	courses: {
		course_code: string;
		name: string;
	};
};

// temp type so we dont have to change CourseReview, this is so we can get all the course info alongside the review
// with just one query. for the course info, see course.types.ts. for where this is used, see professorService.ts