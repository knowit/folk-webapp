import React from 'react'
import { ResponsiveNetwork } from '@nivo/network'
import Custom from './Custom'

interface Props {
  data: {
    nodes: any[]
    links: any[]
  }
}

//'(props: NodeProps<any>, context?: any): ReactElement<any, any>
const OSTtest = ({ data }: Props) => {
  console.log(data)
  return (
    <>
      <div style={{ height: 600 }}>
        <ResponsiveNetwork
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          linkDistance={function (e) {
            return e.distance
          }}
          centeringStrength={0.3}
          repulsivity={6}
          nodeSize={function (n) {
            return n.size
          }}
          activeNodeSize={function (n) {
            return 1.5 * n.size
          }}
          nodeColor={function (e) {
            return e.color
          }}
          nodeBorderWidth={1}
          nodeBorderColor={{
            from: 'color',
            modifiers: [['darker', 5.8]],
          }}
          linkThickness={function (n) {
            return 0 + 1 * n.target.data.height
          }}
          linkBlendMode="multiply"
          motionConfig="wobbly"
          isInteractive={true}
          nodeComponent={Custom}
        />
      </div>
    </>
  )
}

export default OSTtest
