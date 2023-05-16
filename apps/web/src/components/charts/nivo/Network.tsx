import React from 'react'
import { Avatar } from '@mui/material'
import { ResponsiveNetwork } from '@nivo/network'
import { animated, to } from '@react-spring/web'
import { ReactComponent as FallbackUserIcon } from '../../../assets/fallback_user.svg'
// responsive component, otherwise height will be 0 and
// no chart will be rendered.

export const Network = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <ResponsiveNetwork
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        animate={false}
        linkDistance={(e: any) => e.distance}
        centeringStrength={1}
        repulsivity={50}
        nodeSize={function (n: any) {
          return n.size
        }}
        activeNodeSize={function (n: any) {
          return 1.5 * n.size
        }}
        nodeColor={function (e: any) {
          return e.color
        }}
        nodeBorderWidth={1}
        nodeBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.8]],
        }}
        linkThickness={function (n: any) {
          return 2 + 2 * n.target.data.height
        }}
        nodeComponent={({
          node,
          animated: animatedProps,
          onMouseEnter,
          onMouseLeave,
          onClick,
          onMouseMove,
        }) => (
          <animated.g
            transform={to(
              [animatedProps.x, animatedProps.y, animatedProps.scale],
              (x, y, scale) => {
                return `translate(${x},${y}) scale(${scale})`
              }
            )}
            onClick={(event) => onClick && onClick(node, event)}
          >
            <text
              y={-(node.size / 2 + 5)}
              textAnchor="middle"
              fontSize={node.size / 1.5}
            >
              {node.data.name}
            </text>
            <animated.circle
              data-testid={`node.${node.id}`}
              r={to([animatedProps.size], (size) => size / 2)}
              fill={animatedProps.color}
              strokeWidth={animatedProps.borderWidth}
              stroke={animatedProps.borderColor}
              opacity={animatedProps.opacity}
              onMouseEnter={(event) => onMouseEnter(node, event)}
              onMouseMove={(event) => onMouseMove(node, event)}
              onMouseLeave={(event) => onMouseLeave(node, event)}
            />
          </animated.g>
        )}
        linkColor={(e: any) => e.target.data.color || 'black'}
        motionConfig="wobbly"
        nodeTooltip={function (n: any) {
          const consultant = n.node.data
          return (
            <div
              style={{
                display: 'flex',
                height: '100px',
                background: '#FFFFFF',
                border: '2px solid #000000',
                padding: '0 15px 0 15px',
                alignItems: 'center',
              }}
            >
              <div style={{ paddingRight: '7px' }}>
                {consultant.image_url ? (
                  <Avatar alt={consultant.name} src={consultant.image_url} />
                ) : (
                  <Avatar alt={consultant.name}>
                    <FallbackUserIcon />
                  </Avatar>
                )}
              </div>
              <div>
                <h2 style={{ marginBottom: '0', marginTop: '0' }}>
                  {consultant.name}
                </h2>
                <text style={{ marginTop: '0' }}>
                  {`Rolle: ${consultant.title ?? 'ansatt'}`}
                </text>
                <br />
                <text>{`Nærmeste leder: ${
                  consultant.managerName ?? 'ingen'
                }`}</text>
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
