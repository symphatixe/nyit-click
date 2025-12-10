import type { GroupedCourse } from "@/types";
import { formatTimeRange } from "@/utils/scheduling/time";
import { sortDaysChronologically } from "@/utils/scheduling/schedule";

export default function ClassCard({
	course,
	isToday,
}: Readonly<{ course: GroupedCourse; isToday: boolean }>) {
	return (
		<div className="bg-gray-50 border border-gray-100 rounded-md p-3">
			<div className="flex items-start justify-between">
				<div className="min-w-0">
					<div className="text-sm font-semibold text-gray-800 truncate">
						{course.courseCode} — {course.courseName}
					</div>

					<div className="mt-1 space-y-1">
						{course.times.map((timeSlot, index) => (
							<div key={"course" + index} className="text-xs text-gray-500">
								<span className="font-medium text-gray-700">
									{sortDaysChronologically(timeSlot.days).join(" ")}
								</span>

								{" • "}
								{formatTimeRange(timeSlot.startTime, timeSlot.endTime)}

								{" • Room: "}
								<span className="font-medium text-gray-700">
									{timeSlot.room}
								</span>
							</div>
						))}
					</div>
				</div>

				{isToday && (
					<div className="ml-4 px-3 py-1 rounded-md bg-blue-900 text-white text-sm font-semibold shrink-0">
						Today
					</div>
				)}
			</div>
		</div>
	);
}
