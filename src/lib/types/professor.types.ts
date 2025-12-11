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
	name?: string;
}

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
