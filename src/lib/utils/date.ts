export function getWeeksBetween(startDate: Date, endDate: Date): number {
	const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;
	const diffMs = endDate.getTime() - startDate.getTime();
	return Math.max(1, Math.ceil(diffMs / MS_PER_WEEK));
}

export function getWeeksPassed(
	startDate: Date,
	currentDate: Date = new Date(),
	maxWeeks?: number,
): number {
	if (currentDate < startDate) return 0;

	const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;
	const diffMs = currentDate.getTime() - startDate.getTime();
	const weeksPassed = Math.floor(diffMs / MS_PER_WEEK) + 1;

	return maxWeeks ? Math.min(maxWeeks, weeksPassed) : weeksPassed;
}

export function getProgressPercentage(
	startDate: Date,
	endDate: Date,
	currentDate: Date = new Date(),
): number {
	const totalWeeks = getWeeksBetween(startDate, endDate);
	const weeksPassed = getWeeksPassed(startDate, currentDate, totalWeeks);
	return Math.round((weeksPassed / totalWeeks) * 100);
}
