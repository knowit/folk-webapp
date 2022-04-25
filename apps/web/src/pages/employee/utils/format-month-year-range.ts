import { formatMonthYear } from './format-month-year'

export function formatMonthYearRange(
  fromMonth: number,
  fromYear: number,
  toMonth: number,
  toYear: number
): string {
  return [
    formatMonthYear(fromMonth, fromYear),
    formatMonthYear(toMonth, toYear),
  ]
    .filter(Boolean)
    .join('–')
}
