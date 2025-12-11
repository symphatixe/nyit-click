import React from "react";

export default function ScheduleSummary({
	semester,
	courses,
}: Readonly<{ semester: string; courses: string[] }>) {
	if (courses.length === 0) return null;

	return (
		<div className="bg-gray-50 rounded-md border border-gray-100 p-4 mb-6">
			<div className="flex items-center gap-3 mb-4">
				<h4 className="text-sm font-semibold text-gray-800">
					Your {semester} Schedule
				</h4>
				<div className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
					{courses.length} classes
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				{courses.map((courseCode) => (
					<div
						key={courseCode}
						className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold"
					>
						{courseCode}
					</div>
				))}
			</div>
		</div>
	);
}
