import React from 'react'

interface Props {
  id: any
}
const Custom = (props) => {
  console.log(props)
  return (
    <g style={{ height: 300, width: 300, fontSize: 24 }}>{props.node.id}</g>
  )
}

export default Custom
