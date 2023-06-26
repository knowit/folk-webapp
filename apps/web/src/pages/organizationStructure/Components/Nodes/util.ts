export const rightSide = (radians: number) => radians >= 0 && radians < 210
export const checkRotateDegree = (degree, rotateValue) => {
  const rotateDegree =
    degree + (rotateValue < 0 ? rotateValue + 360 : rotateValue)

  if (rotateDegree > 360) {
    return rightSide(rotateDegree - 360)
  } else return rightSide(rotateDegree)
}

export const setXValue = (childsCount: any, degree, rotateValue, depth) => {
  //TODO: mindre hacky kode
  if (childsCount >= 10 && !checkRotateDegree(degree, rotateValue)) {
    if (depth === 1) {
      return 5
    } else {
      return 4
    }
  } else if (childsCount >= 10 && checkRotateDegree(degree, rotateValue)) {
    return -5
  } else if (checkRotateDegree(degree, rotateValue)) {
    return -1
  } else {
    if (depth <= 1) {
      return 3
    } else return 1
  }
}
