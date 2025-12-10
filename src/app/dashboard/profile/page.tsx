"use client";

import WelcomeHeader from "@/components/profile/WelcomeHeader";
import ProfilePic from "@/components/common/ProfilePicture";
import SemesterProgress from "@/components/profile/SemesterProgress";
import ClassSchedule from "@/components/profile/ClassSchedule";
import { mockSchedule } from "@/lib/mockData";
import { useGroupedSchedule } from "@/lib/hooks/useGroupedSchedule";
import { getWeeksBetween, getWeeksPassed } from "@/lib/utils/date";

export default function Profile() {
	const semesterStart = new Date("2025-08-25");
	const semesterEnd = new Date("2025-12-12");

	const totalWeeks = getWeeksBetween(semesterStart, semesterEnd);
	const weeksPassed = getWeeksPassed(semesterStart, new Date(), totalWeeks);
	const groupedCourses = useGroupedSchedule(mockSchedule);

	const todayIndex = new Date().getDay();

	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			<div className="flex items-center justify-between gap-6">
				<div className="flex-1">
					<WelcomeHeader />
				</div>
				<div className="shrink-0">
					<ProfilePic />
				</div>
			</div>

			<div className="mt-8">
				<SemesterProgress weeksPassed={weeksPassed} totalWeeks={totalWeeks} />
			</div>

			<div className="mt-6">
				<ClassSchedule courses={groupedCourses} todayIndex={todayIndex} />
			</div>
		</div>
	);
}
