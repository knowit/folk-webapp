import { Button, Popover, styled } from '@material-ui/core'
import React, { FC } from 'react'
import { DatePicker } from './DatePicker';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  whiteSpace: 'nowrap',
  padding: '8px 12px',
  height: '2rem'
}))


type DatePickerButtonProps = {
  onComplete: (startDate?: Date, endDate?: Date) => void
}

export const DatePickerButton: FC<DatePickerButtonProps> = ({ onComplete }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = (startDate, endDate) => {
    console.log("start", startDate)
    console.log("end", endDate)
    handleClose()
    onComplete(startDate, endDate)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <StyledButton aria-describedby={id} variant="contained" onClick={handleClick}>Angi periode</StyledButton>
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
          horizontal: 'right'
        }}
      >
        <DatePicker onSubmit={onSubmit} />
      </Popover>
    </>
  )
}
