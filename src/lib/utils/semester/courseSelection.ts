import type { Course } from "@/lib/types";

export function isSemesterFullySelected(
	semesterCourses: Course[],
	selectedCodes: Set<string>,
): boolean {
	return semesterCourses.every((course) => selectedCodes.has(course.code));
}

export function toggleCourseSelection(
	selectedCourses: Set<string>,
	courseCode: string,
): Set<string> {
	const newSelected = new Set(selectedCourses);
	if (newSelected.has(courseCode)) {
		newSelected.delete(courseCode);
	} else {
		newSelected.add(courseCode);
	}
	return newSelected;
}

export function toggleSemesterSelection(
	selectedCourses: Set<string>,
	semesterCourses: Course[],
): Set<string> {
	const newSelected = new Set(selectedCourses);
	const allSelected = isSemesterFullySelected(semesterCourses, selectedCourses);

	if (allSelected) {
		for (const course of semesterCourses) {
			newSelected.delete(course.code);
		}
	} else {
		for (const course of semesterCourses) {
			newSelected.add(course.code);
		}
	}

	return newSelected;
}

export function toggleYearSelection(
	selectedCourses: Set<string>,
	coursesBySemester: Record<number, Course[]>,
	semesterNumbers: number[],
): Set<string> {
	let newSelected = new Set(selectedCourses);

	for (const sem of semesterNumbers) {
		const semesterCourses = coursesBySemester[sem] || [];
		newSelected = toggleSemesterSelection(newSelected, semesterCourses);
	}

	return newSelected;
}
