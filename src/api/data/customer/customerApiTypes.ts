// customerCards
interface CustomerCardData {
  customer: string
  consultants: number
  billedLastPeriod: number
  billedTotal: number
}

export type CustomerCardResponse = CustomerCardData[]

// hoursBilledPerCustomer
interface BilledCustomer {
  kunde: string
  timer: number
}

export interface HoursBilledPerCustomerResponse {
  setNames: string[]
  sets: Record<string, BilledCustomer[]>
}

// hoursBilledPerWeek
interface BilledWeek {
  id: string
  data: { x: number; y: number }[]
}

export interface HoursBilledPerWeekResponse {
  setNames: string[]
  sets: Record<string, BilledWeek[]>
}
