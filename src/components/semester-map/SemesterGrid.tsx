import type { SemesterMapCourse } from "@/types";
import CourseCard from "./CourseCard";

interface SemesterGridProps {
	coursesBySemester: Record<number, SemesterMapCourse[]>;
	selectedCourses: Set<string>;
	isSemesterSelected: (semesterCourses: SemesterMapCourse[]) => boolean;
	toggleCourse: (courseCode: string) => void;
	toggleSemester: (semesterCourses: SemesterMapCourse[]) => void;
}

export default function SemesterGrid({
	coursesBySemester,
	selectedCourses,
	isSemesterSelected,
	toggleCourse,
	toggleSemester,
}: Readonly<SemesterGridProps>) {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{Object.entries(coursesBySemester).map(([semester, semesterCourses]) => {
				const isFullySelected = isSemesterSelected(semesterCourses);

				return (
					<div
						key={semester}
						className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200"
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-blue-600">
								Semester {semester}
							</h2>
							<button
								type="button"
								onClick={() => toggleSemester(semesterCourses)}
								className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors"
								aria-label={`${
									isFullySelected ? "Deselect" : "Select"
								} all courses in semester ${semester}`}
							>
								{isFullySelected ? "Deselect" : "Select"} All
							</button>
						</div>

						<div className="space-y-3">
							{semesterCourses.map((course) => (
								<CourseCard
									key={course.course_code}
									course={course}
									isSelected={selectedCourses.has(course.course_code)}
									onToggle={() => toggleCourse(course.course_code)}
								/>
							))}
						</div>
					</div>
				);
			})}
		</section>
	);
}
