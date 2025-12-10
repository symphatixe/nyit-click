export default function SemesterProgress({
	weeksPassed,
	totalWeeks,
}: Readonly<{ weeksPassed: number; totalWeeks: number }>) {
	const percent = Math.round((weeksPassed / totalWeeks) * 100);
	const weeksRemaining = Math.max(0, totalWeeks - weeksPassed);

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
					Week {weeksPassed} of {totalWeeks} - {weeksRemaining} remaining
				</div>
			</div>
		</div>
	);
}
