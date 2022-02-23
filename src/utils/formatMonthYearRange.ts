import { formatMonthYear } from './formatMonthYear'

export function formatMonthYearRange(
  fromMonth: number | undefined,
  fromYear: number,
  toMonth: number | undefined,
  toYear: number
): string {
  return [
    formatMonthYear(fromMonth, fromYear),
    formatMonthYear(toMonth, toYear),
  ]
    .filter(Boolean)
    .join('–')
}
