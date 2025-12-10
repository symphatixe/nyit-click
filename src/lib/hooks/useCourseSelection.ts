// lib/hooks/useCourseSelection.ts

import { useState, useCallback } from "react";
import type { Course } from "@/lib/types";
import {
	toggleCourseSelection,
	toggleSemesterSelection,
	toggleYearSelection,
	isSemesterFullySelected,
} from "@/lib/utils/semester/courseSelection";

interface UseCourseSelectionReturn {
	selectedCourses: Set<string>;
	toggleCourse: (courseCode: string) => void;
	toggleSemester: (semesterCourses: Course[]) => void;
	toggleYear: (
		coursesBySemester: Record<number, Course[]>,
		semesterNumbers: number[],
	) => void;
	isSemesterSelected: (semesterCourses: Course[]) => boolean;
	clearSelection: () => void;
	setSelection: (codes: Set<string>) => void;
}

export function useCourseSelection(
	initialSelection: Set<string> = new Set(),
): UseCourseSelectionReturn {
	const [selectedCourses, setSelectedCourses] = useState(initialSelection);

	const toggleCourse = useCallback((courseCode: string) => {
		setSelectedCourses((prev) => toggleCourseSelection(prev, courseCode));
	}, []);

	const toggleSemester = useCallback((semesterCourses: Course[]) => {
		setSelectedCourses((prev) =>
			toggleSemesterSelection(prev, semesterCourses),
		);
	}, []);

	const toggleYear = useCallback(
		(
			coursesBySemester: Record<number, Course[]>,
			semesterNumbers: number[],
		) => {
			setSelectedCourses((prev) =>
				toggleYearSelection(prev, coursesBySemester, semesterNumbers),
			);
		},
		[],
	);

	const isSemesterSelected = useCallback(
		(semesterCourses: Course[]) => {
			return isSemesterFullySelected(semesterCourses, selectedCourses);
		},
		[selectedCourses],
	);

	const clearSelection = useCallback(() => {
		setSelectedCourses(new Set());
	}, []);

	const setSelection = useCallback((codes: Set<string>) => {
		setSelectedCourses(codes);
	}, []);

	return {
		selectedCourses,
		toggleCourse,
		toggleSemester,
		toggleYear,
		isSemesterSelected,
		clearSelection,
		setSelection,
	};
}
