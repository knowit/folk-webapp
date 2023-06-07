import { memo } from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import { Chip } from '@nivo/tooltip'
import TooltipContainer from '../../../components/charts/nivo/TooltipContainer'

const HoursBilledPerWeekTooltip = ({ slice, axis }) => {
  const otherAxis = axis === 'x' ? 'y' : 'x'

  const filtered = slice.points.filter((point) => point.data[otherAxis] !== 0)

  return (
    <TooltipContainer>
      {filtered.map((point, index) => [
        <Grid
          key={index}
          container
          spacing={2}
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Grid item sx={{ marginRight: 1 }}>
              <Chip key="chip" color={point.serieColor} />
            </Grid>
            <Grid item>{point.serieId}</Grid>
          </Grid>
          <Grid item>
            <strong>{point.data[`${otherAxis}Formatted`]}</strong>
          </Grid>
        </Grid>,
      ])}
    </TooltipContainer>
  )
}

HoursBilledPerWeekTooltip.propTypes = {
  slice: PropTypes.object.isRequired,
  axis: PropTypes.oneOf(['x', 'y']).isRequired,
}

export default memo(HoursBilledPerWeekTooltip)
