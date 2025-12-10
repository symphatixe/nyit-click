import { useMemo } from "react";
import type { ScheduleEntry, GroupedCourse, CourseTimeSlot } from "@/types";

export function useGroupedSchedule(schedule: ScheduleEntry[]): GroupedCourse[] {
	return useMemo(() => {
		const courseMap = new Map<
			string,
			{
				courseCode: string;
				courseName: string;
				occurrences: {
					day: string;
					startTime: string;
					endTime: string;
					room: string;
				}[];
			}
		>();

		for (const entry of schedule) {
			const key = `${entry.courseCode}||${entry.courseName}`;

			if (!courseMap.has(key)) {
				courseMap.set(key, {
					courseCode: entry.courseCode,
					courseName: entry.courseName,
					occurrences: [],
				});
			}

			courseMap.get(key)!.occurrences.push({
				day: entry.day,
				startTime: entry.startTime,
				endTime: entry.endTime,
				room: entry.room,
			});
		}

		return Array.from(courseMap.values()).map((course) => {
			const timeSlotMap = new Map<string, CourseTimeSlot>();

			for (const occurrence of course.occurrences) {
				const timeKey = `${occurrence.startTime}||${occurrence.endTime}||${occurrence.room}`;

				if (!timeSlotMap.has(timeKey)) {
					timeSlotMap.set(timeKey, {
						days: [],
						startTime: occurrence.startTime,
						endTime: occurrence.endTime,
						room: occurrence.room,
					});
				}

				timeSlotMap.get(timeKey)!.days.push(occurrence.day);
			}

			return {
				courseCode: course.courseCode,
				courseName: course.courseName,
				times: Array.from(timeSlotMap.values()),
			};
		});
	}, [schedule]);
}
