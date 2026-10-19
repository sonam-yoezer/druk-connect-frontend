import { AVAILABILITY_DAYS, type AvailabilityDay } from "../utils/availability";
export function AvailabilityDaysField({ value, onChange, disabled = false }: {
  value: AvailabilityDay[]; onChange: (days: AvailabilityDay[]) => void; disabled?: boolean;
}) {
  return <fieldset disabled={disabled} className="space-y-3">
    <legend className="text-sm font-medium text-ink">Availability</legend>
    <p className="text-xs text-muted">Select one or more days.</p>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{AVAILABILITY_DAYS.map(day => <label key={day} className="flex items-center gap-2 text-sm text-ink">
      <input type="checkbox" name="availability" value={day} checked={value.includes(day)} onChange={event => onChange(AVAILABILITY_DAYS.filter(item => item === day ? event.target.checked : value.includes(item)))} className="accent-brand" />
      {day[0] + day.slice(1).toLowerCase()}
    </label>)}</div>
  </fieldset>;
}
