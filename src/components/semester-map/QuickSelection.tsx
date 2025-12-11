import type { SemesterMapCourse } from "@/lib/types";
import { getSemestersInYear } from "@/lib/utils/semester/courseGrouping";

interface QuickSelectionProps {
	coursesBySemester: Record<number, SemesterMapCourse[]>;
	isSemesterSelected: (semesterCourses: SemesterMapCourse[]) => boolean;
	toggleSemester: (semesterCourses: SemesterMapCourse[]) => void;
	toggleYear: (
		coursesBySemester: Record<number, SemesterMapCourse[]>,
		semesterNumbers: number[],
	) => void;
}

export default function QuickSelection({
	coursesBySemester,
	isSemesterSelected,
	toggleSemester,
	toggleYear,
}: Readonly<QuickSelectionProps>) {
	const years = [1, 2, 3, 4];
	const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

	const isYearFullySelected = (year: number) => {
		const semestersInYear = getSemestersInYear(year);
		return semestersInYear.every((sem) =>
			isSemesterSelected(coursesBySemester[sem] || []),
		);
	};

	return (
		<section className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
			<h3 className="font-semibold text-blue-900 mb-3">Quick Selection</h3>

			<div className="space-y-3">
				<div>
					<p className="text-sm text-gray-700 mb-2">Select by Year:</p>
					<div className="flex flex-wrap gap-2">
						{years.map((year) => {
							const semestersInYear = getSemestersInYear(year);
							const allYearSelected = isYearFullySelected(year);

							return (
								<button
									key={year}
									type="button"
									onClick={() => toggleYear(coursesBySemester, semestersInYear)}
									className={`text-sm py-2 px-4 rounded transition-colors duration-200 ${
										allYearSelected
											? "bg-green-600 hover:bg-green-700 text-white"
											: "bg-primary hover:bg-secondary text-white"
									}`}
									aria-pressed={allYearSelected}
								>
									Year {year} {allYearSelected ? "✓" : ""}
								</button>
							);
						})}
					</div>
				</div>

				<div className="pt-2 border-t border-blue-300">
					<p className="text-sm text-gray-700 mb-2">
						Toggle Individual Semesters:
					</p>
					<div className="flex flex-wrap gap-2">
						{semesters.map((sem) => {
							const semesterCourses = coursesBySemester[sem] || [];
							const isSelected = isSemesterSelected(semesterCourses);

							return (
								<button
									key={sem}
									type="button"
									onClick={() => toggleSemester(semesterCourses)}
									className={`text-sm py-1 px-3 rounded transition-colors duration-200 ${
										isSelected
											? "bg-green-600 hover:bg-green-700 text-white"
											: "bg-gray-200 hover:bg-gray-300 text-gray-800"
									}`}
									aria-pressed={isSelected}
								>
									Semester {sem}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
