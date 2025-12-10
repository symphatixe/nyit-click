export const validators = {
	time: /^([01]?\d|2[0-3]):([0-5]\d)$/,
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export function ValidTimeString(time: unknown): boolean {
	return typeof time === "string" && validators.time.test(time);
}
