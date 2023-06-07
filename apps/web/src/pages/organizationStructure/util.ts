const nodeFillColors = [
  'rgb(75, 100, 85)',
  'rgb(165, 177, 170)',
  'rgb(183, 222, 189)',
  'rgb(219, 238, 222)',
]

const nodeStrokeColors = [
  'rgb(52, 70, 60)',
  'rgb(116, 124, 119)',
  'rgb(128, 155, 132)',
  'rgb(153, 167, 155)',
]

const linkColors = [
  'rgb(75, 100, 85)',
  ' rgb(132, 142, 136)',
  ' rgb(146, 178, 151)',
  ' rgb(175, 190, 178)',
]

export const hierchyLevel = (d) => {
  if (d.depth === 0) return 0
  if (!d.children) return 3
  if (d.depth === 1 || d.height > 1) return 1
  if (d.children) return 2
  return 3
}

export const size = [15, 10, 6, 5]
export const haloWidth = 0.2

export function toCartesian(x: number, y: number) {
  return [y * Math.cos(x), y * Math.sin(x)]
}

export const rightSide = (radians: number) => radians >= 0 && radians < 195

export const checkRotateDegree = (degree, rotateValue) => {
  const rotateDegree =
    degree + (rotateValue < 0 ? rotateValue + 360 : rotateValue)

  if (rotateDegree > 360) {
    return rightSide(rotateDegree - 360)
  } else return rightSide(rotateDegree)
}

export const linkColor = (d) => linkColors[hierchyLevel(d)]
export const nodeSize = (d) => size[hierchyLevel(d)]
export const fill = (d) => nodeFillColors[hierchyLevel(d)]
export const nodeStroke = (d) => nodeStrokeColors[hierchyLevel(d)]
