export interface Course {
	id: string;
	dept_id: string;
	name: string;
	credits: number;
	description: string;
	course_code: string;
}

export interface ScheduleBlock {
	courseCode: string;
	courseName: string;
	type: string;
	day: string;
	startTime: string;
	endTime: string;
	room: string;
	color: string;
}

export interface AcademicProfile {
	major: string;
	enrollmentYear: string;
	completedCourses: string[];
}

export interface SchedulePreferences {
	noWeekendClasses: boolean;
	noLateNightClasses: boolean;
	noMultipleDaysWithLateClasses: boolean;
	additionalPreferences: string;
}
