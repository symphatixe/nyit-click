import type { SemesterMapCourse } from "@/types";

interface CourseCardProps {
	course: SemesterMapCourse;
	isSelected: boolean;
	onToggle: () => void;
}

export default function CourseCard({
	course,
	isSelected,
	onToggle,
}: Readonly<CourseCardProps>) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
				isSelected
					? "bg-green-100 border-green-500 shadow-md"
					: "bg-gray-50 border-gray-300 hover:bg-gray-100"
			}`}
			aria-pressed={isSelected}
			aria-label={`${isSelected ? "Deselect" : "Select"} ${
				course.course_code
			} - ${course.name}`}
		>
			<div className="flex items-center justify-between">
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-gray-800 truncate">
						{course.course_code}
					</h3>
					<p className="text-sm text-gray-600 truncate">{course.name}</p>
				</div>

				<div className="flex items-center gap-2 shrink-0">
					<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded whitespace-nowrap">
						{course.credits} {course.credits === 1 ? "credit" : "credits"}
					</span>
					<div
						className={`w-4 h-4 rounded-full border-2 transition-colors ${
							isSelected
								? "bg-green-500 border-green-600"
								: "bg-white border-gray-400"
						}`}
						aria-hidden="true"
					/>
				</div>
			</div>
		</button>
	);
}
