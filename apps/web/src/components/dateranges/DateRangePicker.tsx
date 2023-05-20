import { Box, Button, styled } from '@mui/material'
import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const StyledDateField = styled(DateField<Dayjs>)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  width: '100%',
}))

const StyledDateCalendar = styled(DateCalendar<Dayjs>)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}))

const ComponentRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: 10,
}))

type DateRangePickerProps = {
  startDate: Date
  endDate: Date
  onSubmit: (startDate?: Date, endDate?: Date) => void
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  onSubmit,
  startDate: initialStartDate,
  endDate: initialEndDate,
}) => {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    initialStartDate ? dayjs(initialStartDate) : null
  )
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    initialEndDate ? dayjs(initialEndDate) : null
  )

  const submitButtonFn = () => {
    // Submit the dates
    const start = startDate?.add(1, 'hour').toDate() || null
    const end = endDate?.add(1, 'hour').toDate() || null

    onSubmit(start, end)
  }

  const resetButtonFn = () => {
    onSubmit(null, null)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ComponentRoot>
        <Box
          display={'flex'}
          gap={'10px'}
          padding={'0.5rem'}
          justifyContent={'center'}
        >
          <StyledDateField
            label="Start"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            format="DD.MM.YYYY"
          />
          <StyledDateField
            label="Slutt"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            format="DD.MM.YYYY"
          />
        </Box>
        <Box
          display={'flex'}
          gap={'10px'}
          padding={'0.5rem'}
          justifyContent={'center'}
        >
          <StyledDateCalendar
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            displayWeekNumber
          />
          <StyledDateCalendar
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            displayWeekNumber
          />
        </Box>
        <Button variant="contained" onClick={submitButtonFn}>
          Lagre
        </Button>
        <Button variant="contained" onClick={resetButtonFn}>
          Nullstill
        </Button>
      </ComponentRoot>
    </LocalizationProvider>
  )
}
