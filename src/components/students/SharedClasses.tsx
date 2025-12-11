"use client";

import React, { useMemo } from "react";
import { BookOpen } from "lucide-react";
import type { Student } from "@/types";
import { userSchedule } from "@/lib/data";

export default function SharedClassesSection({
	student,
}: Readonly<{ student: Student }>) {
	const sharedClassesDetails = useMemo(
		() =>
			student.sharedClasses.map((courseCode) => ({
				courseCode,
				times: userSchedule
					.filter((b) => b.courseCode === courseCode)
					.map((b) => `${b.day} ${b.startTime}-${b.endTime}`)
					.join(" • "),
			})),
		[student.sharedClasses],
	);

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
			<h2 className="text-lg font-bold text-blue-900 mb-4">Shared Classes</h2>

			{sharedClassesDetails.length > 0 ? (
				<div className="space-y-3">
					{sharedClassesDetails.map(({ courseCode, times }) => (
						<div
							key={courseCode}
							className="bg-gray-50 border border-gray-100 rounded-md p-4"
						>
							<div className="flex items-center gap-3">
								<div className="shrink-0 w-10 h-10 rounded-md bg-yellow-500 flex items-center justify-center">
									<BookOpen size={16} className="text-blue-900" />
								</div>
								<div className="flex-1 min-w-0">
									<h5 className="font-semibold text-gray-800">{courseCode}</h5>
									<p className="text-xs text-gray-600 mt-1">{times}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500">No shared classes</p>
			)}
		</div>
	);
}
