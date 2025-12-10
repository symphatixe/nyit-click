import { ValidTimeString } from "@/utils/validators";

export function formatMilitaryTime(time: string): string {
	if (!ValidTimeString(time)) return "--:-- --";
	const [hours, minutes] = time.split(":").map(Number) as [number, number];

	const period = hours >= 12 ? "PM" : "AM";
	const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
	const paddedMinutes = minutes.toString().padStart(2, "0");

	return `${adjustedHours}:${paddedMinutes} ${period}`;
}

export function timeToMinutes(time: string): number {
	if (!ValidTimeString(time)) return 0;
	const [hours, minutes] = time.split(":").map(Number) as [number, number];

	return hours * 60 + minutes;
}

export function formatTimeRange(startTime: string, endTime: string): string {
	return `${formatMilitaryTime(startTime)} - ${formatMilitaryTime(endTime)}`;
}
