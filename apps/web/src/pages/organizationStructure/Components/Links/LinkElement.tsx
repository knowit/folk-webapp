import React from 'react'
import { Link } from '../../type'
import { linkColor } from '../../util'
import NameText from '../NameText'

interface Props {
  link: Link
  searchTerm: string
}

const LinkElement = ({ link, searchTerm }: Props) => {
  return (
    <React.Fragment key={link.target.data.employee.email}>
      <path
        fill="none"
        stroke={linkColor(link.target)}
        d={link.path}
        id={link.target.data.employee.email}
      />
      {link.innerLink && (
        <NameText employee={link.target.data.employee} searchTerm={searchTerm}>
          <textPath
            xlinkHref={`#${link.target.data.employee.email}`}
            startOffset={link.inverted ? '100%' : null}
            textAnchor={link.inverted ? 'end' : null}
          >
            <tspan dy="-2px" dx={link.inverted ? '-2px' : '2px'}>
              {link.target.children ? link.target.data.employee.name : ''}
            </tspan>
          </textPath>
        </NameText>
      )}
    </React.Fragment>
  )
}

export default LinkElement
