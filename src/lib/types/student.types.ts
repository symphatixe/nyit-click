export interface Student {
	id: string;
	name: string;
	initials: string;
	year: "Freshman" | "Sophomore" | "Junior" | "Senior";
	major: string;
	email: string;
	bio: string;
	sharedClasses: string[];
}
