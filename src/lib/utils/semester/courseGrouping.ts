import type { Course } from "@/lib/types";

export function groupCoursesBySemester(
	courses: Course[],
): Record<number, Course[]> {
	return courses.reduce<Record<number, Course[]>>((acc, course) => {
		const { semester } = course;
		acc[semester] ??= [];
		acc[semester].push(course);
		return acc;
	}, {});
}

export function calculateTotalCredits(
	courses: Course[],
	selectedCodes: Set<string>,
): number {
	return courses
		.filter((course) => selectedCodes.has(course.code))
		.reduce((sum, course) => sum + course.credits, 0);
}

export function getSemestersInYear(year: number): [number, number] {
	return [year * 2 - 1, year * 2];
}
