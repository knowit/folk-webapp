import AWS from 'aws-sdk'
AWS.config.update({ region: 'eu-central-1' })

export const range = (x: number, y: number) =>
  Array.from(
    (function* () {
      while (x <= y) yield x++
    })()
  )
export type EmployeeInformation = { 
  user_id: string, 
  guid: string, 
  navn: string, 
  manager: string, 
  title: string, 
  link: string, 
  degree: string, 
  image_key: string,
  email: string, 
  customer: string, 
  weight: number, 
  work_order_description: string}

type MergeEmployees = EmployeeInformation & {
  customerArray:  {
    customer: string, 
    wordOrderDescription: string,
    weight: number
  }[]
}

export const getYear = (): number => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  return Number(currentYear)
}

export const getWeek = (): string => { 
  const currentDate = new Date()
  const oneJan = new Date(getYear(), 0, 1)
  const numberOfDays = Math.floor((Number(currentDate) - Number(oneJan)) / (24 * 60 * 60 * 1000))
  const currentWeekNumber = Math.floor((currentDate.getDay() + 1 + numberOfDays) / 7)

  return currentWeekNumber.toString()
}

export const mergeEmployees = (allEmployees: EmployeeInformation[]): MergeEmployees[] => {
  const mergedEmployees = {}

  allEmployees.forEach((employee) => {
    const thisCustomer = {
      customer: employee.customer,
      workOrderDescription: employee.work_order_description,
      weight: employee.weight,
    }

    const employeeToMerge = mergedEmployees[employee.guid] ?? employee
    const customersForEmployee = employeeToMerge.customerArray ?? []

    mergedEmployees[employee.guid] = {
      ...employeeToMerge,
      customerArray: [thisCustomer, ...customersForEmployee],
    }
  })
  return Object.values(mergedEmployees)
}

export const statusColorCode = (wantNewProject: number, openForNewProject: number, inProject: boolean): string => {
  const projectStatus = inProject ? 'red' : 'green'
  const color = (wantNewProject > openForNewProject) ? 'yellow' : 'orange'
  const statusColor = (wantNewProject || openForNewProject) > 0 ? color : projectStatus
  
  return statusColor
}


