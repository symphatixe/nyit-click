type Day = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export const DAY_TO_INDEX: Record<Day, number> = {
	SUN: 0,
	MON: 1,
	TUE: 2,
	WED: 3,
	THU: 4,
	FRI: 5,
	SAT: 6,
} as const;

export function occursToday(days: string[], todayIndex: number): boolean {
	return days.some((day) => DAY_TO_INDEX[day as Day] === todayIndex);
}

export function sortDaysChronologically(days: string[]): string[] {
	return [...days].sort(
		(a, b) => DAY_TO_INDEX[a as Day] - DAY_TO_INDEX[b as Day],
	);
}
