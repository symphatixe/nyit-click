import type { SemesterMapCourse } from "@/lib/types";
import { calculateTotalCredits } from "@/lib/utils/semester/courseGrouping";

interface ProgressSummaryProps {
	courses: SemesterMapCourse[];
	selectedCourses: Set<string>;
	isSubmitting: boolean;
	onSubmit: () => void;
}

export default function ProgressSummary({
	courses,
	selectedCourses,
	isSubmitting,
	onSubmit,
}: Readonly<ProgressSummaryProps>) {
	const totalCredits = calculateTotalCredits(courses, selectedCourses);
	const selectedCodesArray = Array.from(selectedCourses);

	return (
		<section className="mt-8 space-y-6">
			<div className="text-center">
				<div className="inline-flex items-center gap-8 bg-gray-50 rounded-lg px-8 py-4 border border-gray-200">
					<div>
						<p className="text-sm text-gray-600 mb-1">Selected Courses</p>
						<p className="text-3xl font-bold text-blue-900">
							{selectedCourses.size}
						</p>
					</div>
					<div className="w-px h-12 bg-gray-300" />
					<div>
						<p className="text-sm text-gray-600 mb-1">Total Credits</p>
						<p className="text-3xl font-bold text-blue-900">{totalCredits}</p>
					</div>
				</div>
			</div>

			{selectedCodesArray.length > 0 && (
				<div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
					<h3 className="text-sm font-semibold text-gray-700 mb-3">
						Selected Courses:
					</h3>
					<div className="flex flex-wrap gap-2">
						{selectedCodesArray.map((code) => {
							const course = courses.find((c) => c.course_code === code);
							return (
								<div
									key={code}
									className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium"
								>
									<span>{code}</span>
									{course && (
										<span className="text-xs opacity-75">
											({course.credits} cr)
										</span>
									)}
								</div>
							);
						})}
					</div>
				</div>
			)}

			<div className="text-center">
				<button
					type="button"
					onClick={onSubmit}
					disabled={isSubmitting || selectedCourses.size === 0}
					className="bg-primary hover:bg-secondary disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
				>
					{isSubmitting ? "Saving..." : "Save Course Progress"}
				</button>
				<p className="text-sm text-gray-500 mt-2">
					{selectedCourses.size === 0
						? "Select courses to save your progress"
						: "Click to save your selections"}
				</p>
			</div>
		</section>
	);
}
