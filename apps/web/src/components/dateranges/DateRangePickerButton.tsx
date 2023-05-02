import { Button, Popover, styled } from '@mui/material'
import React, { FC } from 'react'
import { DateRangePicker } from './DateRangePicker'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

const StyledButton = styled(Button)(() => ({
  borderRadius: '50px',
  whiteSpace: 'nowrap',
  padding: '8px 12px',
  height: '2rem',
}))

type DateRangePickerButtonProps = {
  startDate: Date
  endDate: Date
  onComplete: (startDate?: Date, endDate?: Date) => void
}

export const DateRangePickerButton: FC<DateRangePickerButtonProps> = ({
  onComplete,
  startDate,
  endDate,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSubmit = (startDate, endDate) => {
    handleClose()
    onComplete(startDate, endDate)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <StyledButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        startIcon={<CalendarTodayIcon />}
      >
        {startDate || endDate
          ? `${startDate ? startDate?.toLocaleDateString() : 'udefinert'} - 
          ${endDate ? endDate?.toLocaleDateString() : 'udefinert'}`
          : 'Angi periode'}
      </StyledButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onSubmit={onSubmit}
        />
      </Popover>
    </>
  )
}
