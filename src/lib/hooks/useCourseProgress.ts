import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/utils/database/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { SemesterMapCourse } from "@/lib/types";

interface UseCourseProgressReturn {
	user: User | null;
	loading: boolean;
	hasExistingProgress: boolean;
	selectedCourses: Set<string>;
	setSelectedCourses: (courses: Set<string>) => void;
	saveProgress: (
		selectedCodes: string[],
		courses: SemesterMapCourse[],
	) => Promise<void>;
	isSubmitting: boolean;
}

export function useCourseProgress(): UseCourseProgressReturn {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [hasExistingProgress, setHasExistingProgress] = useState(false);
	const [selectedCourses, setSelectedCourses] = useState<Set<string>>(
		new Set(),
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const supabase = createClient();

	const loadUserAndProgress = useCallback(async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			setUser(user);

			const { data: userProgress, error } = await supabase
				.from("user_course_progress")
				.select(
					`
				course_id,
				completed,
				courses (
					course_code
				)
				`,
				)
				.eq("user_id", user.id)
				.eq("completed", true);

			if (error) throw error;

			if (userProgress && userProgress.length > 0) {
				const completedCourses = new Set(
					userProgress
						.filter((progress: any) => progress.courses?.course_code)
						.map((progress: any) => progress.courses.course_code),
				);
				setSelectedCourses(completedCourses);
				setHasExistingProgress(true);
			}
		} catch (error) {
			console.error("Error loading user progress:", error);
		} finally {
			setLoading(false);
		}
	}, [supabase]);

	useEffect(() => {
		loadUserAndProgress();
	}, [loadUserAndProgress]);

	const saveProgress = useCallback(
		async (selectedCodes: string[], courses: SemesterMapCourse[]) => {
			setIsSubmitting(true);
			try {
				if (!user) throw new Error("User not authenticated");

				//fetch courses with matching course codes
				const { data: coursesData, error: coursesError } = await supabase
					.from("courses")
					.select("id, course_code")
					.in("course_code", selectedCodes);

				if (coursesError) {
					throw new Error(`Failed to fetch courses: ${coursesError.message}`);
				}

				if (!coursesData || coursesData.length === 0) {
					throw new Error("No matching courses found in database");
				}

				const courseMap = new Map<string, string>(
					coursesData.map((course) => [course.course_code, course.id]),
				);

				const updates = selectedCodes
					.map((courseCode) => {
						const courseId = courseMap.get(courseCode);
						const courseFromMockData = courses.find(
							(c) => c.course_code === courseCode,
						);

						if (!courseId || !courseFromMockData) {
							return null;
						}

						return {
							user_id: user.id,
							course_id: courseId,
							completed: true,
							semester: courseFromMockData.semester.toString(),
							grade: null,
						};
					})
					.filter(
						(update): update is NonNullable<typeof update> => update !== null,
					);

				if (updates.length === 0) {
					throw new Error("No valid course updates to save");
				}

				const { error: deleteError } = await supabase
					.from("user_course_progress")
					.delete()
					.eq("user_id", user.id);

				if (deleteError) {
					throw new Error(
						`Failed to delete existing progress: ${deleteError.message}`,
					);
				}

				const { error: insertError } = await supabase
					.from("user_course_progress")
					.insert(updates);

				if (insertError) {
					throw new Error(`Failed to save progress: ${insertError.message}`);
				}

				setHasExistingProgress(true);
			} catch (error) {
				console.error("Error saving course progress:", error);
				throw error;
			} finally {
				setIsSubmitting(false);
			}
		},
		[user, supabase],
	);

	return {
		user,
		loading,
		hasExistingProgress,
		selectedCourses,
		setSelectedCourses,
		saveProgress,
		isSubmitting,
	};
}
