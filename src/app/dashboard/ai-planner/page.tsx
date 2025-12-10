"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import AcademicProfileForm from "@/components/planner/AcademicProfileForm";
import ScheduleGrid from "@/components/planner/ScheduleGrid";
import type {
	AcademicProfile,
	SchedulePreferences,
	ScheduleBlock,
} from "@/types";
import { generateSchedule } from "@/lib/services/scheduleMatch";

export default function PlannerPage() {
	const [loading, setLoading] = useState(false);
	const [schedule, setSchedule] = useState<ScheduleBlock[]>([]);
	const [profile, setProfile] = useState<AcademicProfile>({
		major: "Computer Science",
		enrollmentYear: "2021",
		completedCourses: ["CSCI 185", "MATH180", "CHEM105"],
	});

	const [preferences, setPreferences] = useState<SchedulePreferences>({
		noWeekendClasses: true,
		noLateNightClasses: true,
		noMultipleDaysWithLateClasses: true,
		additionalPreferences: "",
	});

	const handleGenerateSchedule = async () => {
		setLoading(true);
		try {
			const result = await generateSchedule(profile, preferences);
			setSchedule(result);
		} catch (error) {
			console.error("Error generating schedule:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-8 py-8">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-4xl font-bold text-blue-900">PLAN YOUR SCHEDULE</h1>
				<div className="text-right">
					<p className="text-sm text-gray-600">
						Your Major: Computer Science B.S
					</p>
					<button className="mt-2 bg-white border-2 border-blue-900 text-blue-900 px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-blue-50">
						<Calendar size={16} />
						VIEW YOUR SEMESTER MAP
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
				<AcademicProfileForm
					profile={profile}
					setProfile={setProfile}
					preferences={preferences}
					setPreferences={setPreferences}
					onGenerate={handleGenerateSchedule}
					loading={loading}
				/>

				{schedule.length > 0 ? (
					<ScheduleGrid schedule={schedule} />
				) : (
					<div className="bg-white rounded-lg border border-gray-200 p-12 flex items-center justify-center">
						<div className="text-center text-gray-400">
							<Calendar size={48} className="mx-auto mb-4 opacity-50" />
							<p className="text-lg">Generate your schedule to see it here</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
