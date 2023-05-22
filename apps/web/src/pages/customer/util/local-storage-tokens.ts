export const getPeriodStartDate = () => {
  const selectedPeriodStartDate = localStorage.getItem(
    'selectedPeriodStartDate'
  )
  if (selectedPeriodStartDate) {
    return new Date(JSON.parse(selectedPeriodStartDate))
  } else {
    return null
  }
}

export const getPeriodEndDate = () => {
  const selectedPeriodEndDate = localStorage.getItem('selectedPeriodEndDate')
  if (selectedPeriodEndDate) {
    return new Date(JSON.parse(selectedPeriodEndDate))
  } else {
    return null
  }
}

export const setPeriodStartDate = (selectedPeriodStartDate) => {
  if (selectedPeriodStartDate !== null) {
    localStorage.setItem(
      'selectedPeriodStartDate',
      JSON.stringify(selectedPeriodStartDate)
    )
  } else {
    if (localStorage.getItem('selectedPeriodStartDate')) {
      localStorage.removeItem('selectedPeriodStartDate')
    }
  }
}

export const setPeriodEndDate = (selectedPeriodEndDate) => {
  if (selectedPeriodEndDate !== null) {
    localStorage.setItem(
      'selectedPeriodEndDate',
      JSON.stringify(selectedPeriodEndDate)
    )
  } else {
    if (localStorage.getItem('selectedPeriodEndDate')) {
      localStorage.removeItem('selectedPeriodEndDate')
    }
  }
}

export default {
  getPeriodStartDate,
  getPeriodEndDate,
  setPeriodStartDate,
  setPeriodEndDate,
}
