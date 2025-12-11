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
