"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Courses } from "@/lib/data";
import { useCourseProgress } from "@/lib/hooks/useCourseProgress";
import { useCourseSelection } from "@/lib/hooks/useCourseSelection";
import { groupCoursesBySemester } from "@/lib/utils/semester/courseGrouping";
import QuickSelection from "./QuickSelection";
import SemesterGrid from "./SemesterGrid";
import ProgressSummary from "./ProgressSummary";

interface SemesterMapProps {
	onSubmit: () => void;
	onCancel?: () => void;
}

export default function SemesterMap({
	onSubmit,
	onCancel,
}: Readonly<SemesterMapProps>) {
	const [showComponent, setShowComponent] = useState(true);

	const {
		loading,
		hasExistingProgress,
		selectedCourses: savedCourses,
		saveProgress,
		isSubmitting,
	} = useCourseProgress();

	const {
		selectedCourses,
		toggleCourse,
		toggleSemester,
		toggleYear,
		isSemesterSelected,
		setSelection,
	} = useCourseSelection(savedCourses);

	useEffect(() => {
		if (savedCourses.size > 0) {
			setSelection(savedCourses);
		}
	}, [savedCourses, setSelection]);

	useEffect(() => {
		if (hasExistingProgress && !loading) {
			setShowComponent(false);
		}
	}, [hasExistingProgress, loading]);

	const coursesBySemester = groupCoursesBySemester(Courses);

	const handleSubmit = async () => {
		try {
			await saveProgress(Array.from(selectedCourses), Courses);
			onSubmit();
		} catch (error) {
			console.error("Error saving course progress:", error);
			alert("Error saving course progress. Please try again.");
		}
	};

	if (loading) {
		return (
			<div className="max-w-6xl mx-auto p-6">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-maincolor" />
					<p className="mt-4 text-muted-foreground">
						Loading your course progress...
					</p>
				</div>
			</div>
		);
	}

	if (!showComponent && hasExistingProgress) {
		return (
			<div className="max-w-6xl mx-auto p-6">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="inline-flex items-center gap-2 bg-card border border-border text-maincolor px-4 py-2 rounded-lg hover:bg-muted transition-colors font-medium mb-6"
					>
						<ArrowLeft size={18} />
						Back
					</button>
				)}

				<div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
					<p className="text-green-800 mb-4">
						✓ Your course progress has been saved!
					</p>
					<button
						type="button"
						onClick={() => setShowComponent(true)}
						className="bg-maincolor hover:bg-maincolor-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
					>
						Update Course Progress
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto p-6">
			<div className="relative mb-8">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 bg-card border border-border text-maincolor px-4 py-2 rounded-lg hover:bg-muted transition-colors font-medium"
						aria-label="Go back"
					>
						<ArrowLeft size={18} />
						Back
					</button>
				)}

				<h1 className="text-4xl font-bold text-maincolor text-center">
					Semester Map
				</h1>
			</div>

			<QuickSelection
				coursesBySemester={coursesBySemester}
				isSemesterSelected={isSemesterSelected}
				toggleSemester={toggleSemester}
				toggleYear={toggleYear}
			/>

			<SemesterGrid
				coursesBySemester={coursesBySemester}
				selectedCourses={selectedCourses}
				isSemesterSelected={isSemesterSelected}
				toggleCourse={toggleCourse}
				toggleSemester={toggleSemester}
			/>

			<ProgressSummary
				courses={Courses}
				selectedCourses={selectedCourses}
				isSubmitting={isSubmitting}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}
