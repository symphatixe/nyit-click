import type { SemesterMapCourse } from "@/lib/types";

export function groupCoursesBySemester(
	courses: SemesterMapCourse[],
): Record<number, SemesterMapCourse[]> {
	return courses.reduce<Record<number, SemesterMapCourse[]>>((acc, course) => {
		const { semester } = course;
		acc[semester] ??= [];
		acc[semester].push(course);
		return acc;
	}, {});
}

export function calculateTotalCredits(
	courses: SemesterMapCourse[],
	selectedCodes: Set<string>,
): number {
	return courses
		.filter((course) => selectedCodes.has(course.course_code))
		.reduce((sum, course) => sum + course.credits, 0);
}

export function getSemestersInYear(year: number): [number, number] {
	return [year * 2 - 1, year * 2];
}
