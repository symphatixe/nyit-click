export interface ScheduleEntry {
	courseCode: string;
	courseName: string;
	day: string;
	startTime: string;
	endTime: string;
	room: string;
}

export interface CourseTimeSlot {
	days: string[];
	startTime: string;
	endTime: string;
	room: string;
}

export interface GroupedCourse {
	courseCode: string;
	courseName: string;
	times: CourseTimeSlot[];
}
