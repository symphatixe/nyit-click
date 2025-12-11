import type {
	AcademicProfile,
	SchedulePreferences,
	ScheduleBlock,
	Course,
} from "@/types";
import { generatedSchedule } from "@/lib/mockData";

// API functions - currently using mock data
// Replace these with actual API calls when backend is ready

export async function generateSchedule(
	profile: AcademicProfile,
	preferences: SchedulePreferences,
): Promise<ScheduleBlock[]> {
	// TODO: Replace with actual API call
	// Example:
	// const response = await fetch('/api/generate-schedule', {
	//   method: 'POST',
	//   headers: { 'Content-Type': 'application/json' },
	//   body: JSON.stringify({ profile, preferences })
	// });
	// return await response.json();

	return new Promise((resolve) => {
		setTimeout(() => resolve(mockSchedule), 1500);
	});
}

export async function getAvailableCourses(major: string): Promise<Course[]> {
	// TODO: Replace with actual API call
	// const response = await fetch(`/api/courses?major=${major}`);
	// return await response.json();

	return new Promise((resolve) => {
		setTimeout(() => resolve(availableCourses), 500);
	});
}

export async function getUserProfile(): Promise<AcademicProfile> {
	// TODO: Replace with actual API call
	// const response = await fetch('/api/user/profile');
	// return await response.json();

	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					major: "Computer Science",
					enrollmentYear: "2021",
					completedCourses: ["CSCI 185", "MATH180", "CHEM105"],
				}),
			500,
		);
	});
}
