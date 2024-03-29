export const rightSideNumber = (radians: number) =>
  (radians >= 20 && radians < 210) || radians > 360
export const rightSideName = (radians: number, rotateValue: number) => {
  const checkRotateValue = rotateValue <= -100 && rotateValue >= -160
  return radians >= 0 && checkRotateValue ? radians < 170 : radians < 210
}
export const checkRotateDegree = (
  degree: number,
  rotateValue: number,
  text?: boolean
) => {
  const rotateDegree =
    degree + (rotateValue < 0 ? rotateValue + 360 : rotateValue)

  if (rotateDegree > 360) {
    return text
      ? rightSideName(rotateDegree - 360, rotateValue)
      : rightSideNumber(rotateDegree - 360)
  } else
    return text
      ? rightSideName(rotateDegree, rotateValue)
      : rightSideNumber(rotateDegree)
}

export const setXValue = (
  childsCount: number,
  degree: number,
  rotateValue: number,
  depth: number
) => {
  //TODO: mindre hacky kode
  if (childsCount >= 10) {
    return !checkRotateDegree(degree, rotateValue) ? 4 : -5
  } else if (checkRotateDegree(degree, rotateValue)) {
    return -1
  } else {
    if (depth <= 1) {
      return 3
    } else return 1
  }
}
