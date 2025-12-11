export default function SemesterProgress({
	weeksPassed,
	totalWeeks,
	testDate,
}: Readonly<{ weeksPassed: number; totalWeeks: number; testDate?: Date }>) {
	// Calculate semester dates dynamically
	const today = testDate || new Date();
	const year = today.getFullYear();
	
	// Fall semester: Sep 3 - Dec 20
	const fallStart = new Date(year, 8, 3); // September 3
	const fallEnd = new Date(year, 11, 20); // December 20
	
	// Spring semester: Jan 20 - May 16
	const springStart = new Date(year, 0, 20); // January 20
	const springEnd = new Date(year, 4, 16); // May 16
	
	let start: Date;
	let end: Date;
	
	// Determine which semester we're in
	if (today >= fallStart && today <= fallEnd) {
		start = fallStart;
		end = fallEnd;
	} else if (today >= springStart && today <= springEnd) {
		start = springStart;
		end = springEnd;
	} else if (today < springStart) {
		// Before spring, use previous year's fall
		start = new Date(year - 1, 8, 3);
		end = new Date(year - 1, 11, 20);
	} else {
		// After spring, use next year's fall
		start = new Date(year + 1, 8, 3);
		end = new Date(year + 1, 11, 20);
	}
	
	// Calculate weeks and progress
	const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	const dynamicTotalWeeks = Math.ceil(totalDays / 7);
	const daysPassed = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	const dynamicWeeksPassed = Math.max(0, Math.ceil(daysPassed / 7));
	
	// Use dynamic values if weeksPassed/totalWeeks are 0, otherwise use props
	const weeks = weeksPassed || dynamicWeeksPassed;
	const total = totalWeeks || dynamicTotalWeeks;
	const percent = Math.round((weeks / total) * 100);
	const weeksRemaining = Math.max(0, total - weeks);

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-blue-900">
					Semester progress
				</h3>
				<div className="text-sm text-yellow-600 font-medium">{percent}%</div>
			</div>

			<div className="mt-3">
				<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
					<div
						className="h-3 bg-yellow-500 transition-all duration-300 ease-in-out"
						style={{ width: `${percent}%` }}
					/>
				</div>

				<div className="mt-2 text-sm text-gray-600">
					Week {weeks} of {total} - {weeksRemaining} remaining
				</div>
			</div>
		</div>
	);
}
