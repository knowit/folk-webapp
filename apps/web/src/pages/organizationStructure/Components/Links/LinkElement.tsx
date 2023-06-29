import React from 'react'
import { Link } from '../../type'
import { linkColor } from '../../util'
import { useTheme } from '@mui/material'

interface Props {
  link: Link
  searchTerm: string
}

const LinkElement = ({ link, searchTerm }: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper // Stroke around the labels in case they overlap with a link
  const haloWidth = 0.2
  return (
    <React.Fragment key={link.target.data.employee.email}>
      <path
        fill="none"
        stroke={linkColor(link.target)}
        d={link.path}
        id={link.target.data.employee.email}
      />
      {link.innerLink && (
        <text
          stroke={halo}
          strokeWidth={haloWidth}
          paintOrder="stroke"
          fill={theme.palette.text.primary}
          opacity={
            searchTerm.length < 0
              ? 1
              : link.target.data.employee.name
                  .toLowerCase()
                  .includes(searchTerm)
              ? 1
              : 0.3
          }
        >
          <textPath
            xlinkHref={'#' + link.target.data.employee.email}
            startOffset={link.inverted ? '100%' : null}
            textAnchor={link.inverted ? 'end' : null}
          >
            <tspan dy="-2px" dx={link.inverted ? '-2px' : '2px'}>
              {link.target.children ? link.target.data.employee.name : ''}
            </tspan>
          </textPath>
        </text>
      )}
    </React.Fragment>
  )
}

export default LinkElement
