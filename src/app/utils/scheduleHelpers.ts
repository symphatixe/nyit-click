export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const calculatePosition = (startTime: string, endTime: string) => {
  const dayStart = 8 * 60; // 8:00 AM in minutes
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  
  const top = ((start - dayStart) / 60) * 80; // 80px per hour
  const height = ((end - start) / 60) * 80;
  
  return { top, height };
};
