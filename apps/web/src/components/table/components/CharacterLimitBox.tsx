import React, { useState, useEffect } from 'react'
import { Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { NoData } from '../../ErrorText'

const TooltipStyled = styled(Tooltip)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(14),
  border: 'none',
  '& .MuiTooltip-arrow': {
    color: theme.palette.background.default,
  },
}))

function isEllipsisActive(e: HTMLSpanElement | null | undefined): boolean {
  if (e === null || e === undefined) {
    return false
  }
  return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth
}

export default function CharacterLimitBox({ text }: { text: string }) {
  const [overflowActive, setOverflowActive] = useState(false)

  let targetRef: any
  function setRef(ref: any) {
    targetRef = ref
  }

  useEffect(() => {
    setOverflowActive(isEllipsisActive(targetRef))
  }, [text, targetRef])

  return (
    <div
      style={{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
      ref={setRef}
    >
      <TooltipStyled
        title={text}
        arrow
        placement="top"
        disableHoverListener={!overflowActive}
      >
        <span>{text === '-' ? <NoData /> : text}</span>
      </TooltipStyled>
    </div>
  )
}
