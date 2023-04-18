import { Box, Button, Popover, styled, TextField } from '@material-ui/core'
import React, { FC, useState } from 'react'
import Calendar from 'react-calendar'


const StyledBox = styled(Box)(({ theme }) => ({
  // Style the container holding the calendar here
  maxWidth: '600px',
  margin: 'auto',
  marginTop: '20px',
  backgroundColor: theme.palette.primary.light,
  padding: '10px',
  borderRadius: '3px',

  // Style the different internal components of the Calendar. This is highly specific to the react-calendar library

  '& .react-calendar': {
    width: '100%',
    maxWidth: '100%',
    background: 'white',
    border: '1px solid #a0a096',
    fontFamily: 'Arial, Helvetica, sans-serif',
    lineHeight: '1.125em',
  },

  '& .react-calendar--doubleView': {
    width: '700px'
  },

  '& .react-calendar--doubleView .react-calendar__viewContainer': {
    display: 'flex',
    margin: '-0.5em'
  },

  '& .react-calendar--doubleView .react-calendar__viewContainer > *': {
    width: '50%',
    margin: '0.5em',
  },

  '& .react-calendar, & .react-calendar *, & .react-calendar *:before, & .react-calendar *:after': {
    '-moz-box-sizing': 'border-box',
    '-webkit-box-sizing': 'border-box',
    'box-sizing': 'border-box',
  },

  '& .react-calendar button': {
    margin: 0,
    border: 0,
    outline: 'none',
  },

  '& .react-calendar button:enabled:hover': {
    cursor: 'pointer',
  },

  '& .react-calendar__navigation': {
    display: 'flex',
    height: '44px',
    marginBottom: '1em',
  },

  '& .react-calendar__navigation button': {
    minWidth: '44px',
    background: 'none',
  },

  '& .react-calendar__navigation button:disabled': {
    backgroundColor: '#f0f0f0',
  },

  '& .react-calendar__navigation button:enabled:hover, & .react-calendar__navigation button:enabled:focus': {
    backgroundColor: '#e6e6e6',
  },

  '& .react-calendar__month-view__weekdays': {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.75em',
  },

  '& .react-calendar__month-view__weekdays__weekday': {
    padding: '0.5em',
  },

  '& .react-calendar__month-view__weekNumbers .react-calendar__tile': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75em',
    fontWeight: 'bold',
  },

  '& .react-calendar__month-view__days__day--weekend': {
    color: '#d10000',
  },

  '& .react-calendar__month-view__days__day--neighboringMonth': {
    color: '#757575',
  },

  '& .react-calendar__year-view .react-calendar__tile, & .react-calendar__decade-view .react-calendar__tile, & .react-calendar__century-view .react-calendar__tile': {
    padding: '2em 0.5em',
  },

  '& .react-calendar__tile': {
    maxWidth: '100%',
    padding: '10px 6.6667px',
    background: 'none',
    textAlign: 'center',
    lineHeight: '16px',
  },

  '& .react-calendar__tile:disabled': {
    backgroundColor: '#f0f0f0',
  },

  '& .react-calendar__tile:enabled:hover, & .react-calendar__tile:enabled:focus': {
    backgroundColor: '#e6e6e6',
  },

  '& .react-calendar__tile--now': {
    background: '#ffff76',
  },

  '& .react-calendar__tile--now:enabled:hover, & .react-calendar__tile--now:enabled:focus': {
    background: '#ffffa9',
  },

  '& .react-calendar__tile--hasActive': {
    background: '#76baff',
  },

  '& .react-calendar__tile--hasActive:enabled:hover, & .react-calendar__tile--hasActive:enabled:focus': {
    background: '#a9d4ff',
  },

  '& .react-calendar__tile--active': {
    background: '#006edc',
    color: 'white',
  },

  '& .react-calendar__tile--active:enabled:hover, & .react-calendar__tile--active:enabled:focus': {
    background: '#1087ff',
  },

  '& .react-calendar--selectRange .react-calendar__tile--hover': {
    backgroundColor: '#e6e6e6',
  }
})
)

const DateTextFieldNoIcon = styled(TextField)({

  '& input[type="date"]': {
    '&::-webkit-appearance': 'none',
    '&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator': {
      display: 'none',
      '-webkit-appearance': 'none'
    }
  }
})

type DatePickerProps = {
  onSubmit: (startDate?: Date, endDate?: Date) => void
}

export const DatePicker: FC<DatePickerProps> = ({ onSubmit }) => {
  const [startDateString, setStartDateString] = useState("")
  const [endDateString, setEndDateString] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const dateStringValue: string | [string, string] = (startDateString !== "" && endDateString !== "") ? [startDateString, endDateString] : ((startDateString !== "") ? startDateString : undefined)

  const submitButtonFn = () => {
    // Submit the dates
    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)

    onSubmit(
      (!isNaN(startDate.getTime())) ? startDate : undefined,
      (!isNaN(endDate.getTime())) ? endDate : undefined
    )

    setIsOpen(false)
  }

  return (

    <StyledBox>
      <Box style={{ display: 'flex', gap: '10px' }}>
        <DateTextFieldNoIcon fullWidth style={{ backgroundColor: 'white' }} type='date' value={startDateString} onChange={(e) => setStartDateString(e.target.value)} />
        <DateTextFieldNoIcon fullWidth style={{ backgroundColor: 'white' }} type='date' value={endDateString} onChange={(e) => setEndDateString(e.target.value)} />
      </Box>
      <Calendar showWeekNumbers onChange={(v) => {
        const startDate = (v instanceof Date) ? v : (v as Date[])[0]
        const endDate = (v instanceof Date) ? undefined : (v as Date[])[1]
        startDate.setTime(startDate.getTime() - startDate.getTimezoneOffset() * 60 * 1000)
        setStartDateString(startDate.toISOString().split('T')[0])
        endDate.setTime(endDate.getTime() - endDate.getTimezoneOffset() * 60 * 1000)
        setEndDateString(endDate.toISOString().split('T')[0])
      }}
        value={dateStringValue}
        selectRange
        showDoubleView
      />
      <Button variant='contained' onClick={submitButtonFn}>Lagre</Button>
    </StyledBox>

  )
}
