import type { GroupedCourse } from "@/types";
import { occursToday } from "@/utils/scheduling/schedule";
import ClassCard from "@/components/profile/ClassCard";

export default function ClassSchedule({
	courses,
	todayIndex,
}: Readonly<{ courses: GroupedCourse[]; todayIndex: number }>) {
	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-blue-900">Class schedule</h3>
				<div className="text-sm text-gray-600">
					{courses.length} {courses.length === 1 ? "class" : "classes"}
				</div>
			</div>

			<div className="mt-4 space-y-3">
				{courses.length > 0 ? (
					courses.map((course) => {
						const isToday = course.times.some((timeSlot) =>
							occursToday(timeSlot.days, todayIndex),
						);

						return (
							<ClassCard
								key={course.courseCode}
								course={course}
								isToday={isToday}
							/>
						);
					})
				) : (
					<div className="text-center py-8 text-gray-500">
						No classes scheduled
					</div>
				)}
			</div>
		</div>
	);
}
