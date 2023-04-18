import { Box, Button, styled } from '@mui/material'
import React, { FC } from 'react'
import { Dayjs } from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const StyledDateField = styled(DateField<Dayjs>)(({ theme }) => ({
  backgroundColor: 'white',
  width: '100%'
}))

const StyledDateCalendar = styled(DateCalendar<Dayjs>)(({ theme }) => ({
  backgroundColor: 'white'
}))

type DateRangePickerProps = {
  onSubmit: (startDate?: Date, endDate?: Date) => void
}

export const DateRangePicker: FC<DateRangePickerProps> = ({ onSubmit }) => {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null)
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null)

  const submitButtonFn = () => {
    // Submit the dates
    const start = startDate?.toDate() || undefined
    const end = endDate?.toDate() || undefined

    onSubmit(start, end)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Box padding={'0.5rem'} >
        <Box display={'flex'} gap={'10px'} padding={'0.5rem'} justifyContent={'center'}>
          <StyledDateField
            label='Start'
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            format='DD.MM.YYYY'
          />
          <StyledDateField
            label='Slutt'
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            format='DD.MM.YYYY'
          />
        </Box>
        <Box display={'flex'} gap={'10px'} padding={'0.5rem'} justifyContent={'center'}>
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
        <Button variant='contained' onClick={submitButtonFn}>Lagre</Button>
      </Box>
    </LocalizationProvider>

  )
}
