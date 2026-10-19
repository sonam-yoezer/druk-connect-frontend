export const AVAILABILITY_DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] as const;
export type AvailabilityDay = typeof AVAILABILITY_DAYS[number];
export function availabilityDays(value: string): AvailabilityDay[] {
  if (value === "BOTH") return [...AVAILABILITY_DAYS];
  if (value === "WEEKDAYS") return AVAILABILITY_DAYS.slice(0, 5);
  if (value === "WEEKENDS") return AVAILABILITY_DAYS.slice(5);
  const selected = value.split(",").map(day => day.trim().toUpperCase());
  return AVAILABILITY_DAYS.filter(day => selected.includes(day));
}
export function formatAvailabilityDays(value: string): string {
  return availabilityDays(value).map(day => day[0] + day.slice(1).toLowerCase()).join(", ");
}
