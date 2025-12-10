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

export interface Professor {
	id: string;
	name: string;
	initials: string;
	commonTags: string[];
}
