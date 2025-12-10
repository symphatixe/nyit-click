import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/utils/database/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Course } from "@/lib/types";

interface UseCourseProgressReturn {
	user: User | null;
	loading: boolean;
	hasExistingProgress: boolean;
	selectedCourses: Set<string>;
	setSelectedCourses: (courses: Set<string>) => void;
	saveProgress: (selectedCodes: string[], courses: Course[]) => Promise<void>;
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

			if (!user) {
				setLoading(false);
				return;
			}
			setUser(user);

			const { data: userProgress, error } = await supabase
				.from("user_course_progress")
				.select("course_code, completed")
				.eq("user_id", user.id)
				.eq("completed", true);

			if (error) throw error;

			if (userProgress && userProgress.length > 0) {
				const completedCourses = new Set(
					userProgress.map((progress) => progress.course_code),
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
		async (selectedCodes: string[], courses: Course[]) => {
			setIsSubmitting(true);
			try {
				if (!user) throw new Error("User not authenticated");

				const updates = selectedCodes.map((courseCode) => ({
					user_id: user.id,
					course_code: courseCode,
					completed: true,
					semester: courses.find((c) => c.code === courseCode)?.semester || 1,
				}));

				// Delete existing progress
				const { error: deleteError } = await supabase
					.from("user_course_progress")
					.delete()
					.eq("user_id", user.id);

				if (deleteError) throw deleteError;

				// Insert new progress
				if (updates.length > 0) {
					const { error: insertError } = await supabase
						.from("user_course_progress")
						.insert(updates);

					if (insertError) throw insertError;
				}

				setHasExistingProgress(true);
			} catch (error) {
				console.error("Error saving course progress:", error);
				throw error; // Re-throw so component can handle
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
