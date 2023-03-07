import { memo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@nivo/core'
import { Chip, TableTooltip } from '@nivo/tooltip'

const HoursBilledPerWeekTooltip = ({ slice, axis }) => {
  const theme = useTheme()
  const otherAxis = axis === 'x' ? 'y' : 'x'

  const filtered = slice.points.filter((point) => point.data[otherAxis] !== 0)

  return (
    <TableTooltip
      rows={filtered.map((point) => [
        <Chip key="chip" color={point.serieColor} style={theme.tooltip.chip} />,
        point.serieId,
        <span key="value" style={theme.tooltip.tableCellValue}>
          {point.data[`${otherAxis}Formatted`]}
        </span>,
      ])}
    />
  )
}

HoursBilledPerWeekTooltip.propTypes = {
  slice: PropTypes.object.isRequired,
  axis: PropTypes.oneOf(['x', 'y']).isRequired,
}

export default memo(HoursBilledPerWeekTooltip)
