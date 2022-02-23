const months = [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember',
]

export function formatMonthYear(
  month: number | undefined,
  year: number
): string | undefined {
  if (year === -1) {
    return
  }
  if (!month || month <= 0) {
    return year.toString()
  }
  return `${months[month - 1]} ${year}`
}
