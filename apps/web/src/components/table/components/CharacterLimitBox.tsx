import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { NoData } from '../../ErrorText'

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#F2F2F2',
    color: '#333333',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #E4E1DB',
  },
  arrow: {
    color: '#F2F2F2',
  },
}))(Tooltip)

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
      <HtmlTooltip
        title={text}
        arrow
        placement="top"
        disableHoverListener={!overflowActive}
      >
        <span>{text === '-' ? <NoData /> : text}</span>
      </HtmlTooltip>
    </div>
  )
}
