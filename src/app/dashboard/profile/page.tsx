"use client";

import WelcomeHeader from "@/components/profile/WelcomeHeader";
import ProfilePic from "@/components/common/ProfilePicture";
import ProfileBio from "@/components/profile/ProfileBio";
import SemesterProgress from "@/components/profile/SemesterProgress";
import ClassSchedule from "@/components/profile/ClassSchedule";
import { userSchedule } from "@/lib/data";
import { useGroupedSchedule } from "@/lib/hooks/useGroupedSchedule";
import { getWeeksBetween, getWeeksPassed } from "@/lib/utils/date";
import LogoutButton from "@/components/authentication/Logout";

export default function Profile() {
	const semesterStart = new Date("2025-08-25");
	const semesterEnd = new Date("2025-11-12");

	const totalWeeks = getWeeksBetween(semesterStart, semesterEnd);
	const weeksPassed = getWeeksPassed(semesterStart, new Date(), totalWeeks);
	const groupedCourses = useGroupedSchedule(userSchedule);

	const todayIndex = new Date().getDay();

	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			<div className="flex items-center justify-between gap-6">
				<div className="flex-1">
					<WelcomeHeader />
				</div>
				<div className="shrink-0 flex flex-col items-center gap-2">
					<ProfilePic />
					<LogoutButton />
				</div>
			</div>

			<div className="mt-8">
				{/*Strictly for testing purposes <SemesterProgress weeksPassed={0} totalWeeks={0} testDate={new Date('2025-010-10')} /> */}

				<SemesterProgress weeksPassed={0} totalWeeks={0} />
			</div>

			<div className="mt-6">
				<ProfileBio />
			</div>

			<div className="mt-6">
				<ClassSchedule courses={groupedCourses} todayIndex={todayIndex} />
			</div>
		</div>
	);
}
