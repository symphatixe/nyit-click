"use client";
import { useState, useEffect } from "react";
import { Courses } from "@/lib/mockData";
import { useCourseProgress } from "@/lib/hooks/useCourseProgress";
import { useCourseSelection } from "@/lib/hooks/useCourseSelection";
import { groupCoursesBySemester } from "@/lib/utils/semester/courseGrouping";
import QuickSelection from "./QuickSelection";
import SemesterGrid from "./SemesterGrid";
import ProgressSummary from "./ProgressSummary";

interface SemesterMapProps {
	onSubmit: (completedCourses: string[]) => void;
	onDismiss?: () => void;
}

export default function SemesterMap({
	onSubmit,
	onDismiss,
}: Readonly<SemesterMapProps>) {
	const [showComponent, setShowComponent] = useState(true);

	const {
		user,
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

	//sync savedCourses with selectedCourses when data loads
	useEffect(() => {
		if (savedCourses.size > 0) {
			setSelection(savedCourses);
		}
	}, [savedCourses, setSelection]);

	//hide component if user has existing progress
	useEffect(() => {
		if (hasExistingProgress && !loading) {
			setShowComponent(false);
		}
	}, [hasExistingProgress, loading]);

	const coursesBySemester = groupCoursesBySemester(Courses);

	const handleSubmit = async () => {
		try {
			await saveProgress(Array.from(selectedCourses), Courses);
			onSubmit(Array.from(selectedCourses));
			setShowComponent(false);
			if (onDismiss) {
				onDismiss();
			}
		} catch (error) {
			alert("Error saving course progress. Please try again.");
		}
	};

	//loading state
	if (loading) {
		return (
			<div className="max-w-6xl mx-auto p-6">
				<div className="text-center">Loading your course progress...</div>
			</div>
		);
	}

	
	if (!user) {
		return (
			<div className="max-w-6xl mx-auto p-6">
				<div className="text-center text-red-600">
					Please log in to view your semester map.
				</div>
			</div>
		);
	}

	//success state - show when component is hidden and user has progress
	if (!showComponent && hasExistingProgress) {
		return (
			<div className="max-w-6xl mx-auto p-6">
				<div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
					<p className="text-green-800 mb-4">
						✓ Your course progress has been saved!
					</p>
					<button
						type="button"
						onClick={() => setShowComponent(true)}
						className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
					>
						Update Course Progress
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4 text-center">Semester Map</h1>

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
