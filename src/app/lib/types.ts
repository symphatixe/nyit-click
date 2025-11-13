export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
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

